<template>
  <div>
    <div class="row profile">
      <aside class="col-sm-3 profile__aside">
        <img :src="avatar"  />
        <div class="font-weight-bold">{{profile.country}}</div>
        <div class="font-weight-bold">{{profile.city}}</div>
        <div v-if="profile.age || profile.age !== 0" class="font-weight-bold">{{profile.age}}</div>
      </aside>
      <main class="col-sm-9">
        <header class="main__header">
          <h5>{{ profile.fullname }}</h5>
          <div v-if="profile.social > 0" class="font-weight-bold">{{ profile.social }} Спасибо</div>
        </header>
        <section>
          {{ profile.about }}
        </section>
        <section v-if="profile.myprojects && profile.myprojects.length > 0">
          <h5>Мои проекты:</h5>
          <hr>
          <div v-for="project of profile.myprojects" :key="project.id">
            <nuxt-link :to="'/projects/' + project.id">{{ project.name }}</nuxt-link>
          </div>
        </section>
        <section v-if="profile.url && profile.url !=0" >
          <h5>Как связаться</h5>
          <hr/>
          <a :href="profile.url">{{ profile.url }}</a>
        </section>
        <section v-if="profile.skills && profile.skills.length > 0 ">
          <span class="font-weight-bold">Навыки:</span>
          <span class="skills__name" v-for="skill of profile.skills" :key="skill.id">
            {{skill.skill}}
          </span>
        </section>
        <section>
          <button
            type="button"
            class="btn btn-primary"
            v-if="this.$store.state.authUser && !inContacts(profile) && !(profile.id === this.$store.state.authUser.user.profile.id)"
            @click="addToContacts(profile)"
          >В контакты</button>
          <button
            type="button"
            class="btn btn-primary"
            v-if="this.$store.state.authUser && filterSocial(profile) && isUser(profile)"
            @click="upSocial(profile)"
          >Спасибо</button>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      profile: {},
      url: process.env.baseUrl
    }
  }, 
  created(){
    this.getProfile();
  },
  computed:{
    avatar(){
      return this.profile.avatar ? this.url + this.profile.avatar.formats.thumbnail.url : this.url + process.env.defAvatar
     },
  },
  methods: {
    async getProfile(){
      const { data } = await axios.get(`${this.url}/profiles/${this.$route.params.id}`);
      this.profile = data;
    },
    async addToContacts(profile) {
      // we add user to contacts, contacts recives only users
      let contacts = this.$store.state.userProfile.contacts;
      const my_profile = this.$store.state.userProfile.id; // my profile id
      const new_contacts = [...contacts, profile.id]; // we get new array here because we cann't modify store
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const resp = await axios.put(
        `${this.url}/profiles/${my_profile}`,
        { contacts: new_contacts },
        options
      );
      this.$store.dispatch("getProfile");
      
    },
    async upSocial(profile) {
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const logged_in_user_id = this.$store.state.userProfile.id
      const resp = await axios.post(
        `${this.url}/socials`,
        { name: "spasibo", profile_whom: profile , profile_who: logged_in_user_id   },
        options
      );
      const resp_prof = await axios.put(
        `${this.url}/profiles/${profile.id}`,
        { social: profile.social += 1   },
        options
      );
      this.$store.dispatch("getProfile");
      
    },
    filterSocial(prof){
      let sb = true
      const profs = this.$store.state.userProfile.social_trackers
      const whoms = profs.map(p => p.profile_whom) // [1,3,4]
      const in_social = whoms.some(w => w === prof.id)
      if (in_social){
        sb = false
      }
      return sb
    },
    isUser(prof){
      return !(this.$store.state.userProfile.id === prof.id)
    },
    inContacts(profile) {
      let mycontacts = this.$store.state.userProfile.contacts;
      let contact_exist = false;
      if (mycontacts.some(ct => ct.id === profile.id)) {
        contact_exist = true;
      }
      return contact_exist;
    }
  }
};
</script>

<style>
  .profile__aside {
    padding-right: 20px;
  }
  .main__header {
    display:flex;
    justify-content: space-between;
  }
  .skills__name{
    margin-right: 10px;
    color: blue;
    background-color: rgb(210, 210, 210);
  }
</style>