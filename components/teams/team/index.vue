  <template>
    <v-card style="margin-bottom:20px" max-width="900">
    <v-row>

      <v-col sm="8">

        <v-img height="120"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        >
        </v-img>

        <v-card-text>
           <v-row align="end" class="pa-3  fill-height" >
            <h2>
              {{team.name}}
            </h2>
          </v-row>
          {{ team.about }}
        </v-card-text>

      </v-col>

      <v-col>
        <v-row justify="end" no-gutters class="mr-2">
          <v-col style="text-align: end">{{ team.created_at | formatDate }}</v-col>
        </v-row>
        <v-card-title>Команда</v-card-title>
        <participants :resource="team" :owner_profile="team.leader" />
        <section v-if="sendReqFilter(team)" class="team_aside_skills" >
          <h4>Заявка в команду </h4>
          <v-divider />
          <v-btn color="primary" class="mt-3" @click="sendTeamReq(team)">Отправить</v-btn>
        </section>
        <v-spacer></v-spacer>
        <!-- management -->
        <div v-if="managerFilter(team)">
        <v-card-title>Управление </v-card-title>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-btn
              color="primary"
              nuxt
              :to="`/teams/${team.id}/auth/edit`"
            >
              Изменить
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="primary"
              nuxt
              :to="`/teams/${team.id}/auth/requests`"
            >
              Заявки в команду
            </v-btn>
          </v-col>

        </v-row>
        </div>
      </v-col>

    </v-row>
  </v-card>
</template>

<script>
import Participants from '~/components/common/participants.vue';

export default {
  name: 'MestoTeam',
  components: {
    Participants,
  },
  data() {
    return {
      devUrl: process.env.baseUrl,
      defAvatar: process.env.defAvatar,
      team: { leader: { avatar: [] } },
    };
  },
  async created() {
    await this.getTeam();
  },
  methods: {
    backimg(profile) {
      return `${this.devUrl}${
        profile.avatar.length
          ? profile.avatar[0].formats.thumbnail.url
          : this.defAvatar
      }`;
    },
    async getTeam() {
      this.team = await this.$axios.$get(`/teams/${this.$route.params.id}`);
    },
    isOwner(team) {
      return team.leader.id === this.$store.state.userProfile.id;
    },
    managerFilter(team) {
      let manager = false;
      if (team.leader) {
        manager = this.$store.state.authUser && this.isOwner(team);
      }
      return manager;
    },
    sendReqFilter(team) {
      return (
        this.$store.state.authUser
        && !this.isOwner(team)
        && !this.inTeam(team.participants)
        && !this.inTeam(team.requests)
      );
    },
    inTeam(participants) {
      // participants could be undefined
      const pid = this.$store.state.userProfile.id;
      if (participants) {
        const partFound = participants.some((p) => p.id === pid);
        if (partFound) { return true; }
      }
      return false;
    },
    async sendTeamReq(team) {
      const profile = this.$store.state.userProfile.id;
      const newReqs = [...team.requests, profile];
      await this.$axios.$put(`/teams/${team.id}`,
        { requests: newReqs });
      this.getTeam();
    },
  },
};
</script>
