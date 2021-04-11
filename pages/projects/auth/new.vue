<template>
  <div >
    <new-project />
  </div>
</template>

<script>
import NewProject from '~/components/projects/new.vue';

export default {
  components: {
    NewProject,
  },
  middleware: ['auth'],

};
</script>
