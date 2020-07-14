<template>
  <section class="profile_edit_photo">
    <p>
      <img :src="'http://localhost:1337' + avatar" />
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
  data() {
    return {
      avatar: ""
    };
  },
  created() {
    this.avatar = this.$store.state.userProfile.avatar
      ? this.$store.state.userProfile.avatar.formats.thumbnail.url
      : "/uploads/thumbnail_profile_default_985f0608e3.jpeg";
  },
  methods: {
    async imageSelected() {
      const options = {
        headers: {
          Authorization: `Bearer ${this.$store.state.authUser.jwt}`,
          "Content-Type": "multipart/form-data"
        }
      };
      this.avatar = this.$refs.image.files[0];
      const file_name = this.$refs.image.files[0].name;
      const prof_id = this.$store.state.userProfile.id;
      let formData = new FormData();
      formData.append("files", this.avatar, file_name);
      formData.append("ref", "profiles");
      formData.append("refId", prof_id);
      formData.append("field", "avatar");
      const resp = await axios.post(
        `${process.env.baseUrl}/upload`,
        formData,
        options
      );
      this.$store.dispatch("getProfile");
    }
  },
  watch: {
    "$store.state.userProfile": function() {
      const profile = this.$store.state.userProfile;
      this.avatar = profile.avatar
        ? profile.avatar.formats.thumbnail.url
        : "/uploads/thumbnail_profile_default_985f0608e3.jpeg";
    }
  }
};
</script>