<template>
  <div>
    <new-team />
  </div>
</template>

<script>
import NewTeam from '~/components/teams/new.vue';

export default {
  components: {
    NewTeam,
  },
  middleware: ['auth'],
};
</script>
