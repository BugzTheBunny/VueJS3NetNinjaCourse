<template>
    <h1>Jobs List</h1>
    <div v-for="job in jobs" :key="job.id">
        <h5>{{job.title}}
            <router-link :to="{ name: 'JobDetails', params:{id : job.id}}" v-bind:item='job'>
                 Show
            </router-link>
        </h5>
    </div>
</template>

<script>
export default {
    data(){
        return {
            jobs: [
                {id:1,title:'Developer',details:'lorem'},
                {id:2,title:'Designer',details:'lorem'},
                {id:3,title:'Sells',details:'lorem'}
            ]
        }
    }
}
</script>