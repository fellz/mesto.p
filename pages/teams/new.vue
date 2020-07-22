<template>
  <div>
    <form @submit.prevent="checkForm" method="post" class="project_new-width">
      <p>
        <label>Название</label>
        <input type="text" v-model="team.name" class="form-control" placeholder="About" />
      </p>
      <p>
        <label>Чем занимается команда</label>
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
import axios from "axios";

export default {
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
      const options ={
        headers: {'Authorization': `Bearer ${this.$store.state.authUser.jwt}`}
      } 
      const { data } = await axios.post(
        `${process.env.baseUrl}/teams`,
        team,
        options
      );
      this.$router.replace('/teams')
    }
  }
}
</script>