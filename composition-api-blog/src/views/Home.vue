<template>
<div class="home">
  <h1>Home</h1>
  <button @click="showPosts = !showPosts">toggle posts</button>
  <button @click="posts.pop">remove post</button>
  <h1 v-if="error">{{error}}</h1>
  <div v-else>
    <PostList v-if="showPosts" :posts="posts" />
  </div>
</div>
</template>

<script>
import getPosts from '../composables/getPosts'
import PostList from '../components/PostList.vue'
import { ref } from 'vue'

export default {
  name: 'Home',
  components : {
    PostList
  },
  setup() {
    const {posts, error, load} = getPosts()

    load()

    const showPosts = ref(true)

    return {
      posts,
      error,
      showPosts
    }
  },
}
</script>
