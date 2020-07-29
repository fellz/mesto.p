<template>
  <div>
    <div class="participants--flex">
      <div v-if="profile" class="participants--owner">
        <div 
          class="participants--owner--photo"
          :src="thumb( profile )"
          :style="backimg( profile )">
        </div>
        <nuxt-link :to="'/profiles/' + profile.id">{{ profile.fullname }}</nuxt-link>
      </div>
      <div v-for="p of res.participants" :key="p.id" class="participants--member" >
        <div
            class="participants--member--photo"
            :src="thumb( p )"
            :style="backimg( p )"
          ></div>
         <div> <nuxt-link :to="'/profiles/' + p.id">{{p.fullname}}</nuxt-link></div>
      </div>
    </div>
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
    owner_profile: function(){
      this.profile = this.owner_profile
    },
    resource: function(){
      this.res = this.resource
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
.participants--flex{
  display: flex;
  flex-flow: wrap;
}
.participants--member--photo, .participants--owner--photo{
  width: 70px;
  height: 70px;
  background-position: center;
  border-radius: 50%;
  margin: auto;
}
.participants--owner, .participants--member{
  margin-right: 10px;
}
.participants--owner--photo{
  border: 2px solid red;
}
</style>