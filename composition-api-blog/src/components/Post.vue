<template>
    <div class="post">
        <router-link :to="{name: 'PostDetails', params: {id: post.id}}">
            <strong>{{post.title}}</strong>
        </router-link>
        <p>{{snippet}}</p>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
    props: ['post'],
    setup(props) {
        const snippet = computed(() => {
            return props.post.body.substring(0,50) + '....'
        })

        return {
            snippet
        }
    }
}
</script>

<style>

</style>