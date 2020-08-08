<template>
  <div>
    <h4>Профиль</h4>
    <hr />
    <div class="row myprofile">
      <aside class="col-sm-3 myprofile__aside">
        <div><nuxt-link to="/my/auth/edit/photo">изменить фото</nuxt-link></div>
        <div>
          <img :src=" url + avatar" />
        </div>
        <div class="font-weight-bold">
          {{ profile.country }}
        </div>
        <div class="font-weight-bold">
          {{ profile.city }}
        </div>
        <div v-if="profile.age" class="font-weight-bold">
          Возраст
          {{ profile.age }}
        </div>
      </aside>
      <main class="col-sm-9 myprofile__main">
        <header class="main__title">
          <h4>{{ profile.fullname }}</h4>
          <nuxt-link to="/my/auth/edit/">изменить описание</nuxt-link>
        </header>
        <section >
          {{ profile.about }}
        </section>
        <section>
          <b>Cайт: </b>
          <a :href="profile.url" target="_blank">{{ profile.url }}</a>
      </section>
      </main>
    </div>
    <profile-footer :profile="profile" />
  </div>
</template>

<script>
import ProfileFooter from "~/components/my/footer";

export default {
  name: "MyProfile",
  components:{
    ProfileFooter
  },
  data() {
    return {
      profile: {},
      userError: "",
      url: process.env.baseUrl,
      defAvatar: process.env.defAvatar
    };
  },
  async fetch(){
    await this.getProfile();
  },
  computed:{
    avatar(){
      return (this.profile.avatar ? this.profile.avatar.formats.thumbnail.url : this.defAvatar)
    }
  },
  methods: {
    async getProfile(){
      this.profile = await this.$axios.$get(`/profiles/${this.$store.state.userProfile.id}`);
    }
  }
};
</script>

<style>
.myprofile__aside{
  padding-right: 20px;   
}
.main__title{
    display: flex;
    justify-content: space-between;
  }  
.profile__footer{
  margin-top: 20px;
}  
</style>

