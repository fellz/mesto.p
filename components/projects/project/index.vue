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
              <nuxt-link v-if="managerFilter(project)" :to="'/projects/' + project.id + '/auth/edit/'">Редактировать</nuxt-link>
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
              :to="'/projects/' + project.id+'/auth/teams/'"
            >Команды</nuxt-link>
            <nuxt-link
              class="btn btn-primary"
              :to="'/projects/' + project.id+'/auth/vacancies/'"
            >Вакансии</nuxt-link>
          </section>
          <section>
            <h4>Команда проекта</h4>
            <hr/>
            <!-- participants component -->
            <participants :owner_profile="project.owner" :resource="project"/>
          </section>
          <!-- Заявки в проект от участников -->
          <section v-if="project.project_skills && project.project_skills.length > 0">
            <h4>Кто нужен в проект: </h4>
            <hr/>
            <div v-for="skill of project.project_skills" :key="skill.id">
              {{ skill.name }} <span class="font-weight-bold">({{skill.pay ? "платим" : "волонтер"}})</span>
              <!-- Component -->
              <join-project-button :project="project" :skill="skill" />
            </div>
          </section>
          <!-- Сссылки проекта -->
          <section v-if="project.url || project.url_presentation ">
            <h4>Ссылки: </h4>
            <hr/>
            <p>Сайт: <a :href="project.url" target="_blank" >{{project.url}}</a></p>
            <p>Презентация: <a :href="project.url_presentation" target="_blank" >{{project.url_presentation}}</a></p>
          </section>
          <!-- Команды в проекте -->
          <section v-if="project.teams && project.teams.length > 0" class="aside__teams">
            <h4>Команды в проекте: </h4>
            <hr/>
            <div v-for="team of project.teams" :key="team.id">
              <nuxt-link :to="'/teams/' + team.id">{{ team.name }}</nuxt-link>
            </div>
          </section>
          <!-- Component -->
          <request-from-team-button :project="project" @update-project="getProject()" />
      </aside>
    </div> 
  </div>
</template>

<script>
import axios from "axios";
import JoinProjectButton from "~/components/projects/project/service/joinProjectButton.vue";
import RequestFromTeamButton from "~/components/projects/project/service/requestFromTeamButton.vue";
import Participants from "~/components/common/participants.vue";

export default {
  name: "Project",
  components:{
    JoinProjectButton,
    RequestFromTeamButton,
    Participants
  },
  data(){
    return {
      url: process.env.baseUrl,
      defAvatar: process.env.defAvatar,
      project: {}
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
    isOwner(project) {
      return project.owner.id === this.$store.state.userProfile.id; 
    },
    managerFilter(project){
      if (project.owner){
        return this.$store.state.authUser && this.isOwner(project)
      }
      return false  
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