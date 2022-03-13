<template>
    <div class="backdrop" @click="closeModal">
        <div class="modal">
            <h1>Hello!</h1>
            <p>{{ message }}</p>
            <p v-for="name in names" 
                :key="name" 
                class="name"
                :class="{color_me: theme === 'Liz'}"
                >
                {{name}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'message',
        'names',
        'showNames'
    ],
    methods: {
        closeModal(){
            this.$emit('close')
        }
    },
}
</script>

<style>
.color_me{
    color:red;
}
</style>