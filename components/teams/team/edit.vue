<template>
  <v-row justify="center">
    <v-col sm=6>
      <v-form>
        <v-text-field
          v-model="name"
          name="name"
          label="Название команды"
        ></v-text-field>

        <v-textarea
          v-model="about"
          auto-grow
          label="Миссия команды"
          value="Расскажите о своей команде"
        ></v-textarea>

        <v-btn class="mr-4" @click="submit">Отправить</v-btn>

      </v-form>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: "TeamEdit",
  data() {
    return {
      name: '',
      about: '',
      baseUrl: process.env.baseUrl
    };
  },
  async created(){
    const resp = await this.$axios.$get(`/teams/${this.$route.params.id}`)
    this.name = resp.name
    this.about = resp.about
  },
  methods:{
    async submit() {
      let team = {
        name: this.name,
        about: this.about,
      };
      const resp = await this.$axios.$put(`/teams/${this.$route.params.id}`, team);
      this.$nuxt.$router.replace(`/teams/${this.$route.params.id}`);
    }
  }
}
</script>
