<template>
  <div class="sp_card">
    <div class="sp_card_main">
      <h5><nuxt-link :to="'/projects/' + project.id">{{ project.name }}</nuxt-link></h5>
      <p>by
        <nuxt-link
          v-if="project.owner"
          :to="'/profiles/' + project.owner.id"
          >{{ project.owner.fullname }}
        </nuxt-link>
      </p>
      <p class="text-muted">{{  project.created_at | formatDate }}</p>
      <v-clamp autoresize :max-lines="3">{{ project.description }}</v-clamp>
    </div>
    <div class="sp_card_aside">
      <p class="sp_card-aside_status">Статус: <b>{{ project.stage}}</b></p>  
      <div class="sp_card_aside_skills">
        <project-skills :project="project" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VClamp from "vue-clamp";
import ProjectSkills from "~/components/projects/short_project/ProjectSkills.vue";

export default {
  name: "ShortProject",
  props: {
    project: Object
  },
  components: {
    VClamp,
    ProjectSkills
  },
};
</script>

<style>
.sp_card{
  display: flex;
  border: 1px solid #d8d8d8;
  border-radius: 7px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: white;
}
.sp_card_main{
  width: 52%;
}
.sp_card_aside{
  width: 48%;
}
.sp_card_aside_skills{
  padding-left: 10px;
}
.sp_card-aside_status{
  text-align: center;
  background-color: #f1eded;
}
</style>