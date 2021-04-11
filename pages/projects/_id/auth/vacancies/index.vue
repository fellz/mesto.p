<template>
  <div>
    <project-skills />
  </div>
</template>

<script>
import ProjectSkills from '~/components/projects/project/vacancies/index.vue';

export default {
  components: {
    ProjectSkills,
  },
  middleware: ['auth'],
};
</script>
