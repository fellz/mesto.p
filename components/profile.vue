<template>
  <div>
    <div class="profile_wrapper">
      <div class="profile_photo">
        <img :src="avatar"  />
        <div>{{profile.country}}</div>
        <div>{{profile.city}}</div>
        <div>{{profile.age}}</div>
      </div>
      <div>
        <h5>
          <nuxt-link :to="'/profiles/'+profile.id" class="profile_name">{{ profile.fullname }}</nuxt-link>
        </h5>
        <div class="profile_about_wrapper">
          <p>
            <span class="profile_bold">Опыт:</span>
            {{ profile.experience}}
          </p>
          <p>
            <span class="profile_bold">О себе:</span>
            {{ profile.about }}
          </p>
          <p>
            <button
              type="button"
              class="btn btn-primary"
              v-if="!inContacts(profile) && !(profile.id === this.$store.state.authUser.user.profile.id)"
              @click="addToContacts(profile)"
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
  computed:{
    avatar(){
      let url = "";
      if (this.profile.avatar){
         url = process.env.baseUrl + this.profile.avatar.formats.thumbnail.url
      }else{
        url = process.env.baseUrl + process.env.defAvatar
      }
      return url
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
      console.log(resp);
      // req_await = false; // ublock button
      this.$store.dispatch("getProfile");
      this.$nuxt.$router.replace({ path: "/profiles/" + profile.id });
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