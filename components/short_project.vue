  <template>
  <div>
    <div class="card card_margin">
      <div class="card-header">
        <nuxt-link :to="'/projects/' + project.id" class="project_name">{{ project.name }}</nuxt-link>
        <nuxt-link v-if="project.owner && isOwner(project)" :to="'/projects/' + project.id+'/edit'" >Edit</nuxt-link>
        <span class="float-right">{{ project.stage}}</span>
      </div>
      <div class="card-body">
        <v-clamp autoresize :max-lines="3">{{ project.description }}</v-clamp>
        <button
          type="button"
          class="btn btn-primary"
          v-if="$store.state.authUser && inProject(project) && !isOwner(project)"
          @click="joinProject(project.id, project.participants)"
        >Присоединиться</button>
        <div v-if="req_await" style="color:red">Работает</div>
      </div>
      <div class="card-footer text-muted">
        <span>Основатель:</span>
        <nuxt-link v-if="project.owner" :to="'/profiles/' + project.owner.id">{{ project.owner.fullname }}</nuxt-link>
        <span>Участники:</span>
        <span v-for="participant of project.participants" :key="participant.id" class="profiles">
          <nuxt-link :to="'/profiles/' + participant.id">{{participant.fullname}}</nuxt-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VClamp from 'vue-clamp';

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
  methods: {
    isOwner(project){
      return project.owner.id === this.$store.state.authUser.user.profile.id
    },

    inProject(project){
      let proj = null
      if (project.participants){
        proj = !project.participants.some(pr => pr.id === this.$store.state.authUser.user.profile.id )
      }else{
        proj = false
      }
      return proj
    },
    async joinProject(id, participants) {
      // let req_await = true; // block button while waiting
      // Update ids of participants field -> project.participants
      const profile_id = this.$store.state.authUser.user.profile.id;
      let new_ps = [...participants, profile_id];
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const { data: project} = await axios.put(
        `${process.env.baseUrl}/projects/${id}`,
        { participants: new_ps  },
        options
      );
      const myprojs = this.$store.state.userProfile.projects;
      const new_projs = [...myprojs, id]
      const resp = await axios.put(
        `${process.env.baseUrl}/profiles/${profile_id}`,
        { projects: new_projs  },
        options
      );
     // req_await = false; // ublock button
      this.$store.dispatch("getItems", { resource: "projects", start: 0 });
    }
  }
};
</script>