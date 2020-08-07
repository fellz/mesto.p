<template>
  <div >
    <h5>Создайте проект</h5>
    <hr />
    <form @submit.prevent="checkForm" method="post" >
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
        <select v-model="selected">
          <option disabled value>Выберите один из вариантов</option>
          <option>idea</option>
          <option>design</option>
          <option>mvp</option>
          <option>product</option>
        </select>
      </p> 
      <input type="submit" class="btn btn-primary" value="Отправить" />
    </form>
    <div v-if="progress">Создаем</div>
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
      selected: "",
      skills: [],
      skills_selected: [],
      progress: false
    };
  },
  middleware: ["auth"],
  async fetch(){
      const {data: skills } = await axios.get(`${process.env.baseUrl}/skills`)
      this.skills = skills
  },
  methods: {
    async checkForm() {
      let progress = true
      let proj = {
        name: this.project_name,
        description: this.project_description,
        owner: { id: this.$store.state.authUser.user.profile.id },
        stage: this.selected,
        skills: this.skills_selected
      };
      const options ={
        headers: {'Authorization': `Bearer ${this.$store.state.authUser.jwt}`}
      } 
      const { data:project } = await axios.post(
        `${process.env.baseUrl}/projects`,
        proj,
        options
      );
      const myprojs = this.$store.state.userProfile.myprojects;
      const prof_id = this.$store.state.userProfile.id
      const new_myprojs = [...myprojs, project.id]
      const {data: profile} = await axios.put(
        `${process.env.baseUrl}/profiles/${prof_id}`,
        {myprojects: new_myprojs },
        options
      )
      progress = false
      this.$nuxt.$router.replace({ path: '/projects'})
    }
  },

};
</script>
