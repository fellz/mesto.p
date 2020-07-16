  <template>
  <div>
    <div class="card card_margin">
      <div class="card-header">
        <nuxt-link :to="'/projects/' + project.id" class="project_name">{{ project.name }}</nuxt-link>
        <nuxt-link v-if="this.$store.state.authUser && project.owner && is_owner(project)" :to="'/projects/' + project.id+'/edit'" >Edit</nuxt-link>
        <span class="float-right">{{ project.stage}}</span>
      </div>
      <div class="card-body">
        <p>{{ project.description }}</p>
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
    is_owner(project){
      return project.owner.id === this.$store.state.authUser.user.profile.id
    },
  }
};
</script>