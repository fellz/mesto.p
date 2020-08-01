<template>
  <div>
    <div class="profile_wrapper">
      <div class="profile_photo">
        <img :src="avatar"  />
        <div>{{profile.country}}</div>
        <div>{{profile.city}}</div>
        <div v-if="profile.age || profile.age !== 0">{{profile.age}}</div>
      </div>
      <div>
        <div class="profile--head">
          <h5>
            <nuxt-link :to="'/profiles/'+ profile.id" class="profile_name">{{ profile.fullname }}</nuxt-link>
          </h5>
          <div v-if="profile.social > 0" class="profile--head--social">{{ profile.social }} Спасибо</div>
        </div>
        <div class="profile_about_wrapper">
          <p>
            <span class="profile_bold">О себе:</span>
            {{ profile.about }}
          </p>
          <div v-if="profile.myprojects && profile.myprojects.length > 0">
            <h5>Мои проекты:</h5>
            <hr>
            <div v-for="project of profile.myprojects" :key="project.id">
              <nuxt-link :to="'/projects/' + project.id">{{ project.name }}</nuxt-link>
            </div>
          </div>
          <br/>
          <div>
            <h4>Как связаться</h4>
            <a :href="profile.url">{{ profile.url }}</a>
          </div>
          <hr/>
          <p>
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
            
          </p>
        </div>
      </div>
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
  },
  //  watch: {
  //     "$store.state.userProfile": function() {
  //       this.profile = this.$store.state.userProfile;
  //     }
  //   },

};
</script>

<style>
.profile_bold {
  font-weight: bold;
  padding-right: 10px;
}
.profile_about_wrapper {
  background-color: #f5f3f38f;
  padding: 10px;
}
.profile_wrapper {
  display: flex;
}
.profile_photo div{
  font-weight: bold;
}
.profile_photo{
  margin-right: 10px;
}
.profile--head{
  display:flex;
  justify-content: space-between;
}
.profile--head--social{
  font-weight: bold;
}
</style>