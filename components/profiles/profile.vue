<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" >
      <v-card class="profile-dialog">
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
          <v-btn v-if="contactsFilter()" color="success" @click="addToContacts()">Вконтакты</v-btn>
          <v-btn v-if="sPasiboFilter()" color="success" @click="sPasibo()">Спасибо</v-btn> 
        </v-card-actions>
      </v-card>
      </v-col>
    </v-row>
</template>

<script>
export default {
  name: "MestoProfile",
  data(){
    return {
      profile: {},
      baseUrl: process.env.baseUrl,
      defAvatar: process.env.defAvatar
    }
  },
  computed:{
    profilePhotoUrl(){
      return (`${this.baseUrl}${this.profile.avatar
            ? this.profile.avatar.formats.thumbnail.url
            : this.defAvatar}`)
    }
  },
  async created(){
    await this.getProfile()
  },  
  methods:{
    async getProfile(){
      this.profile = await this.$axios.$get(`/profiles/${this.$route.params.id}`)
    },
    contactsFilter(){
      const prof = this.$store.state.userProfile
      const incontacts = prof.contacts.some(r => r.id == this.$route.params.id)
      const isSelf = prof.id == this.$route.params.id
      return this.$store.state.authUser && !incontacts && !isSelf
    },
    async addToContacts(){
      const prof  = this.$store.state.userProfile
      const new_contacts = [...prof.contacts, this.profile.id ]
      const resp = await this.$axios.$put(`/profiles/${prof.id}`,
        {contacts: new_contacts}
      )
      this.$store.dispatch('setProfile', { profile: resp })
      
    },
    sPasiboFilter(){
      const prof = this.$store.state.userProfile
      const current_profile_id = this.$route.params.id
      const st = prof.social_trackers.some(p => p.profile_whom == current_profile_id )
      const isSelf = prof.id == current_profile_id
      console.log(prof.social_trackers)
      return this.$store.state.authUser && !isSelf && !st
    },
    async sPasibo(){
      const prof  = this.$store.state.userProfile
      const resp = await this.$axios.$post('/socials',
        {name: "spasibo", profile_who: prof.id, profile_whom: this.$route.params.id}
      )
      console.log(resp)
      const new_profile = await this.$axios.$get(`/profiles/${prof.id}`,)
      
      this.$store.dispatch('setProfile', { profile: new_profile })
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