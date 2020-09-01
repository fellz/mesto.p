<template>
  <v-row justify="center">
    <v-col sm=6>
      <v-form>
        <v-text-field
          v-model="name"
          name="name"
          label="Название проекта"
        ></v-text-field>

        <v-textarea
          v-model="description"
          auto-grow
          label="О проекте"
          value="Расскажите о своем проекте"
        ></v-textarea>

        <v-select
          v-model="stage_selected"
          :items="skills"
          label="Выберите навык"
        ></v-select>

        <v-text-field
          v-model="url"
          name="url"
          label="Сайт проекта"
        ></v-text-field>

        <v-btn class="mr-4" @click="submit">Отправить</v-btn>

      </v-form>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: "ProjectEdit",
  data() {
    return {
      name: '',
      description: '',
      url: '',
      skills: ['idea', 'design', 'mvp', 'product'],
      stage_selected: "",
      baseUrl: process.env.baseUrl
    };
  },
  async created(){
    await this.getProject();
  },
  methods: {
    async getProject(){
      const data = await this.$axios.$get(`/projects/${this.$route.params.id}`);
      this.name = data.name
      this.description = data.description
      this.url = data.url
      this.stage_selected = data.stage;
    },
    async submit() {
      let proj = {
        name: this.name,
        description: this.description,
        url: this.url,
        stage: this.stage_selected
      };
      const resp = await this.$axios.$put(`/projects/${this.$route.params.id}`, proj,);
      this.$nuxt.$router.replace(`/projects/${this.$route.params.id}`);
    }
  }
};
</script>

<style >
.project_edit {
  width: 50%;
}
</style>>
