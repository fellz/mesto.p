<template>
  <div>
    <h4>Участники</h4>
    <input
      type="text"
      v-model="search"
      class="form-control"
      placeholder="Поиск по специализации"
      v-on:keyup.enter="searchProfiles"
    />
    <div class="profiles_sort">
      <span>Сортировать список :</span>
      <label>По рейтингу</label>
      <input type="checkbox" />
    </div>
    <div v-for="profile of profiles" :key="profile.id">
      <short-profile :profile="profile" />
    </div>
    <pagination v-if="search === ''" v-on:new-start-page="setStartPage($event)" :all_items="all_profiles" />
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
      all_profiles: 0,
      resource: "profiles",
      start: 0,
      search: "",
      baseUrl: process.env.baseUrl,
    };
  },
  async fetch() {
    this.getProfiles(this.start);
    this.getAllProfiles();
  },
  components: {
    ShortProfile,
    Pagination,
  },
  methods: {
    async getProfiles(start) {
      const { data } = await axios.get(
        `${this.baseUrl}/profiles?_start=${start}&_limit=5&_sort=created_at:DESC`
      );
      this.profiles = data;
    },
    async getAllProfiles() {
      const { data } = await axios.get(`${this.baseUrl}/profiles`);
      this.all_profiles = data.length;
    },
    setStartPage(new_start_page) {
      this.getProfiles(new_start_page);
    },
    async searchProfiles() {
      if (this.search !== ""){
        const { data } = await axios.get(`${process.env.baseUrl}/profiles?skills.skill=${this.search}`);
        this.profiles = data;
        this.all_profiles = data.length;
      }else{
        this.getProfiles(this.start) 
        this.getAllProfiles()     
      }
      //this.search = "";
    },
  },
};
</script>

<style>
.profiles_sort {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>