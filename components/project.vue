  <template>
  <div>
    <div class="card card_margin">
      <div class="card-header">
        <nuxt-link :to="'/projects/' + project.id" class="project_name">{{ project.name }}</nuxt-link>
        by
        <nuxt-link
          v-if="project.owner"
          :to="'/profiles/' + project.owner.id"
        >{{ project.owner.fullname }}</nuxt-link>
        <nuxt-link
          class="project_edit_skills"
          v-if="this.$store.state.authUser && project.owner && is_owner(project)"
          :to="'/projects/' + project.id+'/edit_skills'"
        >Роли</nuxt-link>
        <nuxt-link
          class="project_edit"
          v-if="this.$store.state.authUser && project.owner && is_owner(project)"
          :to="'/projects/' + project.id+'/edit'"
        >Edit</nuxt-link>
        <nuxt-link
          class="project_edit"
          v-if="this.$store.state.authUser && project.owner && is_owner(project)"
          :to="'/projects/' + project.id+'/team_reqs'"
        >Команды</nuxt-link>
        <span class="project_edit_stage">{{ project.stage}}</span>
      </div>
      <div class="card-body">
        <p>{{ project.description }}</p>
      </div>
      <div class="card-footer text-muted">
        <span v-if="project.participants &&  project.participants.length > 0">Участники:</span>
        <span v-for="participant of project.participants" :key="participant.id" class="profiles">
          <nuxt-link :to="'/profiles/' + participant.id">{{participant.fullname}}</nuxt-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    project: Object
  },
  data() {
    return {
      //req_await: false // block button
    };
  },
  methods: {
    is_owner(project) {
      return project.owner.id === this.$store.state.authUser.user.profile.id;
    }
  }
};
</script>

<style>
.project_edit_skills{
  margin-left: 100px;
}
.project_edit_stage{
  float: right;
}
</style>