<template>
  <section class="profile_edit_photo">
    <p>
      <img :src="avatar" />
    </p>
    <p>
      <label>Изменить фото</label>
      <input
        type="file"
        ref="image"
        accept="image/*"
        class="form-control"
        @change="imageSelected" />
    </p>
    <nuxt-link to="/my/auth/">Обратно</nuxt-link>
  </section>
</template>

<script>

export default {
  name: 'ProfilePhotoEdit',
  data() {
    return {
      profile: { avatar: [] },
      baseUrl: process.env.baseUrl,
      defAvatar: process.env.defAvatar,
    };
  },
  async created() {
    await this.getProfile();
  },
  computed: {
    avatar() {
      return `${this.baseUrl}${
        this.profile.avatar.length
          ? this.profile.avatar[0].formats.thumbnail.url
          : this.defAvatar
      }`;
    },
  },
  methods: {
    async getProfile() {
      this.profile = await this.$axios.$get(`/profiles/${this.$store.state.userProfile.id}`);
    },
    async imageSelected() {
      const options = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const avatar = this.$refs.image.files[0];
      const fileName = this.$refs.image.files[0].name;
      const profId = this.$store.state.userProfile.id;
      const formData = new FormData();
      formData.append('files', avatar, fileName);
      formData.append('ref', 'profiles');
      formData.append('refId', profId);
      formData.append('field', 'avatar');
      try {
        await this.$axios.$post('/upload',
          formData,
          options);
        await this.getProfile();
        this.$store.dispatch('setProfile', { profile: this.profile });
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
</script>
