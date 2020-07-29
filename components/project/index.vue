  <template>
  <div>
    <div class="project_wrapper">
      <div class="project_main">
        <div class="project_main--header">
          <div class="text-muted">Создан: {{ project.created_at | formatDate }}</div>
          <div class="project_main--header--status">Статус: {{ project.stage }} </div>
        </div>
        <div class="project_main--name">
          <h4>{{ project.name }}</h4>
          <div class="project_main--edit">
            <nuxt-link v-if="managerFilter(project)" :to="'/projects/' + project.id + '/edit'">Редактировать</nuxt-link>
          </div>
        </div>
        <p>{{ project.description }}</p>
      </div>
      <aside class="project_aside">
        <div v-if="managerFilter(project)" class="project_aside--manage">
          <h4>Управление</h4>
          <hr/>
          <nuxt-link
            class="btn btn-primary"
            :to="'/projects/' + project.id+'/team_reqs'"
          >Команды</nuxt-link>
          <nuxt-link
            class="btn btn-primary"
            :to="'/projects/' + project.id+'/edit_skills'"
          >Вакансии</nuxt-link>
        </div>
        <div>
          <h4>Команда проекта</h4>
          <hr/>
          <div class="project_aside--team--flex">
            <div class="project_aside--team--project_owner">
              <div v-if="project.owner"
                class="project_aside--team--project_owner--photo"
                :src="thumb(project.owner)"
                :style="backimg(project.owner)">
              </div>
              <nuxt-link :to="'/profiles/' + project.id">{{ project.owner?  project.owner.fullname :'' }}</nuxt-link>
            </div>
            <div v-for="p of project.participants" :key="p.id" class="project_aside--team--member">
              <div
                  class="project_aside--team--photo"
                  :src="thumb(p)"
                  :style="backimg(p)"
                ></div>
                <nuxt-link :to="'/profiles/' + p.id">{{p.fullname}}</nuxt-link>
            </div>
          </div>
        </div>
        <div class="project_aside--skills">
          <h4>Кто нужен в проект: </h4>
          <hr/>
          <div v-for="skill of project.project_skills" :key="skill.id">
            {{ skill.name }}
            <a href=""
                v-if="skillReqFilter(skill, project) "
                @click.prevent="projectRequest(skill.id)"
              >Заявка</a>
          </div>
        </div>
        <div class="project_aside--teams">
          <h4>Команды в проекте: </h4>
          <hr/>
          <div v-for="team of project.teams" :key="team.id">
            <nuxt-link :to="'/teams/' + team.id">{{ team.name }}</nuxt-link>
          </div>
          <button
            v-if="teamReqFilter(project)"
            class="btn btn-outline-primary dropdown-toggle req_button--margin"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Заявка команды</button>
          <div class="dropdown-menu">
            <a v-for="t of teams" :key="t.id" class="dropdown-item dropdown--pointer" @click.prevent="teamRequest(project, t)"
            >{{t.name}}</a>
          </div>
        </div>
      </aside>
    </div> 
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProjectMain",
  data(){
    return {
      url: process.env.baseUrl,
      defAvatar: process.env.defAvatar,
      project: {}
    }
  },
  computed:{
    teams() {
      return this.$store.state.userProfile ? this.$store.state.userProfile.myteams : [];
    }
  },
  created() {
      this.getProject();
  },
  methods: {
    async getProject(){
      const { data } = await axios.get(`${process.env.baseUrl}/projects/${this.$route.params.id}`);
      this.project = data;
    },
    managerFilter(project){
      if (project.owner){
        return this.$store.state.authUser && this.isOwner(project)
      }
      return false  
    },
    skillReqFilter(skill, project){
      if (project.owner){
        return (
          this.$store.state.authUser &&
          this.inProject(skill) && 
          !this.isOwner(project)
        )
      }
      return false
    },
    teamReqFilter(project){
      if (project.teams){
        return (
          this.$store.state.authUser && 
          !this.teamInProject(project) && 
          !this.inProjectReqs(project) && 
          this.hasTeam() &&
          !this.isOwner(project)
        )
      }
      return false
    },
    teamInProject(proj){
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
    isOwner(project) {
       return project.owner.id === this.$store.state.userProfile.id; // o should be true here
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
      //this.getProject()
      this.$store.dispatch("getProfile");
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
      this.getProject();   
      //this.$store.dispatch("getItems", {resource: 'projects', start: 0} );
    },
    
    backimg(profile) {
      return `background-image: url(${this.url}${
        profile.avatar
          ? profile.avatar.formats.thumbnail.url
          : this.defAvatar
      })`;
    },
    thumb(profile){
      return this.url + (profile.avatar ? profile.avatar.formats.thumbnail.url : this.defAvatar)
    },
  }// some changes to reload
};
</script>

<style>
.project_wrapper{
  display: flex;
}
.project_main{
  width: 60%;
  padding-right: 50px;
}
.project_main--header{
  display:flex;
  justify-content: space-between;
  margin-bottom:20px;
}
.project_main--header--status{
  padding:0 10px 0 10px;
  background-color: gray;
  color:white;
}
.project_main--name{
  display: flex;
}
.project_main--edit{
  margin-left: 20px;
}
.project_aside{
  width: 40%;
}
.project_aside--manage{
  margin-bottom:10px;
}
.project_aside--manage a{
  margin-right:5px;
}
.project_aside--team--flex {
  display: flex;
  flex-flow: wrap;
}
.project_aside--team--member, .project_aside--team--project_owner{
  margin-right: 10px;
}
.project_aside--team--photo, .project_aside--team--project_owner--photo {
  width: 70px;
  height: 70px;
  background-position: center;
  border-radius: 50%;
  margin: auto;
}
.project_aside--team--project_owner--photo{
  border: 2px solid red;
}
.project_aside--skills{
  margin-top: 20px;
  margin-bottom: 20px;
}
.project_aside--teams .req_button--margin{
  margin-top: 10px;
}
.project_aside--teams .dropdown--pointer{
  cursor: pointer;
}
</style>