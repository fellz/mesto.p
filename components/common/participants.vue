<template>
  <div>
    <main class="participants">
      <div v-if="profile" class="participants__owner">
        <div 
          class="owner__photo"
          :src="thumb( profile )"
          :style="backimg( profile )">
        </div>
        <nuxt-link :to="'/profiles/' + profile.id">{{ profile.fullname }}</nuxt-link>
      </div>
      <div v-for="p of res.participants" :key="p.id" class="participants__member" >
        <div
            class="member__photo"
            :src="thumb( p )"
            :style="backimg( p )"
          ></div>
        <div>
          <nuxt-link :to="'/profiles/' + p.id">
            {{p.fullname}}
          </nuxt-link>
        </div>
      </div>
    </main>
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
      return `background-image: url(${this.url}${
        profile.avatar
          ? profile.avatar.formats.thumbnail.url
          : this.defAvatar
      })`;
    },
    thumb(profile){
      return this.url + (profile.avatar ? profile.avatar.formats.thumbnail.url : this.defAvatar)
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
  width: 70px;
  height: 70px;
  background-position: center;
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