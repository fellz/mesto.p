<template>
  <div>
    <profile-new />
  </div>
</template>

<script>
import ProfileNew from "~/components/profiles/new"

export default {
  components:{
    ProfileNew
  },
  middleware: ['auth']
}
</script>