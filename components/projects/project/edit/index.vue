<template>
  <div>
    <div class="project_edit">
      <p>
        Отредактируйте проект
      </p>
      <hr />
      <form @submit.prevent="checkForm" method="post">
        <p>
          <label>Название</label>
          <input type="text" v-model="project.name" class="form-control" placeholder="About" />
        </p>
        <p>
          <label>О чем проект</label>
          <textarea
            class="form-control"
            v-model="project.description"
            placeholder="Descrition"
            aria-label="With textarea"
          ></textarea>
        </p>
        <p>
          <label>Ссылка на сайт:</label>
          <input type="text" v-model="project.url" class="form-control" placeholder="https://google.com" />
        </p>
        <p>
          <label>Ссылка на презентацию проекта:</label>
          <input type="text" v-model="project.url_presentation" class="form-control" placeholder="https://google.com" />
        </p>
        <p>В какой стадии проект:</p>
        <p>
          <select v-model="stage_selected">
            <option disabled value>Выберите один из вариантов</option>
            <option>idea</option>
            <option>design</option>
            <option>mvp</option>
            <option>product</option>
          </select>
        </p>
        <input type="submit" class="btn btn-primary" value="Отправить" />
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "ProjectEdit",
  data() {
    return {
      project: {},
      stage_selected: "",
      baseUrl: process.env.baseUrl
    };
  },
  async fetch(){
    await this.getProject();
  },
  methods: {
    async getProject(){
      const data = await this.$axios.$get(`/projects/${this.$route.params.id}`);
      this.project = data
      this.stage_selected = data.stage;
    },
    async checkForm() {
      let proj = {
        name: this.project.name,
        description: this.project.description,
        url: this.project.url,
        url_presentation: this.project.url_presentation,
        stage: this.stage_selected,
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
