<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" >
      
      <v-card class="profile-dialog">
        <span style="position:relative; top:-80px; left:20px;" 
          v-if="profile.social"> 
          <v-icon>mdi-thumb-up</v-icon><v-chip>{{ social }}</v-chip>
        </span>
        <v-card-title class="headline grey lighten-2">
          {{ profile.fullname }}
        </v-card-title>
        <v-card-subtitle class="grey lighten-2">
          {{ profile.city }}
        </v-card-subtitle>

        <v-avatar class="profile-dialog-avatar" size="130">
          <v-img :src="profilePhotoUrl"></v-img>
        </v-avatar>

        <v-card-text>
          {{ profile.about }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-chip class="ma-2" v-for="s in profile.skills" :key="s.id">
            {{s.skill}}
          </v-chip>
          
        </v-card-actions>
        <v-card-actions >
          <social-buttons :profileId="profile.id" :profile="profile" />
         </v-card-actions>
      </v-card>
      </v-col>
    </v-row>
</template>

<script>
import SocialButtons from "~/components/profiles/social.vue"

export default {
  name: "MestoProfile",
  components: {
    SocialButtons
  },
  data(){
    return {
      profile: {},
      social: 0,
      devUrl: process.env.baseUrl,
      defAvatar: process.env.defAvatar
    }
  },
  computed:{
    profilePhotoUrl(){
      if (process.env.NODE_ENV === "development"){
        return `${this.devUrl}${ this.profile.avatar 
            ? this.profile.avatar.formats.thumbnail.url 
            : this.defAvatar}`
      }else{
        return `${ this.profile.avatar
            ? this.profile.avatar.formats.thumbnail.url
            : this.defAvatar}`
      }
    }
  },
  async created(){
    await this.getProfile()
    await this.getSocial()
  },  
  methods:{
    async getSocial(){
      this.social = await this.$axios.$get(`/socials/count?profile_whom=${this.$route.params.id}`)
    },
    async getProfile(){
      this.profile = await this.$axios.$get(`/profiles/${this.$route.params.id}`)
    }
  }
}
</script>

<style>
  .profile-dialog{
    position: relative;
    background-color: #f0f0f0;;
    padding-top: 100px;
  }
  .profile-dialog-avatar{
    position: absolute;
    right: 20px;
    top: 10px;    
  }
</style>