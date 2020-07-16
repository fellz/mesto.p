<template>
  <div>
    <div class="profile_wrapper">
      <div class="profile_photo">
        <img :src="avatar"  />
        <div>{{mutable_profile.country}}</div>
        <div>{{mutable_profile.city}}</div>
        <div>{{mutable_profile.age}}</div>
      </div>
      <div>
        <h5>
          <nuxt-link :to="'/profiles/'+ mutable_profile.id" class="profile_name">{{ mutable_profile.fullname }}</nuxt-link>
        </h5>
        <div class="profile_about_wrapper">
          <p>
            <span class="profile_bold">Опыт:</span>
            {{ mutable_profile.experience}}
          </p>
          <p>
            <span class="profile_bold">О себе:</span>
            {{ mutable_profile.about }}
          </p>
          <div v-if="mutable_profile.myprojects">
            <div v-if="mutable_profile.myprojects.length > 0">
              <span class="profile_bold">Мои проекты:</span>
              <hr>
              <div v-for="project of mutable_profile.myprojects" :key="project.id">
                <nuxt-link :to="'/projects/' + project.id">{{ project.name }}</nuxt-link>
              </div>
            </div>
          </div>
          
          <p>
            <button
              type="button"
              class="btn btn-primary"
              v-if="!inContacts(mutable_profile) && !(mutable_profile.id === this.$store.state.authUser.user.profile.id)"
              @click="addToContacts(mutable_profile)"
            >В контакты</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    profile: Object,
    default: {}
  },
  // created(){
  //   console.log('Mutable profile',this.mutable_profile)
  // },
  computed:{
    avatar(){
      let url = "";
      if (this.mutable_profile.avatar){
         url = process.env.baseUrl + this.mutable_profile.avatar.formats.thumbnail.url
      }else{
        url = process.env.baseUrl + process.env.defAvatar
      }
      return url
     },
    mutable_profile:{
      get(){
        return this.profile
      },
      set(new_profile){
        return new_profile
      }
    }
  },
  methods: {
    async addToContacts(profile) {
      // we add user to contacts, contacts recives only users
      let contacts = this.$store.state.userProfile.contacts;
      const my_profile = this.$store.state.userProfile.id; // my profile id
      const new_contacts = [...contacts, profile.id]; // we get new array here because we cann't modify store
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const resp = await axios.put(
        `${process.env.baseUrl}/profiles/${my_profile}`,
        { contacts: new_contacts },
        options
      );
      // req_await = false; // ublock button
      this.$store.dispatch("getProfile");
      
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
   watch: {
      "$store.state.userProfile": function() {
        this.mutable_profile = this.$store.state.userProfile;
      }
    },

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
</style>