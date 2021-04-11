<template>
  <div>
    <team-requests-manager />
  </div>
</template>

<script>
import TeamRequestsManager from '~/components/projects/project/teams/index.vue';

export default {
  components: {
    TeamRequestsManager,
  },
  middleware: ['auth'],
};
</script>
