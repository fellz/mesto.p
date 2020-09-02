<template>
  <div>
    <div class="row short_team">
      <main class="col-sm-6 short_team__main">
        <div class="main__head">
          <h4><nuxt-link :to="`/teams/${team.id}`">{{ team.name }}</nuxt-link></h4>
        </div>
        <v-clamp autoresize :max-lines="10">{{ team.about }}</v-clamp>
      </main>
      <aside class="col-sm-6 short_team__aside">
        <header class="row aside">
          <h4 class="col-sm-6">Участники</h4>
          <div class="col-sm-6 text-right text-muted">Создана: {{ team.created_at |  formatDate }}</div>
        </header>
        <hr/>
        <!-- Participants component -->
        <participants :owner_profile="team.leader" :resource="team" />
        
        <section class="aside__projects" v-if="team.projects.length > 0">
          <h5>Участвует в проектах</h5>
          <hr/>
          <span v-for="proj of team.projects" :key="proj.id">
            <nuxt-link :to="'/projects/'+proj.id">{{ proj.name }}</nuxt-link>
          </span>
        </section>
      </aside>
    </div>
  </div>
</template>

<script>
import VClamp from "vue-clamp";
import Participants from "~/components/common/participants.vue";

export default {
  name: "ShortTeam",
  props:{
    team: Object
  },
  components: {
    VClamp,
    Participants
  }
}
</script>

<style >
.short_team {
    border-radius: 8px;
    border: 1px solid #d4cfcf;
    padding: 14px;
    margin-bottom: 10px;
    background-color: white;
}
</style>