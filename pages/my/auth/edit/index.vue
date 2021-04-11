<template>
  <div>
    <my-profile-edit />
  </div>
</template>

<script>
import MyProfileEdit from '~/components/my/edit/index.vue';

export default {
  components: {
    MyProfileEdit,
  },
  middleware: ['auth'],
};
</script>
