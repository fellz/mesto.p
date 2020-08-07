<template>
  <div>
    <team-edit />
  </div>
</template>

<script>
import TeamEdit from "~/components/teams/team/edit.vue";;

export default {
  components:{
    TeamEdit
  },
  middleware: ["auth"]
}
</script>