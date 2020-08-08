<template>
  <div>
    <div class="row profile">
      <main class="col-sm-9 profile__main">
        <!--<header class="main__header">
          <div v-if="profile.social > 0" class="font-weight-bold">{{ profile.social }} Спасибо</div>
        </header>-->
        <img class="main__avatar" :src="avatar"  />
        
        <section class="main__about">
          <div class="main__city text-left ">
          <span class="font-weight-bold">{{profile.city ? profile.city : " "}}</span>
        </div>
          <h5 class="main__fullname">{{ profile.fullname }}</h5>
          {{ profile.about }}
        </section>
        <section v-if="profile.skills && profile.skills.length > 0 ">
          <span class="font-weight-bold">Навыки:</span>
          <span class="skills__name" v-for="skill of profile.skills" :key="skill.id">
            {{skill.skill}}
          </span>
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
        <section>
          <button
            type="button"
            class="btn btn-primary"
            v-if="addToContactsFilter(profile)"
            @click="addToContacts(profile)"
          >В контакты</button>
          <button
            type="button"
            class="btn btn-primary"
            v-if="spasiboFilter(profile)"
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
  async fetch(){
    await this.getProfile()
  },
  computed:{
    avatar(){
      return this.profile.avatar ? this.url + this.profile.avatar.formats.thumbnail.url : this.url + process.env.defAvatar
     },
  },
  methods: {
    async getProfile(){
      this.profile = await this.$axios.$get(`/profiles/${this.$route.params.id}`);
    },
    // Show only to Authorized & Not in Contacts already & not myself
    addToContactsFilter(profile){
      return this.$store.state.authUser && !this.inContacts(profile) && !this.loggedUserFilter(profile)
    },
    async addToContacts(profile) {
      // we add user to contacts, contacts recives only users
      let contacts = this.$store.state.userProfile.contacts;
      const my_profile = this.$store.state.userProfile.id; // my profile id
      const new_contacts = [...contacts, profile.id]; // we get new array here because we cann't modify store
      const resp = await this.$axios.$put(`/profiles/${my_profile}`,
        { contacts: new_contacts },
      );
      this.$store.dispatch("getMyProfile");
    },
    spasiboFilter(profile){
      return this.$store.state.authUser && this.filterSocial(profile) && !this.loggedUserFilter(profile)
    },
    // FIX: можно проще
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
    async upSocial(profile) {
      const logged_in_user_id = this.$store.state.userProfile.id
      const resp = await this.$axios.$post(`/socials`,
        { name: "spasibo", profile_whom: profile , profile_who: logged_in_user_id   },
      );
      const resp_prof = await this.$axios.$put(`/profiles/${profile.id}`,
        { social: profile.social += 1   },
      );
      this.$store.dispatch("getMyProfile"); // update MyProfile data
      
    }, // Service functions
    loggedUserFilter(prof){
      return (this.$store.state.userProfile.id === prof.id)
    },
    inContacts(profile) {
      let mycontacts = this.$store.state.userProfile.contacts;
      let contact_exist = false;
      const res = mycontacts.some(ct => ct.id === profile.id);
      if (res) {
        contact_exist = true;
      }
      return contact_exist;
    }
  }
};
</script>

<style>
  .main__header {
    display:flex;
    justify-content: space-between;
  }
  .main__fullname {
    margin-bottom: 19px;
  }
  .main__city{
    color: #f96b6b;
    padding-bottom: 25px;
  }
  .main__avatar {
    border-radius: 50%;
    position: absolute;
    right: 56px;
    top: -24px;
  }
  .main__about {
    background-color: #ebebeb;;
    padding: 22px 30px 20px 35px;
    margin-top: 53px;
  }
  .skills__name{
    margin-right: 10px;
    color: blue;
    background-color: rgb(210, 210, 210);
  }
</style>