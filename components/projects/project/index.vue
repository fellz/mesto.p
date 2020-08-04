  <template>
    <div>
      <div class="row project">
        <main class="col-sm-7 project__main">
          <header class="main__header">
            <div class="text-muted">Создан: {{ project.created_at | formatDate }}</div>
            <div class="header__status">Статус: {{ project.stage }} </div>
          </header>
          <section class="main__title">
            <h4>{{ project.name }}</h4>
            <div class="title__project_edit">
              <nuxt-link v-if="managerFilter(project)" :to="'/projects/' + project.id + '/edit/'">Редактировать</nuxt-link>
            </div>
          </section>
          <section>{{ project.description }}</section>
        </main>
        <aside class="col-sm-5 project__aside">
          <section v-if="managerFilter(project)">
            <h4>Управление</h4>
            <hr/>
            <nuxt-link
              class="btn btn-primary"
              :to="'/projects/' + project.id+'/team_reqs'"
            >Команды</nuxt-link>
            <nuxt-link
              class="btn btn-primary"
              :to="'/projects/' + project.id+'/edit/skills'"
            >Вакансии</nuxt-link>
          </section>
          <section>
            <h4>Команда проекта</h4>
            <hr/>
            <!-- participants component -->
            <participants :owner_profile="project.owner" :resource="project"/>
          </section>
          <section v-if="project.project_skills && project.project_skills > 0">
            <h4>Кто нужен в проект: </h4>
            <hr/>
            <div v-for="skill of project.project_skills" :key="skill.id">
              {{ skill.name }} <span class="font-weight-bold">({{skill.pay ? "платим" : "волонтер"}})</span>
              <a href=""
                  v-if="skillReqFilter(skill, project) "
                  @click.prevent="projectRequest(skill.id)"
                >Заявка</a>
            </div>
          </section>
          <section v-if="project.url || project.url_presentation ">
            <h4>Ссылки: </h4>
            <hr/>
            <p>Сайт: <a :href="project.url" target="_blank" >{{project.url}}</a></p>
            <p>Презентация: <a :href="project.url_presentation" target="_blank" >{{project.url_presentation}}</a></p>
          </section>
          <section v-if="project.teams && project.teams.length > 0" class="aside__teams">
            <h4>Команды в проекте: </h4>
            <hr/>
            <div v-for="team of project.teams" :key="team.id">
              <nuxt-link :to="'/teams/' + team.id">{{ team.name }}</nuxt-link>
            </div>
            <button
              v-if="teamReqFilter(project)"
              class="btn btn-outline-primary dropdown-toggle teams__request_button"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Заявка команды</button>
            <div class="dropdown-menu">
              <a v-for="t of teams" :key="t.id" class="dropdown-item teams__dropdown_pointer" @click.prevent="teamRequest(project, t)"
              >{{t.name}}</a>
            </div>
          </section>
      </aside>
    </div> 
  </div>
</template>

<script>
import axios from "axios";
import Participants from "~/components/common/participants.vue";

export default {
  name: "Project",
  components:{
    Participants
  },
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
       return project.owner.id === this.$store.state.userProfile.id; 
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
    },
  } 
};
</script>

<style>
  .project__main{
    width: 55%;
    padding-right: 50px;
  }
    .main__header{
      display:flex;
      justify-content: space-between;
      margin-bottom:20px;
    }
      .header__status{
        padding:0 10px 0 10px;
        background-color: gray;
        color:white;
      }
    .main__title{
      display: flex;
    }
      .title__project_edit{
        margin-left: 20px;
      }
    .teams__dropdown_pointer{
      cursor: pointer;
    }
  .project__aside{
    background-color: white;
    padding: 20px;
    border-radius: 7px;
  }
</style>