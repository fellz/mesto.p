<template>
  <div>
    <button
      class="btn btn-primary projects_paging_margin"
      v-for="p of pag_pages"
      :key="p.id"
      @click.prevent="setStartPage(p)"
      :class="{ 'btn-warning': current_page === p }"
    >{{p}}</button>
  </div>  
</template>

<script>
import axios from "axios";

export default {
  props: {
    resource: '',
    all_items: {
      type: Number,
      default: 0
    }
  },
  data(){
    return {
      page: 0,
      start_page: 0,
      per_page: 5,
      all_projects: 0,
      current_page: 1
    }
  }, 
  computed: {
    pag_pages() {
      let pages = this.myrange(1, Math.ceil(this.all_items / this.per_page));
      return pages
    }
  },
  methods: {
    myrange(start, end) {
        return [...Array(end - start + 1)].map((_, i) => start + i);
      },
    async setStartPage(page) {
      const start = this.start_page + this.per_page * (page - 1);
      this.current_page = page;
      this.getItems(start, page );
    },
    async getItems(start, page){  
      this.$store.dispatch("getItems", {resource: this.resource, start});
      this.current_page = page;
    }
  }
  
}
</script>

<style>
.projects_paging_margin {
  margin-right: 5px;
}
</style>