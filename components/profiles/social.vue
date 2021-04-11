<template>
  <div v-if="$store.state.authUser">
    <v-btn
      v-if="generalFilter('contacts')"
      color="success"
      @click="addToContacts()"
    >
    Вконтакты
    </v-btn>
    <v-btn
      v-if="generalFilter('social_trackers')"
      color="success"
      @click="sPasibo()"
    >
      Спасибо
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'SocialButtons',
  props: {
    profileId: Number,
    profile: Object,
  },
  methods: {
    generalFilter(resource) {
      let inresource = null;
      const loggedInProfile = this.$store.state.userProfile;
      if (resource === 'contacts') {
        inresource = loggedInProfile.contacts.some((r) => Number(r.id) === Number(this.profileId));
      } else {
        inresource = loggedInProfile.social_trackers
          .some((p) => Number(p.profile_whom) === Number(this.profileId));
      }
      const isSelf = loggedInProfile.id === this.profileId;
      return this.$store.state.authUser && !inresource && !isSelf;
    },
    async addToContacts() {
      const loggedInProfile = this.$store.state.userProfile;
      const newContacts = [...loggedInProfile.contacts, this.profileId];
      const resp = await this.$axios.$put(`/profiles/${loggedInProfile.id}`,
        { contacts: newContacts });
      this.$store.dispatch('setProfile', { profile: resp });
    },
    async sPasibo() {
      const loggedInProfile = this.$store.state.userProfile;
      await this.$axios.$post('/socials',
        { name: 'spasibo', profile_who: loggedInProfile.id, profile_whom: this.profileId });
      const newSocial = this.profile.social + 1;
      await this.$axios.$put(`/profiles/${this.profileId}`, { social: newSocial });
      // needed for filter to work
      const newProfile = await this.$axios.$get(`/profiles/${loggedInProfile.id}`);
      this.$emit('update-profile');
      this.$store.dispatch('setProfile', { profile: newProfile });
    },
  },
};
</script>
