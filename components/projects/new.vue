<template>
  <div >
    <h5>Создайте проект</h5>
    <hr />
    <form @submit.prevent="checkForm" method="post" >
      <section>
        <label>Название</label>
        <input type="text" v-model="project.name" class="form-control" placeholder="About" />
      </section>
      <section>
        <label>О чем проект</label>
        <textarea
          class="form-control"
          v-model="project.description"
          placeholder="Descrition"
          aria-label="With textarea"
        ></textarea>
      </section>
      <section>
        <label>В какой стадии проект:</label>
        <select v-model="selected">
          <option disabled value>Выберите один из вариантов</option>
          <option>idea</option>
          <option>design</option>
          <option>mvp</option>
          <option>product</option>
        </select>
      </section>
      <input type="submit" class="btn btn-primary" value="Отправить" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {},
      users: [],
      selected: "",
    };
  },
  methods: {
    async checkForm() {
      let proj = {
        name: this.project.name,
        description: this.project.description,
        owner: { id: this.$store.state.userProfile.id },
        stage: this.selected
      };
      //authorized request
      const project = await this.$axios.$post(`/projects`, proj);
      this.$nuxt.$router.replace({ path: '/projects'})
    }
  },

};
</script>
