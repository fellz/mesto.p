<template>
  <div>
    <team-requests />
  </div>
</template>

<script>
import TeamRequests from "~/components/teams/team/requests.vue";

export default {
  components: {
    TeamRequests
  },
  middleware: ["auth"]
}
</script>