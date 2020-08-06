<template>
  <div class="short_profile">
    <aside class="short_profile__aside">
      <div class="aside__photo" :style="backimg"></div>
      <div class="text-center font-weight-bold">
        {{profile.city}}
      </div>
    </aside>
    <main class="short_profile__main">
      <header class="main__header">
        <h5>
          <nuxt-link
            :to="'/profiles/'+profile.id"
            target="_blank"
          >{{ profile.fullname }}</nuxt-link>
        </h5>
        <div v-if="profile.social > 0" class="font-weight-bold">{{ profile.social }} Спасибо</div>
      </header>
      <section>
        <v-clamp autoresize :max-lines="4">{{ profile.about }}</v-clamp>
      </section>
      <footer class="main__skills" v-if="hasSkills">
        <span class="font-weight-bold">Навыки:</span>
        <span class="skills__name" v-for="skill of profile.skills" :key="skill.id">
          {{skill.skill}}
        </span>
      </footer>
    </main>
  </div>
</template>

<script>
import VClamp from "vue-clamp";

export default {
  props: {
    profile: Object,
  },
  data() {
    return {
      backimg: {
        "background-image": `url(${process.env.baseUrl}${
          this.profile.avatar
            ? this.profile.avatar.formats.thumbnail.url
            : `${process.env.defAvatar}`
        })`,
      },
    };
  },
  computed: {
    hasSkills() {
      return this.profile.skills.length > 0;
    },
  },
  components: {
    VClamp,
  },
};
</script>

<style>
.short_profile {
  margin-top: 30px;
  display: flex;
  background-color: white;
  padding: 20px;
  border-radius: 7px;
}
  .short_profile__aside {
    margin-right: 20px;
  }
    .aside__photo {
      width: 100px;
      height: 100px;
      background-position: center;
      border-radius: 50%;
      margin: auto;
    }
  .main__header {
    display: flex;
    justify-content: space-between;
  }
  .skills__name {
    margin-right: 10px;
    color: blue;
    background-color: rgb(210, 210, 210);
  }
</style>