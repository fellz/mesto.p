<template>
  <div>
    <profile-skills />
  </div>
</template>

<script>
import ProfileSkills from "~/components/my/edit/skills.vue";

export default {
  components:{
    ProfileSkills
  },
  middleware: ["auth"],
};
</script>