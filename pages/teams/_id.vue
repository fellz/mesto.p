<template>
  <div>
    <div class="team_wrapper">
       <h4>{{team.name}}</h4>
       <hr/>
      <div class="team_main">
        <div class="team_main_first">{{team.about}}</div>
        <div>
          <div v-for="p of team.participants" :key="p.id">
            <nuxt-link :to="'/profiles/'+p.id">{{p.fullname}}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data(){
    return {
      team: {}
    }
  }, 
  computed:{
    url(){
      return process.env.baseUrl
    }
  },
  async fetch(){
    const id = this.$route.path.split('/').slice(-1)[0]
    const { data } = await axios.get(`${this.url}/teams/${id}`)
    this.team = data
  }
    
}
</script>

<style>
.team_wrapper{
  border: 1px solid black;
  padding: 10px;
  border-radius: 7px;
}
.team_main{
   display: flex;
   justify-content: space-between;
}
.team_main_first{
  margin-right: 10px;
  width: 61%;
}
</style>