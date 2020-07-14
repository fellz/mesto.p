<template>
 <div class="project">
   <project :project="project" />
 </div>
</template>

<script>
import Project from "~/components/project.vue"
import axios from "axios";

export default {
  components: {
    Project,
  },
  data (){
    return {
      project: {}
    }
  },
  async fetch(){
    //console.log(this.$route.params.id)
    const { data } =  await axios.get(`${process.env.baseUrl}/projects/${this.$route.params.id}`)
      this.project = data;
  }

}
</script>

<style>
  .project {
    width:50%;
    margin: 100px;
  }
</style>