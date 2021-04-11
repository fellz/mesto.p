<template>
  <div v-if="$store.state.userProfile">
    <!-- Заявка от команды -->
    <button
      v-if="teamRequestFilter(project)"
      class="btn btn-outline-primary dropdown-toggle teams__request_button"
      type="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >Заявка команды</button>
    <div class="dropdown-menu">
      <v-btn
        v-for="t of myTeams"
        :key="t.id"
        class="dropdown-item teams__dropdown_pointer"
        @click.prevent="teamRequest(project, t)"
      >{{t.name}}
      </v-btn>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RequestFromTeamButton',
  props: {
    project: Object,
  },
  computed: {
    myTeams() {
      return this.$store.state.userProfile.myteams;
    },
  },
  methods: {
    // FIX: слишком громоздко
    inProject(items) {
      let teamFound = false;
      const res = items.some((t) => this.myTeams.some((mt) => mt.id === t.id));
      if (res) {
        teamFound = true;
      }
      return teamFound;
    },
    hasTeam() {
      return this.myTeams.length > 0;
    },
    isOwner(project) {
      return project.owner.id === this.$store.state.userProfile.id;
    },
    teamRequestFilter(project) {
      if (project.teams) {
        return (
          !!this.$store.state.authUser // Authorized user
          && !this.inProject(project.teams) // Check if team already in project
          && !this.inProject(project.team_requests) // Check if team already in project requests
          && this.hasTeam() // Check if logged user has team
          && !this.isOwner(project) // Check if logged user is not project owner
        );
      }
      return false;
    }, // Заявка от команды
    async teamRequest(proj, team) {
      const reqs = [...proj.team_requests, team.id];
      await this.$axios.$put(`/projects/${proj.id}`,
        { team_requests: reqs });
      this.$emit('update-project');
    },
  },
};
</script>
