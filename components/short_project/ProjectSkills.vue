<template>
  <div class="row">
    <div class="col-4">
      <div class="list-group" id="list-tab" role="tablist">
        <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" :href="'#list-home'+project.id" role="tab" aria-controls="home"
        >Кто_нужен</a>
        <a class="list-group-item list-group-item-action" id="list-teams-list" data-toggle="list" :href="'#list-teams'+project.id" role="tab" aria-controls="home"
        >Участники</a>
        <a class="list-group-item list-group-item-action" id="list-skills-list" data-toggle="list" :href="'#list-skills'+project.id" role="tab" aria-controls="home"
        >Команды</a>
      </div>
    </div>
    <div class="col-8">
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" :id="'list-home'+project.id" role="tabpanel" aria-labelledby="list-home-list">
          <div v-for="skill of project.project_skills" :key="skill.id">
            <div v-if="skill.filled !== true">
              <span>{{ skill.name }}</span>
              <a href=""
                v-if="$store.state.authUser && inProject(skill) && !isOwner(project) "
                @click.prevent="projectRequest(skill.id)"
              >Заявка</a>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" :id="'list-teams'+project.id" role="tabpanel" aria-labelledby="list-teams">
          <div>
            <div v-for="participant of project.participants" :key="participant.id" class="profiles">
              <nuxt-link :to="'/profiles/' + participant.id">{{participant.fullname}}</nuxt-link>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" :id="'list-skills'+project.id" role="tabpanel" aria-labelledby="list-skills">
          <div v-for="team of project.teams" :key="team.id" class="profiles">
            <nuxt-link :to="'/teams/' + team.id">{{ team.name }}</nuxt-link>
          </div>
          <button
            v-if="$store.state.authUser && !inProj(project) && !inProjectReqs(project) && hasTeam()"
            class="btn btn-outline-primary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Заявка команды</button>
          <div class="dropdown-menu">
            <a v-for="t of teams" :key="t.id" class="dropdown-item" @click.prevent="teamRequest(project, t)"
            >{{t.name}}</a>
          </div>
        </div>
      </div>
    </div>
  </div><!-- row -->  
</template>

<script>
import axios from "axios";

export default {
  props: {
    project: Object
  },
  computed: {
    // have to check for value because it's reactive
    teams() {
      return this.$store.state.userProfile ? this.$store.state.userProfile.myteams : [];
    }
  },
  methods: {
     isOwner(project) {
      return project.owner.id === this.$store.state.authUser.user.profile.id;
    },
    inProj(proj){
      // already in project or sent a request
      let t_found = false
      const ts_arr = proj.teams.map(t => t.id)
      const ts2_arr = this.teams.map(t => t.id)
      const res = ts_arr.filter(element => ts2_arr.includes(element));
      if (res.length > 0){
        t_found = true
      }
      return t_found
    },
    inProjectReqs(proj){
      let t_found = false
      const ts_arr = proj.team_requests.map(t => t.id)
      const ts2_arr = this.teams.map(t => t.id)
      const res = ts_arr.filter(element => ts2_arr.includes(element));
      if (res.length > 0){
        t_found = true
      }
      return t_found
    },
     hasTeam(){
      return this.teams.length > 0
    },
    inProject(skill) {
      let proj = true;
      if (this.$store.state.userProfile != null) {
        // check requests
        const reqs = this.$store.state.userProfile.project_requests;
        const skills = reqs.map(a => a.id);
        const skill_found = skills.some(s => s === skill.id);
        //check confirmeds
        const confs = this.$store.state.userProfile.project_confirmeds;
        const conf_skills = confs.map(a => a.id);
        const conf_skill_found = conf_skills.some(s => s === skill.id);

        if (skill_found || conf_skill_found) {
          proj = false;
        }
      }
      return proj;
    },
    async teamRequest(proj, team) {
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const reqs = [...proj.team_requests, team.id];
      const { data } = await axios.put(
        `${process.env.baseUrl}/projects/${proj.id}`,
        { team_requests: reqs },
        options
      );
      this.$store.dispatch("getItems", {resource: 'projects', start: 0} );
    },
    async projectRequest(id) {
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const profile_id = this.$store.state.userProfile.id;
      const { data } = await axios.get(
        `${process.env.baseUrl}/project-skills/${id}`
      );

      const new_reqs = [...data.requests, profile_id];
      const { data: project } = await axios.put(
        `${process.env.baseUrl}/project-skills/${id}`,
        { requests: new_reqs },
        options
      );
      this.$store.dispatch("getProfile");
    },

  }
  
}
</script>