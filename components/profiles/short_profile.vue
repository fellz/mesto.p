<template>
  <div class="row mb-3 p-4 bg-white rounded">
    <aside class="col-sm-2 ">
      <img class="aside__photo rounded-circle" :src="profilePhotoUrl" />
      <div class="text-center font-weight-bold">
        {{profile.city}}
      </div>
    </aside>
    <main class="col-sm-10 ">
      <header class="row">
        <h5 class="col-sm-6">
          <nuxt-link
            :to="'/profiles/'+profile.id"
          >{{ profile.fullname }}</nuxt-link>
        </h5>
        <div v-if="profile.social > 0" class="col-sm-6 text-right font-weight-bold">{{ profile.social }} Спасибо</div>
      </header>
      <section>
        <v-clamp autoresize :max-lines="4">{{ profile.about }}</v-clamp>
      </section>
      <footer v-if="hasSkills">
        <span class="font-weight-bold">Навыки: </span>
        <span class="mr-2 text-white bg-info px-1" v-for="skill of profile.skills" :key="skill.id">
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
  data(){
    return {
      baseUrl: process.env.baseUrl,
      defAvatar: process.env.defAvatar
    }
  },
  computed: {
    hasSkills() {
      return this.profile.skills.length > 0;
    },
    profilePhotoUrl(){
      return (`${this.baseUrl}${this.profile.avatar
            ? this.profile.avatar.formats.thumbnail.url
            : this.defAvatar}`)
    }
  },
  components: {
    VClamp,
  },
};
</script>

<style>
  .aside__photo {
    width: inherit;
  }
</style>