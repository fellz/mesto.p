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

export default {
  name: "ProfileSkills",
  data() {
    return {
      skills: [],
      selected: [],
    };
  },
  async fetch() {
    await this.getSkills()
  },
  methods: {
    async getSkills(){
      this.skills = await this.$axios.$get(`/skills`);
    },
    async skillChoosen() {
      const skills = this.selected;
      const resp = await this.$axios.$put(`/profiles/${this.$store.state.userProfile.id}`,
        { skills }
      );
      this.$router.replace({ path: "/my/auth/" });
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