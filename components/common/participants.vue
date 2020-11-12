<template>
  <div>
    <!-- Owner avatar -->
      <nuxt-link :to="'/profiles/' + owner_profile.id">
        <v-avatar size="70" style="border: 2px solid red" >
          <v-img
            class="elevation-6"
            :src="backimg(owner_profile)"
          />
        </v-avatar>
      </nuxt-link>
      <!-- other members -->
      <span v-for="participant in resource.participants" :key="participant.id">
        <nuxt-link :to="`/profiles/${participant.id}`" >
          <v-avatar size="60">
            <v-img
              class="elevation-6"
              :src="backimg(participant)"
            />
          </v-avatar>
        </nuxt-link>
      </span>
  </div>
</template>

<script>
export default {
  name: "Participants",
  props: {
    owner_profile: Object,
    resource: Object
  },
  data(){
    return {
      devUrl: process.env.baseUrl,
      defAvatar: process.env.defAvatar
    }
  },
  methods:{
    backimg(profile) {
      if (process.env.NODE_ENV === "development"){
        return `${this.devUrl}${ profile.avatar 
            ? profile.avatar.formats.thumbnail.url 
            : this.defAvatar}`
      }else{
        return `${ profile.avatar
            ? profile.avatar.formats.thumbnail.url
            : this.defAvatar}`
      }
      
    }
  }
}
</script>

<style>
.participants{
  display: flex;
  flex-flow: wrap;
}
.member__photo, .owner__photo{
  width: 80px;
  height: 80px;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  margin: auto;
}
.participants__owner, .participants__member{
  margin-right: 10px;
}
.owner__photo{
  border: 2px solid red;
}
</style>