<template>
  <div>
    <my-profile /> 
  </div>
</template>


<script>
import MyProfile from "~/components/my/index.vue";

export default {
  components: {
    MyProfile
  },
  middleware: ["auth"],
}
</script>