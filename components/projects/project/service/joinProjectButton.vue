<template>
    <span v-if="skillReqFilter(skill, project)">
      <a href=""
      @click.prevent="joinProjectRequest(skill)"
    ><v-icon>mdi-plus</v-icon></a>
    </span>
</template>

<script>

export default {
  name: 'JoinProjectButton',
  props: {
    project: Object,
    skill: Object,
  },
  methods: {

    isOwner(project) {
      return project.owner.id === this.$store.state.userProfile.id;
    },
    appliedToSkill(skill) {
      let applied = false;
      // check requests
      const reqs = this.$store.state.userProfile.project_requests;
      const inReqs = reqs?.some((a) => a.id === skill.id); // returns true or false
      // check confirmeds
      const confs = this.$store.state.userProfile.project_confirmeds;
      const inConfirmeds = confs?.some((a) => a.id === skill.id);
      // if found
      if (inReqs || inConfirmeds) {
        applied = true;
      }
      return applied;
    },
    skillReqFilter(skill, project) {
      if (project.owner) {
        return (
          !!this.$store.state.authUser
          && !this.appliedToSkill(skill)
          && !this.isOwner(project)
        );
      }
      return false;
    },
    async joinProjectRequest(skill) {
      const profileId = this.$store.state.userProfile.id;
      // skill doesn't have requests array -> have to fetch skill again
      const sk = await this.$axios.$get(`/vacancies/${skill.id}`);
      const newReqs = [...sk.requests, profileId];
      await this.$axios.$put(`/vacancies/${skill.id}`,
        { requests: newReqs });
      this.$store.dispatch('getMyProfile');
    },
  },
};
</script>
