<template>
  <div>
    <p class="seller-heading">{{msg}}</p>
    <label for="sort-select">Sort by:</label>
    <select name="bestseller" id="sort-select" @change="sortBy" :value="state.selected">
        <option value="">--Please choose an option--</option>
        <option value="rank">Rank</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="primary_isbn10">ISBN</option>
    </select>
    <ul>
      <li v-for="(book, index) in state.bookList" :key="book.title">
        <div class="book-item" v-if="index < state.presentLength">
          <span class="book-item-num">{{index + 1}}.</span>
          <img class="book-item-image" :src="book.book_image" />
          <div class="book-item-info">
            <p class="book-item-info__title">{{book.title}}</p>
            <p class="book-item-info__author">{{book.contributor}}</p>
            <p class="book-item-info__description">{{book.description}}</p>
            <p class="book-item-primary_isbn10">ISBN: {{book.primary_isbn10}}</p>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="state.loading">loading</div>
    <button class="view-more-btn" @click="viewMore" v-if="state.presentLength < state.lengthOfBook">View More</button>
    <div v-if="!state.loading && state.presentLength >= state.lengthOfBook">... no more books ...</div>
  </div>
</template>

<script>
// import Button from 'ant-design-vue/lib/button';
// import 'ant-design-vue/lib/button/style';
import {
  reactive,
  onMounted,
  watchEffect
} from 'vue';
import { getBookList } from '../api';
import _orderBy from 'lodash/orderBy';
export default {
  name: 'BestSeller',
  props: {
    msg: String,
  },
  setup() {
    const state = reactive({
      bookList: [],
      selected: 'rank',
      presentLength: 5,
      lengthOfBook: 0,
      loading: true
    })
    let totalData = null;
    const fetchData = async () => {
      const res = await  getBookList({list: 'paperback-nonfiction'})
      state.loading = false
      totalData = res.data.results.books
      state.lengthOfBook = res.data.results.normal_list_ends_at;
      state.bookList = totalData;
    }
    onMounted(() => {
      watchEffect(() => {
        fetchData(state.query)
      })
    })
    const sortBy = function (e) {
      state.selected = e.currentTarget.value;
      state.bookList = _orderBy(totalData, [state.selected, 'rank'])
    }
    const viewMore = function () {
      state.presentLength = state.presentLength + 5;
    }
    return {
      state,
      sortBy,
      viewMore
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.book-item {
  display: flex;
  margin: 50px;
}
.book-item-num {
  font-size: 22px;
  font-weight: 700;
  margin-right: 30px;
}
.book-item-image {
    width: 150px;
    object-fit: cover;
    height: 200px;
}
.book-item-info {
  margin-left: 20px;
  text-align: left;
  max-width: 560px;
}
.book-item-info__title {
  font-weight: 700;
}
.book-item-info__description {
  margin-top: 32px;
}
.seller-heading {
  font-size: 28px;
  font-weight: 700;
}
.view-more-btn {
  width: 100px;
  height: 48px;
  line-height: 48px;
  font-size: 15px;
  box-sizing: content-box;
  background: #fff;
  color: #55b4bd;
  border: 1px solid #55b4bd;
  margin-left: -60%;
  margin-bottom: 100px;
}
</style>
