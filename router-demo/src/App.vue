<template>
  <div id="nav">
    <router-link :to="{ name : 'Home'}">Home</router-link> 
    <router-link :to="{ name : 'About'}">About</router-link> 
    <router-link :to="{ name : 'Jobs'}">Jobs</router-link>
  </div>
  <div>
    <button @click="forward">Forward</button>
    <button @click="redirect">Redirect</button>
    <button @click="backward">Backward</button>
  </div>
  <router-view/>
</template>

<script>
export default {
  methods: {
    redirect(){
      this.$router.push({name:'Home'})
    },
    forward(){
      this.$router.go(+1)
    },
    backward(){
      this.$router.go(-1)
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
  padding: 1rem;
  margin: 0rem 0.5rem;
  border-radius: 25px;
  background: #2c3e50;
}

#nav a.router-link-exact-active {
  background: red;
}
</style>
