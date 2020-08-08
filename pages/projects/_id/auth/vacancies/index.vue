<template>
  <div>
    <project-skills />
  </div>
</template>

<script>
import axios from "axios";
import ProjectSkills from "~/components/projects/project/vacancies/index.vue";

export default {
  components: {
    ProjectSkills
  },
  middleware: ["auth"]
}  
</script>