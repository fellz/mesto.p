<template>
  <div>
    <team-requests />
  </div>
</template>

<script>
import axios from "axios";
import TeamRequests from "~/components/projects/project/teamRequests.vue"

export default {
  components: {
    TeamRequests
  },
}
</script>