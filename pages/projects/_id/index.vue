<template>
 <div class="project">
   <project-main :proj="project" />
 </div>
</template>

<script>
import ProjectMain from "~/components/project/index.vue"
import axios from "axios";

export default {
  components: {
    ProjectMain,
  },
  data (){
    return {
      project: { }
    }
  },
  async fetch(){
    //console.log(this.$route.params.id)
    const { data } =  await axios.get(`${process.env.baseUrl}/projects/${this.$route.params.id}`)
    this.project = data;
  }

}
</script>