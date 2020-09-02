<template>
  <v-card style="margin-bottom:20px" max-width="900">
    <v-row>
      <v-col cols="8">
        <v-img height="100"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        >
        </v-img>

        <v-card-text>
          <h2 class="py-2">
            <nuxt-link 
              :to="'/teams/' + team.id" 
            >
              {{ team.name }}
            </nuxt-link>
          </h2>
          <v-clamp autoresize :max-lines="6">{{ team.about }}</v-clamp>
        </v-card-text>

      </v-col>
      <!--header with time  -->
      <v-col>
        <v-row justify="end" no-gutters class="mr-2">
          <v-col style="text-align: end">{{ team.created_at | formatDate }}</v-col>
        </v-row>

        <v-card-title>Команда</v-card-title>
        <participants :resource="team" :owner_profile="team.leader" />

      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import VClamp from "vue-clamp";
import Participants from "~/components/common/participants.vue" 

export default {
  name: "ShortTeam",
  props: {
    team: Object
  },
  components: {
    VClamp,
    Participants
  }
};
</script>

