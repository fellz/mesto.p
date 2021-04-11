<template>
  <div>
    <profile-photo-edit />
  </div>
</template>

<script>
import ProfilePhotoEdit from '~/components/my/edit/photo.vue';

export default {
  components: {
    ProfilePhotoEdit,
  },
  middleware: ['auth'],
};
</script>
