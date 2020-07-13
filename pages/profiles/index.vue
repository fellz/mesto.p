<template>
  <div>
    <h4>Участники</h4>
    <input type="text" v-model="search" class="form-control" placeholder="Поиск по специализации" v-on:keyup.enter="searchProfiles" />
    <hr>
    <div v-for="profile of profiles" :key="profile.id">
      <short-profile :profile="profile" />
    </div>
     <pagination :all_items="all_items" :resource="resource"></pagination>
  </div>
</template>

<script>
import ShortProfile from "~/components/short_profile.vue";
import axios from "axios";
import Pagination from "~/components/pagination.vue";

export default {
  data() {
    return {
      profiles: [],
      all_items: 0,
      resource: "profiles",
      start: 0,
      search: ""
    };
  },
  methods: {
    async searchProfiles(){
      const { data } = await axios.get(`http://localhost:1337/profiles?skills.skill=${this.search}`)  
      this.profiles = data
      this.all_items = data.length
      if ( this.search === ''){
        this.$store.dispatch("getItems", {resource: this.resource, start: this.start} );
      }
      this.search = ""
      
    }
  },
  middleware: ["auth"],
  created() {
    this.$store.dispatch("getItems", {resource: this.resource, start: this.start} );
    // Get number of all projects - for pagination
    axios.get("http://localhost:1337/profiles").then(resp => {
      this.all_items = resp.data.length;
    });
  },
  watch: {
    "$store.state.profiles": function() {
      const profiles = this.$store.state.profiles;
      this.profiles = profiles;
      this.all_items = profiles.length;
    }
  },
  components: {
    ShortProfile,
    Pagination
  },
}
</script>
