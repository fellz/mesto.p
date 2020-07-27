  <template>
  <div>
    <div class="project-wrapper">
      <div class="project_main">
        <div class="project_main_header">
          <div class="project_main_header_time text-muted">Создан: {{ project.created_at | formatDate }}</div>
          <div class="project_main_header_status">Статус: {{ project.stage }} </div>
        </div>
        <nuxt-link :to="'/projects/' + project.id" class="project_name">{{ project.name }}</nuxt-link>
        <p>{{ project.description }}</p>
      </div>
      <div class="project_aside">
        <div v-if="$store.state.authUser && is_owner(project)" class="project_aside_manage">
          <h4>Управление</h4>
          <hr/>
          <nuxt-link
            class="btn btn-primary project_aside_manage_edit_teams"
            :to="'/projects/' + project.id+'/team_reqs'"
          >Команды</nuxt-link>
          <nuxt-link
            class="btn btn-primary project_aside_manage_edit"
            :to="'/projects/' + project.id+'/edit'"
          >Редактировать</nuxt-link>
          <nuxt-link
            class="btn btn-primary project_aside_manage_edit_skills"
            :to="'/projects/' + project.id+'/edit_skills'"
          >Вакансии</nuxt-link>
        </div>
        <h4>Команда</h4>
        <hr/>
        <div class="project_aside_team-flex">
          <div class="project_aside_project_owner">
            <div v-if="project.owner"
              class="project_aside_project_owner_photo"
              :src="thumb(project.owner)"
              :style="backimg(project.owner)">
            </div>
            <nuxt-link :to="'/profiles/' + project.id">{{ project.owner?  project.owner.fullname :'' }}</nuxt-link>
          </div>
          <div v-for="p of project.participants" :key="p.id" class="project_aside_team-member">
            <div
                class="project_aside_team_photo"
                :src="thumb(p)"
                :style="backimg(p)"
              ></div>
              <nuxt-link :to="'/profiles/' + p.id">{{p.fullname}}</nuxt-link>
          </div>
        </div>
        <div class="project_aside_skills">
          <h4>Кто нужен в проект: </h4>
          <hr/>
          <div v-for="s of project.project_skills" :key="s.id">
            {{ s.name }}
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  name: "ProjectMain",
  props: {
    proj: Object, // Observable have to use watcher
  },
  data(){
    return {
      url: process.env.baseUrl,
      defAvatar: process.env.defAvatar,
      project: {}
    }
  },
  watch:{ // proj is Observable
    proj: function(){
      this.project = this.proj 
    }
  },
  methods: {
    backimg(profile) {
      return `background-image: url(${this.url}${
        profile.avatar !== null
          ? profile.avatar.formats.thumbnail.url
          : this.defAvatar
      })`;
    },
    thumb(profile){
      return this.url + (profile.avatar ? profile.avatar.formats.thumbnail.url : this.defAvatar)
    },
    is_owner(project) {
      return project.owner.id === this.$store.state.userProfile.id;
    }
  }
};
</script>

<style>
.project-wrapper{
  display: flex;
}
.project_main{
  width: 60%;
  padding-right: 50px;
}
.project_main_header{
  display:flex;
  justify-content: space-between;
  margin-bottom:20px;
}
.project_main_header_status{
  padding:0 10px 0 10px;
  background-color: gray;
  color:white;
}

.project_aside{
  width: 40%;
}
.project_aside_manage{
  margin-bottom:10px;
}
.project_aside_manage a{
  margin-right:5px;
}
.project_aside_team-flex {
  display: flex;
  flex-flow: wrap;
}
.project_aside_team-member, .project_aside_project_owner{
  margin-right: 10px;
}
.project_aside_team_photo, .project_aside_project_owner_photo {
  width: 70px;
  height: 70px;
  background-position: center;
  border-radius: 50%;
  margin: auto;
}
.project_aside_project_owner_photo{
  border: 2px solid red;
}
.project_aside_edit_skills{
  margin-left: 100px;
}
.project_edit_stage{
  float: right;
}
.project_aside_skills{
  margin-top: 20px;
}
</style>