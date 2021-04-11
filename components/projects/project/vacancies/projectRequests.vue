<template>
  <v-row>
    <v-col>
      <h4>Заявки</h4>
      <v-divider />
        <v-row v-for="req of proj_skill.requests" :key="req.id">
          <nuxt-link :to="'/profiles/'+req.id">{{req.fullname}}</nuxt-link>
          <v-btn  @click="joinProject(req.id)">Принять</v-btn>
        </v-row>
    </v-col>
    <v-col>
      <h4>Принятые</h4>
      <v-divider />
        <div v-for="conf of proj_skill.confirmeds" :key="conf.id">
          <nuxt-link :to="'/profiles/'+conf.id">{{conf.fullname}}</nuxt-link>
        </div>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'ProjectRequests',
  props: {
    skill: Object,
    project: Object,
  },
  data() {
    return {
      proj_skill: {},
      baseUrl: process.env.baseUrl,
    };
  },
  created() {
    this.getSkill();
  },
  methods: {
    // Забираем заявку
    async getSkill() {
      this.proj_skill = await this.$axios.$get(`/vacancies/${this.skill.id}`);
    },
    // Обработка заявки по вакансии
    async joinProject(id) {
      // Add to confirmeds
      const newConfs = [...this.proj_skill.confirmeds, id];
      await this.$axios.$put(`/vacancies/${this.skill.id}`,
        { confirmeds: newConfs });
      // Remove from requests
      const newReqs = this.proj_skill.requests.filter((el) => el.id !== id);
      await this.$axios.$put(`/vacancies/${this.skill.id}`,
        { requests: newReqs });
      // Update project. Add to project participants
      const ps = this.project.participants;
      const newParticipants = [...ps, id];
      await this.$axios.$put(`/projects/${this.$route.params.id}`,
        { participants: newParticipants });
      // Update profile. Add to projects in Profile
      const prs = this.$store.state.userProfile.projects;
      const profId = this.$store.state.userProfile.id;
      const newProjects = [...prs, id];
      await this.$axios.$put(`/profiles/${profId}`,
        { projects: newProjects });
      // Update project. Should update project in skills page.
      // this.$store.dispatch("setProject",{id:this.$route.params.id})
      this.$emit('update-project');
      // Update skill
      this.getSkill();
    },
  },
};
</script>

<style>
.project_edit_skills-flex{
  display: flex;
}
.project_edit_skills_requests{
  margin-right: 20px;
}
.project_edit_skills_requests section{
  margin-bottom:10px;
}
</style>
