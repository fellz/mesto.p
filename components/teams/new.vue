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
  data() {
    return {
      name: '',
      about: '',
      baseUrl: process.env.baseUrl,
    };
  },
  methods: {
    async submit() {
      const team = {
        name: this.name,
        about: this.about,
        leader: this.$store.state.userProfile.id,
      };
      await this.$axios.$post('/teams', team);
      this.$nuxt.$router.replace('/teams');
    },
  },
};
</script>
