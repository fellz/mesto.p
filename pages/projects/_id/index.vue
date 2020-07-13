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
    const { data } =  await axios.get(`http://localhost:1337/projects/${this.$route.params.id}`)
      this.project = data;
      console.log(data)
  }

}
</script>

<style>
  .project {
    width:50%;
    margin: 100px;
  }
</style>