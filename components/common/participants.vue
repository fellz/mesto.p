<template>
  <div>
    <!-- Owner avatar -->
      <nuxt-link :to="'/profiles/' + profile.id">
        <v-avatar size="70" style="border: 2px solid red" >
          <v-img
            class="elevation-6"
            :src="backimg(profile)"
          />
        </v-avatar>
      </nuxt-link>
      <!-- other members -->
      <span v-for="p in resource.participants" :key="p.id">
        <nuxt-link :to="`/profiles/${p.id}`" >
          <v-avatar size="60">
            <v-img
              class="elevation-6"
              :src="backimg(p)"
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
      profile:{},
      res:[],
      url: process.env.baseUrl,
      defAvatar: process.env.defAvatar
    }
  },
  created(){
    if(this.owner_profile){
      this.profile = this.owner_profile
    }
    if(this.resource){
      this.res = this.resource      
    }
  },
  watch:{
    owner_profile(new_val){
      this.profile = new_val
    },
    resource(new_val){
      this.res = new_val
    }
  },
  methods:{
    backimg(profile) {
      return `${
        profile.avatar
          ? ""
          : this.defAvatar}`
    },
    thumb(profile){
      return this.url + (profile.avatar ? "" : this.defAvatar)
    },
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