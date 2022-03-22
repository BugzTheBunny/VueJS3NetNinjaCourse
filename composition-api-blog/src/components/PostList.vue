<template>
<h1>List of posts:</h1>
  <hr>
  <div class="post-list">
      <div v-for="post in posts" :key="post.id">
          <br>
          <Post :post="post" />
      </div>    
  </div>
</template>

<script>
import { onMounted, onUnmounted, onUpdated } from '@vue/runtime-core'
import Post from '../components/Post.vue'

export default {
    props: ['posts'],
    components: { Post },
    setup(props) {
        onMounted(() => console.log('Mounted!'))
        onUnmounted(() => console.log('Unmounted!'))
        onUpdated(() => console.log('Updated!'))
    }
}
</script>

<style>

</style>