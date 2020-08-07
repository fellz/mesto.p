<template>
  <section class="profile_edit_skills">
    <h5>Навыки:</h5>
    <select
      v-model="selected"
      class="custom-select"
      style="height:100%; margin-left:10px;"
      multiple
    >
      <option disabled value>Выберите несколько вариантов</option>
      <option v-for="skill of skills" :key="skill.id" :value="skill.id">{{skill.skill}}</option>
    </select>
    <input
      type="submit"
      class="btn btn-primary edit_skills-button_margin"
      @click="skillChoosen"
      value="Изменить"
    />
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileSkills",
  data() {
    return {
      skills: [],
      selected: [],
      baseUrl: process.env.baseUrl
    };
  },
  created() {
    this.getSkills()
  },
  methods: {
    async getSkills(){
      const { data } = await axios.get(`${this.baseUrl}/skills`);
      this.skills = data;
    },
    async skillChoosen() {
      const skills = this.selected;
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const resp = await axios.put(
        `${this.baseUrl}/profiles/${this.$store.state.userProfile.id}`,
        { skills },
        options
      );
      this.$router.replace({ path: "/my" });
    }
  }
};
</script>

<style>
.profile_edit_skills {
  height: 400px;
}
.edit_skills-button_margin{
  margin-top: 20px;
}
</style>