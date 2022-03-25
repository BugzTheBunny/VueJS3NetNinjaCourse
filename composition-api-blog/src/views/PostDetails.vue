<template>
<div v-if="error">
    <p>{{error}}</p>
</div>
<div v-if="post" class="post">
    <h1>{{post.title}}</h1>
    <h5>{{post.body}}</h5>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import getPost from '../composables/getPost'

export default {
    props: [
        'id'
    ],
    setup(props) {
        const {post, error, load} = getPost(props.id)
        
        load()

        return {
            post,
            error,
            load}
    }
}
</script>

<style>

</style>