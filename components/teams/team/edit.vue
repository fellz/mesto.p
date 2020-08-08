<template>
  <div>
    <form @submit.prevent="checkForm" method="post">
      <p>
        <label>Название</label>
        <input type="text" v-model="team.name" class="form-control" placeholder="Имя" />
      </p>
      <p>
        <label>Миссия команды</label>
        <textarea
          class="form-control"
          v-model="team.about"
          placeholder="Descrition"
          aria-label="О команде, миссия"
        ></textarea>
      </p>
      <input type="submit" class="btn btn-primary" value="Отправить" />
    </form>
  </div>
</template>

<script>

export default {
  name: "TeamEdit",
  data() {
    return {
      team: {},
      baseUrl: process.env.baseUrl
    };
  },
  created(){
    this.getTeam();
  },
  methods: {
    async getTeam(){
      this.team = await this.$axios.$get(`/teams/${this.$route.params.id}`);
    },
    async checkForm() {
      let team = {
        name: this.team.name,
        about: this.team.about,
      };
      const resp = await this.$axios.$put(`/teams/${this.$route.params.id}`,
        team,
      );
      this.$nuxt.$router.replace(`/teams/${this.$route.params.id}`);
    }
  }
}
</script>