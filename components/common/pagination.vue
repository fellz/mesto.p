<template>
  <div class="mt-3">
    <v-chip v-for="p of pages" :key="p.id"
      @click.prevent="setCurrentPage(p)"
      class="ml-1"
      :color="current_page === p ? 'info': 'primary'">
      {{ p }}
    </v-chip>
  </div>
</template>

<script>
// Логика работы компонента
// 1. all_items     Получаем all items из родителя, используем его для создания кнопок.
// 2. current_page  Затем нам нужен current_page, получаем его из клика по кнопке.
// Есть баг с тем, что current_page не передвигается, если в родителе произошли изменения. TOFIX
export default {
  props: {
    allitems: {
      type: Number,
      default: 0,
    },
    perpage: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return { // Initial values
      page: 0,
      current_page: 1,
    };
  },
  computed: {
    pages() {
      // Array of pages [1,2,3]
      const numberOfPages = Math.ceil(this.allitems / this.perpage);
      const pages = this.myrange(1, numberOfPages);
      return pages;
    },
  },
  // watch:{
  //   all_items(){
  //     // костыль, потому что current_page не хочет апдейтиться, когда all_items прилетают.
  //     // Похоже весь темплейт не рендерится заново,
  //     а рендерится только часть или что-то вроде того.
  //     // Во всяком случае created() не срабатывает
  //     this.current_page = 1
  //   }
  // },
  // methods: {
  //   currPage(c,p){
  //     return c === p
  //   },
  methods: {
    setCurrentPage(page) {
      // устанавливаем current_page на ту кнопку, на которую кликнули
      this.current_page = page;
      window.scrollTo(0, 0);
      // распределение обязанностей )
      this.sendStartNumberToParent(page);
    },
    sendStartNumberToParent(page) {
      // вычисляем стартовую цифру, используя номер страницы, на которой находимся.
      // отправляем цифру в родительский компонент
      const start = this.per_page * (page - 1);
      this.$emit('newstart', start);
    },
    // helper function
    myrange(start, end) {
      return [...Array(end - start + 1)].map((_, i) => start + i);
    },
  },
};
</script>

<style>
.pagination--margin{
  margin-right: 10px;
}
.pagination--style {
  margin-top: 20px;
}
</style>
