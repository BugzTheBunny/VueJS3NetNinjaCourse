<template>
  <h1>{{ title }}</h1>
  <div v-if="showNames">
    <Modal message="Sign Up For the Giveaway!"
    :names=names 
    :shownames=showNames
    @close="handleShow"
    />
  </div>
  <button @click="handleShow">Component!</button>
</template>

<script>
import Modal from './components/Modal.vue'

export default {
  name: "App",
  components :{
    Modal,
  },
  data() {
    return {
      title: 'Modal!',
      names: [
        'Slava','Liz'
      ],
      showNames: false
    }
  },
  methods: {
    handleShow(){
      this.showNames = !this.showNames
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
