<template>
  <div>
    <div class="row short_project">
      <main class="col-md-6">
        <h5><nuxt-link :to="'/projects/' + project.id">{{ project.name }}</nuxt-link></h5>
        <!-- -->
        <section>
          <v-clamp autoresize :max-lines="6">{{ project.description }}</v-clamp>
        </section>
      </main>
      <aside class="col-md-6 ">
        <header class="row aside__status">
          <div class="col-sm-6" >Статус: <span class=" font-weight-bold" >{{ project.stage}}</span></div>
          <div class="col-sm-6 text-muted text-right">Создан: {{  project.created_at | formatDate }}</div>
        </header>
        <section>
          <project-skills :project="project" />
        </section>
      </aside>
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
.short_project{
  border: 1px solid #d8d8d8;
  border-radius: 7px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: white;
}
.short_project__main{
  padding-right: 20px;
}
.aside__status{
  background-color: #f1eded;
}
</style>