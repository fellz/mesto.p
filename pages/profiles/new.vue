<template>
  <div class="container"> 
    <div class="create_project">
    <p v-if="userError" class="error">{{ userError }}</p>
    <p>Ваш профиль - это о вас и вашем опыте.</p>
    <hr />
    <form @submit.prevent="checkForm" method="post">
      <p>
        <label>Полное имя</label>
        <input type="text" v-model="fullname" class="form-control" placeholder="Имя" />
      </p>
      <p>
        <label>О вас</label>
        <textarea
          class="form-control"
          v-model="about"
          placeholder="Descrition"
          aria-label="With textarea"
        ></textarea>
      </p>
      <p>
        <label>Опыт</label>
        <textarea
          class="form-control"
          v-model="experience"
          placeholder="Descrition"
          aria-label="With textarea"
        ></textarea>
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
      fullname: "",
      about: "",
      experience: "",
      userError: ""
    };
  },
  middleware: ["auth"],
  methods: {
    async checkForm() {
      let profile = {
        fullname: this.fullname,
        about: this.about,
        experience: this.experience,
        user: this.$store.state.authUser.user.id
      };
      const options ={
        headers: {'Authorization': `Bearer ${this.$store.state.authUser.jwt}`}
      } 
      const {data} = await axios.post(
        `${process.env.baseUrl}/profiles`,
        profile,
        options
      );
      this.$store.commit('SET_USER_PROFILE', data)
      // try {
      //   this.$store.dispatch("getProfile")
      // } catch (e) {
      //   this.userError = e.message
      // }
      this.$nuxt.$router.replace({ path: '/my'})
    }
  }
};
</script>

<style >
.create_project {
  margin-left: 30px;
  width: 50%;
}
</style>