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
  async fetch() {
    const { data } = await axios.get(
      `${process.env.baseUrl}/profiles/${this.$route.params.id}`
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