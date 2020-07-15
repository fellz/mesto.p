<template>
  <div class="short_profile">
    <div>
      <div class="short_profile_photo" :style="backimg"></div>
    </div>
    <div class="short_profile_main">
      <h5>
        <nuxt-link :to="'/profiles/'+profile.id" class="profile_name">{{ profile.fullname }}</nuxt-link>
      </h5>
      <div class="short_profile_wrapper">
        <p class="text-truncate">
          <span class="profile_bold">О себе:</span>
          {{ profile.about }}
        </p>
        <p>
          <span class="profile_bold">Опыт:</span>
          <v-clamp autoresize :max-lines="3">{{ profile.experience}}</v-clamp>
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
  margin: 30px 100px 0px 100px;
  display: flex;
  width: 90%;
}
.short_profile_main {
  overflow: hidden;
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