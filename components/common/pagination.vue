<template>
  <div class="pagination--style">
    <button
      class="btn btn-primary projects_paging_margin"
      v-for="p of pag_pages"
      :key="p.id"
      @click.prevent="setCurrentPage(p)"
      :class="{ 'btn-warning': current_page === p }"
    >{{p}}</button>
  </div>  
</template>

<script>
import axios from "axios";
// Логика работы компонента 
// 1. Получаем all items из родителя, используем его для создания кнопок.
//    Затем нам нужен current_page, получаем его из клика по кнопке.
// Есть баг с тем, что current_page не передвигается, если в родителе произошли изменения. TOFIX
export default {
  props: {
    all_items: Number,
    resource: String
  },
  data(){
    return {
      page: 0,
      per_page: 5,
      current_page: 1
    }
  },
  computed: {
    pag_pages() {
      let pages = this.myrange(1, Math.ceil(this.all_items / this.per_page));
      return pages
    }
  },
  watch:{
    all_items(){
      // костыль, потому что current_page не хочет апдейтиться, когда all_items прилетают.
      // Похоже весь темплейт не рендерится заново, а рендерится только часть или что-то вроде того.
      // Во всяком случае created() не срабатывает
      this.current_page = 1
    }
  },
  methods: {
    currPage(c,p){
      return c === p
    },
    myrange(start, end) {
        return [...Array(end - start + 1)].map((_, i) => start + i);
      },
    async setCurrentPage(page) {
      // устанавливаем current_page на ту кнопку, на которую кликнули
      this.current_page = page;
      // распределение обязанностей )
      this.sendStartNumberToParent(page);
    },
    sendStartNumberToParent(page){
      // вычисляем стартовую цифру, используя номер страницы, на которой находимся. 
      // Ее будем использоваться в запросе.
      const start = this.per_page * (page - 1);
      this.$emit('new-start-number',  start )
    }
  }
}
</script>

<style>
.pagination--style {
  margin-top: 20px;
}
</style>