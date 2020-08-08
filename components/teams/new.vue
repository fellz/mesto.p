<template>
  <div>
    <form @submit.prevent="checkForm" method="post" class="project_new-width">
      <p>
        <label>Название</label>
        <input type="text" v-model="team.name" class="form-control" placeholder="About" />
      </p>
      <p>
        <label>Миссия команды</label>
        <textarea
          class="form-control"
          v-model="team.about"
          placeholder="Descrition"
          aria-label="With textarea"
        ></textarea>
      </p> 
      <input type="submit" class="btn btn-primary" value="Отправить" />
    </form>
  </div>
</template>

<script>

export default {
  name: "NewTeam",
  data(){
    return {
      team: {}
    }
  },
  methods:{
    async checkForm() {
      let team = {
        name: this.team.name,
        about: this.team.about,
        leader: this.$store.state.userProfile.id
      }; 
      const resp = await this.$axios.$post(`/teams`,
        team
      );
      this.$router.replace('/teams')
    }
  }
}
</script>