<template>
  <section class="profile_edit_photo">
    <p>
      <img :src="baseUrl + avatar" />
    </p>
    <p>
      <label>Изменить фото</label>
      <input type="file" ref="image" accept="image/*" class="form-control" @change="imageSelected" />
    </p>
    <nuxt-link to="/my">Обратно</nuxt-link>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfilePhotoEdit",
  data() {
    return {
      profile: {},
      baseUrl: process.env.baseUrl,
      defAvatar: process.env.defAvatar
    };
  },
  created(){
    this.getProfile()
  },
  computed:{
    avatar(){
      return (
        this.profile.avatar
      ? this.profile.avatar.formats.thumbnail.url
      : this.defAvatar)
    }
  },
  methods: {
    async getProfile(){
      const { data } = await axios.get(`${this.baseUrl}/profiles/${this.$store.state.userProfile.id}`);
      this.profile = data;
    },
    async imageSelected() {
      const options = {
        headers: {
          Authorization: `Bearer ${this.$store.state.authUser.jwt}`,
          "Content-Type": "multipart/form-data"
        }
      };
      const avatar = this.$refs.image.files[0];
      const file_name = this.$refs.image.files[0].name;
      const prof_id = this.$store.state.userProfile.id;
      let formData = new FormData();
      formData.append("files", avatar, file_name);
      formData.append("ref", "profiles");
      formData.append("refId", prof_id);
      formData.append("field", "avatar");
      const resp = await axios.post(
        `${process.env.baseUrl}/upload`,
        formData,
        options
      );
      this.getProfile()
    }
  }
};
</script>