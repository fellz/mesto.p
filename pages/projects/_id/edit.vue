<template>
  <div>
    <div class="project_edit_wrapper">
      <p>
        Отредактируйте проект
      </p>
      <hr />
      <form @submit.prevent="checkForm" method="post">
        <p>
          <label>Название</label>
          <input type="text" v-model="project_name" class="form-control" placeholder="About" />
        </p>
        <p>
          <label>О чем проект</label>
          <textarea
            class="form-control"
            v-model="project_description"
            placeholder="Descrition"
            aria-label="With textarea"
          ></textarea>
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
import axios from "axios";

export default {
  data() {
    return {
      project_name: "",
      project_description: "",
      users: [],
      skills: [],
      stage_selected: "",
      skills_selected: []
    };
  },
  middleware: ["auth"],
  methods: {
    async checkForm() {
      let proj = {
        name: this.project_name,
        description: this.project_description,
        stage: this.selected,
        skills: this.skills_selected
      };
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const resp = await this.$http.put(
        `${process.env.baseUrl}/projects/${this.$route.params.id}`,
        proj,
        options
      );
      this.$nuxt.$router.replace({
        path: `/projects/${this.$route.params.id}`
      });
    }
  },
  async fetch() {
    const { data } = await axios.get(
      `${process.env.baseUrl}/projects/${this.$route.params.id}`
    );
    this.project_name = data.name;
    this.project_description = data.description;
    this.stage_selected = data.stage;
  }
};
</script>

<style >
.project_edit_wrapper {
  width: 50%;
}
</style>>
