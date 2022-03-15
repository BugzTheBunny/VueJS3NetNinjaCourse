_Note_:
1. The routed view is displayed inside `<router-view/>` element.
2. `router-link` are not normal links, they are links that "send a request" only to the router, inside the router.
3. If you will use `a` instead of `router-link` you will be sending a new request outside of Vue.
4. `router-link`s have a built-in functionalities, one of them, is that they classes automatically:
```
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
```
So you can design this as you wish for indication on where the user is currently.
5. Don't use `<router-link to="/about">About</router-link>`, it's better to use `<router-link :to="{ name: 'About' }">About</router-link>`, this way, on refactor you will not need to change the route eveywhere, because the name is binded to the names in `router>index.js`

----
Sending data from one view to another with `router-link`:
List of jobs component, which contains redirects by link id:
```
<template>
    <h1>Jobs List</h1>
    <div v-for="job in jobs" :key="job.id">
        <h5>{{job.title}}
            <router-link :to="{ name: 'JobDetails', params:{id : job.id}}">
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
```
JobDetails component, which should get the id (using props.)
```
<template>
    <h1>Job Details</h1>
    <h2>{{id}}</h2>
</template>

<script>
export default {
    props: ['id']
}
</script>
```

A route item `router>index.js`
```
{
    path: '/jobs/:id',
    name: 'JobDetails',
    component: JobDetails,
    props:true
},
```

**_Note_** : You can also get the parameters in another way instead of props, but as you can see, it's much more code.
```
<script>
export default {
    data() {
        return {
            id: this.$route.params.id
        }
    },
}
</script>
```
----
## **Redirects & 404.**
- **redirect:**
Imagine that you had an old path `/all-jobs` which is now changed to `/jobs`, and you want to redirect automatically.  
all you have to do is this, add this to the paths, and you're done.
```
{
    path: '/all-jobs',
    redirect: '/jobs'
}
```
- **404:**
You can create a component which will be the "NotFound" component, for example:
```
<template>
  <h2>404 - Not Found :(</h2>
</template>
```
Then just add this to the router, this is using Regex inside a function as you see, which routes anything that is not found before.
```
{
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
}
```
----
## Router History

One of the ways to use the router in Vue, is by using the history mode, which basically makes the routes as a list, or layers, and you can manipulate where the current route is, or to redirect into another route, for example, in the following code, you can see 3 buttons, and each of them has a function:
```
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
```