<template>
    <span v-if="$store.state.userProfile">
      <a href=""
      v-if="skillReqFilter(skill, project) "
      @click.prevent="joinProjectRequest(skill)"
    >Заявка</a>
    </span>
</template>

<script>
import axios from "axios";

export default {
  name: "JoinProjectButton",
  props: {
    project:Object,
    skill: Object
  },
  methods:{
     isOwner(project) {
       return project.owner.id === this.$store.state.userProfile.id; 
    },
    appliedToSkill(skill) {
      let applied = false;
      // check requests
      const reqs = this.$store.state.userProfile.project_requests;
      const in_reqs = reqs.some(a => a.id === skill.id); //returns true or false
      //check confirmeds
      const confs = this.$store.state.userProfile.project_confirmeds;
      const in_confirmeds = confs.some(a => a.id === skill.id);
      // if found
      if (in_reqs || in_confirmeds) {
        applied = true;
      }
      return applied;
    },
    skillReqFilter(skill, project){
      if (project.owner){
        return (
          this.$store.state.authUser &&
          !this.appliedToSkill(skill) && 
          !this.isOwner(project)
        )
      }
      return false
    },
    async joinProjectRequest(skill) {
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const profile_id = this.$store.state.userProfile.id;
      // skill doesn't have requests array -> have to fetch skill again
      const { data:sk } = await axios.get(`${process.env.baseUrl}/project-skills/${skill.id}`);
      const new_reqs = [...sk.requests, profile_id];
      const { data: project } = await axios.put(`${process.env.baseUrl}/project-skills/${skill.id}`,
        { requests: new_reqs },
        options
      );
      this.$store.dispatch("getMyProfile");
    },
  }
}
</script>