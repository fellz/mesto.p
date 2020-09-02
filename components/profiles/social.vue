<template>
  <div v-if="$store.state.authUser">
    <v-btn v-if="generalFilter('contacts')" color="success" @click="addToContacts()">Вконтакты</v-btn>
    <v-btn v-if="generalFilter('social_trackers')" color="success" @click="sPasibo()">Спасибо</v-btn> 
  </div>
</template>

<script>
  export default {
    name: "SocialButtons",
    props: {
      profileId: Number
    },
    methods:{
      generalFilter(resource){
      let inresource = null
      const loggedInProfile = this.$store.state.userProfile
      if (resource === 'contacts'){
        inresource = loggedInProfile.contacts.some(r => r.id == this.profileId)
      }else{
        inresource = loggedInProfile.social_trackers.some(p => p.profile_whom == this.profileId )
      }
      const isSelf = loggedInProfile.id === this.profileId
      console.log('Self', isSelf)
      console.log('Logged', loggedInProfile.id)
      console.log('profile', this.profileId)


      return this.$store.state.authUser && !inresource && !isSelf
    },
    async addToContacts(){
      const loggedInProfile  = this.$store.state.userProfile
      const new_contacts = [...loggedInProfile.contacts, this.profileId ]
      const resp = await this.$axios.$put(`/profiles/${loggedInProfile.id}`,
        {contacts: new_contacts}
      )
      this.$store.dispatch('setProfile', { profile: resp })
    },
      // sPasiboFilter(){
      //   const loggedInProfile = this.$store.state.userProfile
      //   const st = loggedInProfile.social_trackers.some(p => p.profile_whom == profileId )
      //   const isSelf = loggedInProfile.id == profileId
      //   return this.$store.state.authUser && !isSelf && !st
      // },
      async sPasibo(){
        const loggedInProfile  = this.$store.state.userProfile
        const resp = await this.$axios.$post('/socials',
          {name: "spasibo", profile_who: loggedInProfile.id, profile_whom: this.profileId}
        )
        const new_profile = await this.$axios.$get(`/profiles/${loggedInProfile.id}`,)
        
        this.$store.dispatch('setProfile', { profile: new_profile })
      }
    }
  }
</script>