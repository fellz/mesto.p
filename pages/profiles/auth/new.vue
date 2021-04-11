<template>
  <div>
    <profile-new />
  </div>
</template>

<script>
import ProfileNew from '~/components/profiles/new.vue';

export default {
  components: {
    ProfileNew,
  },
  middleware: ['auth'],
};
</script>
