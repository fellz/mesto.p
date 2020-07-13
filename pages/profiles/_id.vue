<template>
  <div class="profile">
    <profile :profile="profile" />
  </div>
</template>

<script>
import Profile from "~/components/profile.vue";
import axios from "axios";

export default {
  components: {
    Profile
  },
  data() {
    return {
      profile: {}
    };
  },
  middleware: ["auth"],
  async fetch() {
    //console.log(this.$route.params.id)
    const { data } = await axios.get(
      `http://localhost:1337/profiles/${this.$route.params.id}`
    );
    this.profile = data;
  }
};
</script>

<style>
.project {
  width: 50%;
  margin: 100px;
}
</style>