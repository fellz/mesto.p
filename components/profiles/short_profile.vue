<template>
  <div class="short_profile">
    <div>
      <div class="short_profile_photo" :style="backimg"></div>
      <div><b>{{profile.city}}</b></div>
    </div>
    <div class="short_profile_main">
      <div class="short_profile--main--head">
        <h5>
          <nuxt-link :to="'/profiles/'+profile.id" class="profile_name">{{ profile.fullname }}</nuxt-link>
        </h5>
        <div v-if="profile.social > 0" class="short_profile--main--head--social">{{ profile.social }} Спасибо</div>
      </div>
      <div class="short_profile_wrapper">
        <p>
          <span class="profile_bold">О себе:</span>
          <v-clamp autoresize :max-lines="3">{{ profile.about }}</v-clamp>
        </p>
      </div>
      <p v-if="!hasSkills">
        <span class="profile_bold">Навыки:</span>
        <span v-for="skill of profile.skills" :key="skill.id">
          <span class="short_profile_skill">{{skill.skill}}</span>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import VClamp from 'vue-clamp';

export default {
  props: {
    profile: Object
  },
  data() {
    return {
      backimg: {
        "background-image": `url(${process.env.baseUrl}${
          this.profile.avatar
            ? this.profile.avatar.formats.thumbnail.url
            : `${process.env.defAvatar}`
        })`
      },
    };
  },
  computed:{
    hasSkills(){
      return this.profile.skills.length === 0
    }
  },
  components: {
    VClamp
  },
};
</script>

<style>
.short_profile {
  margin-top: 30px;
  display: flex;
}
.short_profile_main {
  overflow: hidden;
}
.short_profile--main--head{
  display: flex;
  justify-content: space-between;
}
.short_profile--main--head--social{
  font-weight: bold;
}
.short_profile_photo {
  margin-right: 10px;
  width: 100px;
  height: 100px;
  background-position: center;
  border-radius: 50%;
}
.short_profile_photo img {
  border-radius: 50%;
}
.profile_bold {
  font-weight: bold;
  padding-right: 10px;
}
.short_profile_wrapper {
  background-color: #f5f3f38f;
  padding: 10px;
}
.short_profile_skill {
  margin-right: 10px;
  color: blue;
  background-color: rgb(210, 210, 210);
}
</style>