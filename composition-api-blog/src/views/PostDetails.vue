<template>
  <h1>{{post.title}}</h1>
</template>

<script>
import getPost from '../composables/getPost'

export default {
    props: [
        'id'
    ],
    setup(props) {
        const {post, error, load} = getPost(props.id)

        return {post, error, load}
    }


}
</script>

<style>

</style>