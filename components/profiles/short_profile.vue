<template>
  <div>
    <v-card min-width="300" max-width="344" elevation="6">
      <v-container>
        <v-row>
          <v-col class="text-center">
            <v-avatar color="indigo" size="130">
              <v-img :src="profilePhotoUrl" />
            </v-avatar>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-btn color="primary" dark @click.stop="dialog=true">{{ profile.fullname }}</v-btn>
        </v-row>

        <v-row justify="center">
          <span class="font-italic text-subtitle-2 text--secondary">{{ profile.city }}</span>
        </v-row>

        <v-row justify="center">
          <v-col>
            <div class="text--secondary">
              <v-clamp autoresize :max-lines="4">{{ profile.about }}</v-clamp>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-chip class="ma-2" v-for="s in profile.skills" :key="s.id">{{s.skill}}</v-chip>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="justify-center">
        <social-buttons :profileId="profile.id" />
      </v-card-actions>
    </v-card>

    <profile-dialog :profile="profile" :dialog="dialog" @close="dialog=false" />
  </div>
</template>

<script>
import VClamp from "vue-clamp";
import ProfileDialog from "~/components/profiles/profile_dialog.vue";
import SocialButtons from "~/components/profiles/social.vue"

export default {
  props: {
    profile: Object,
  },
  data() {
    return {
      dialog: false,
      baseUrl: process.env.baseUrl,
      defAvatar: process.env.defAvatar,
    };
  },
  computed: {
    hasSkills() {
      return this.profile.skills.length > 0;
    },
    profilePhotoUrl() {
      return `${this.baseUrl}${
        this.profile.avatar
          ? this.profile.avatar.formats.thumbnail.url
          : this.defAvatar
      }`;
    },
  },
  components: {
    VClamp,
    ProfileDialog,
    SocialButtons
  },
};
</script>

<style>
.aside__photo {
  width: inherit;
}
</style>