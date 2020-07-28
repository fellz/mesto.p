<template>
  <div>
    <p>Отредактируйте проект</p>
      <hr />
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
import axios from "axios";

export default {
  data() {
    return {
      team: {}
    };
  },
  middleware: ["auth"],
  async fetch(){
    const { data } = await axios.get(
      `${process.env.baseUrl}/teams/${this.$route.params.id}`
    );
    this.team = data;
  },
  methods: {
    async checkForm() {
      let team = {
        name: this.team.name,
        about: this.team.about,
      };
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const resp = await this.$http.put(
        `${process.env.baseUrl}/teams/${this.$route.params.id}`,
        team,
        options
      );
      this.$nuxt.$router.replace({
        path: `/teams/${this.$route.params.id}`
      });
    }
  }
}
</script>