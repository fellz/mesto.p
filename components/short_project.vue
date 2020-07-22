<template>
  <div class="card card_margin">
    <div class="card-header">
      <nuxt-link :to="'/projects/' + project.id" class="project_name">{{ project.name }}</nuxt-link>
      <span>
        by
        <nuxt-link
          v-if="project.owner"
          :to="'/profiles/' + project.owner.id"
        >{{ project.owner.fullname }}</nuxt-link>
      </span>
      <span>{{ formatDate(new Date(Date.parse(project.created_at))) }}</span>
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
      <span class="float-right">{{ project.stage}}</span>
    </div>
    <div class="card-body">
      <v-clamp autoresize :max-lines="3">{{ project.description }}</v-clamp>

      <div v-if="req_await" style="color:red">Работает</div>
    </div>
    <div
      class="card-footer text-muted"
      v-if="project.participants && project.participants.length > 0"
    >
      <span>Участники:</span>
      <span v-for="participant of project.participants" :key="participant.id" class="profiles">
        <nuxt-link :to="'/profiles/' + participant.id">{{participant.fullname}}</nuxt-link>
      </span>
    </div>
    <div class="card-footer text-muted" v-if="project.teams && project.teams.length > 0">
      <span>Команды:</span>
      <span v-for="team of project.teams" :key="team.id" class="profiles">
        <nuxt-link :to="'/teams/' + team.id">{{ team.name }}</nuxt-link>
      </span>
    </div>
    <div
      class="card-footer text-muted"
      v-if="project.project_skills && project.project_skills.length > 0"
    >
      <span>Кто нужен:</span>
      <span v-for="skill of project.project_skills" :key="skill.id">
        <span v-if="skill.filled !== true">
          <span class="short_project_skill">{{ skill.name }}</span>
          <button
            class="btn btn-primary"
            v-if="$store.state.authUser && inProject(skill) && !isOwner(project) "
            @click="sendRequest(skill.id)"
          >Заявка</button>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VClamp from "vue-clamp";
import edit_skillsVue from "../pages/projects/_id/edit_skills.vue";

export default {
  props: {
    project: Object
  },
  data() {
    return {
      req_await: false // block button
    };
  },
  components: {
    VClamp
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
    async sendRequest(id) {
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

    formatDate(date) {
      let dayOfMonth = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let diffMs = new Date() - date;
      let diffSec = Math.round(diffMs / 1000);
      let diffMin = Math.round(diffSec / 60);
      let diffHour = diffMin / 60;

      // formatting
      year = year.toString().slice(-2);
      month = month < 10 ? "0" + month : month;
      dayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
      hour = hour < 10 ? "0" + hour : hour;
      minutes = minutes < 10 ? "0" + minutes : minutes;

      if (diffSec < 1) {
        return "right now";
      } else if (diffMin < 1) {
        return `${diffSec} sec. ago`;
      } else if (diffHour < 1) {
        return `${diffMin} min. ago`;
      } else {
        return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`;
      }
    }
  }
};
</script>

<style>
.short_project_skill {
  margin-right: 10px;
  margin-left: 10px;
  color: blue;
  background-color: rgb(210, 210, 210);
}
</style>