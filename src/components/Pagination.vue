<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination pagination-sm mb-0 justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="prev">
          <font-awesome-icon :icon="['fa', 'angle-left']" />
        </a>
      </li>
      <li :class="{ active: currentPage == i }" class="page-item" v-for="i in fromToRange" :key="i">
        <a class="page-link" href="#" @click.prevent="toPage(i)" v-if="i >= from && i <= to">{{ i }}</a>
        <span class="page-link" v-if="i < from || i > to"></span>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="next">
          <font-awesome-icon :icon="['fa', 'angle-right']" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: {
      value: {
        type: Array,
        default: () => []
      },
    },
    methods: {
      toPage(page) {
        if (this.$route.query.page != page && (page >= this.from && page <= this.to)) {
          this.$router.push({ query: { ...this.$route.query, page: page } });
        }
      },
      prev() {
        if (this.hasPrev) {
          this.toPage(this.currentPage - 1);
        }
      },
      next() {
        if (this.hasNext) {
          this.toPage(this.currentPage + 1);
        }
      }
    },
    computed: {
      ...mapGetters({
        'range': 'pagination/range',
        'elements': 'pagination/elements',
        'currentPage': 'pagination/currentPage',
      }),
      hasPrev() {
        return this.currentPage > 1;
      },
      hasNext() {
        return this.currentPage < this.lastPage;
      },
      from() {
        return (this.currentPage - this.range) > 1 ? (this.currentPage - this.range) : 1;
      },
      to() {
        return (this.currentPage + this.range) < this.lastPage ? (this.currentPage + this.range) : this.lastPage;
      },
      fromToRange() {
        let array = new Array;
        for (var i = (this.currentPage - this.range); i < (this.currentPage + this.range) + 1; i++) {
          array.push(i);
        }
        return array;
      },
      lastPage() {
        return Math.ceil(this.value.length / this.elements);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-item {
    &.active {
      .page-link {
        border-color: #dee2e6;
      }
    }
    .page-link {
      min-width: 26px;
      height: 31px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: auto !important;
    }
  }
</style>