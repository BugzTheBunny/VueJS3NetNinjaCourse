# Working with composition API

Option API looks like this:
```
export default {
  data() {
    return {
      name: 'John',
    };
  },
  methods: {
    doIt() {
      console.log(`Hello ${this.name}`);
    },
  },
  mounted() {
    this.doIt();
  },
};
```

Composition API looks like this:
```
export default {
  setup() {
    const name = ref('John');
    
    const doIt = () => console.log(`Hello ${name.value}`);
    
    onMounted(() => {
      doIt();
    });
    
    return { name };
  },
};
```
----
**_Note_:** The composition `setup()` function, looks is started before everything, meaning, it even runs before `beforeCreate`.  
**_Note_:** By default the variables inside `setup()` can be used in the `template`, BUT they are **not reactive**,, you need to wrap then with `ref` to make them reactive. 

Example in the app:
In this code, the variables will not be reactive, meaning, they will change, but you will not see the difference in the DOM.
```
<template>
<h1>Home</h1>
<p>My name is {{name}} and my age is {{age}}</p>
<button @click="handleClick">click me</button>
</template>

<script>
export default {
  name: 'Home',
  setup() {

    let name = 'mario'
    let age = 30

    const handleClick = () => {
      name = 'luigi'
    }

    return {
      name, age,handleClick
    }
  },
}
</script>
```
But if we do this like this, it will work:
```
<template>
<h1>Home</h1>
<p>My name is {{name}} and my age is {{age}}</p>
<button @click="handleClick">click me</button>
</template>

<script>
import {ref} from 'vue'

export default {
  name: 'Home',
  setup() {

    const name = ref('mario')
    const age = ref(30)

    const handleClick = () => {
      name.value = 'luigi'
      age.value = 40
    }

    return {
      name, age,handleClick
    }
  },
}
</script>
```
Also, once you made the variable reactive, you can use things normally, for example this will work:
(Adding a new button that will add 1 to age.)
```
<template>
<h1>Home</h1>
<p>My name is {{name}} and my age is {{age}}</p>
<button @click="handleClick">click me</button>
<button @click="age++">add to age</button>
</template>
```
Besides `ref` you can also use `reactive`, the problem with it, is that it does not support primitive types.
meaning if you do this:
```
const color = reactive('green')

const handleClick = () => {
    name.value = 'luigi'
    age.value = 40
    color = 'red'
}
```
The color will not change, and you don't really have a way to change it, but it does work it objects for example.
also, `reactive` allows you to work with objects, without the use of `.value`, you will be able just to do this:
```
<template>
<h1>Home</h1>
<p>My name is {{name}} and my age is {{age}}</p>
<button @click="handleClick">click me</button>
<button @click="age++">add to age</button>
<p>Color : {{ obj.color }}</p>
</template>

<script>
import {reactive, ref} from 'vue'

export default {
  name: 'Home',
  setup() {

    const name = ref('mario')
    const age = ref(30)
    const obj = reactive({color:'green'})

    const handleClick = () => {
      name.value = 'luigi'
      age.value = 40
      obj.color = 'red'
    }

    return {
      name, age, handleClick ,obj
    }
  },
}
</script>
```
In the example above the color will change.

----
Composition with Computed (With a filter!)
In the code below, we created a cumputed function, and 2 variables.
the first one is `search` and the second is a list of `names`, both of them are `ref`s.
The computed function takes the input which is in the search field, and returns a list of filtered names by the input.
```
<template>
<div class="home">
  <h1>Home</h1>
  <input type="text" v-model="search">
  <p>search term - {{search}}</p>
  <div v-for="name in matchingNames" :key="name">
    {{name}}
  </div>
</div>
</template>

<script>
import {computed, ref} from 'vue'

export default {
  name: 'Home',
  setup() {
    const search = ref('')
    const names = ref(['Mario','Luigi','Yoshi','Bowser', 'Koopa', 'Peach', 'Toad'])

    const matchingNames = computed(() => {
      return names.value.filter((name) => name.includes(search.value))
    })

    return {
      names, search, matchingNames
    }
  },
}
</script>
```
But there might be a problem with this is that we don't always to to use this kind of search, for example we want to stop it on submit for example, or if we want to do something if the `search` is equal to something, and to make it work again only after the request of the submit is completed so we can use `watch()` and `watchEffect()`.

[A GREAT EXPLAIN ABOUT COMPUTED VS WATCHERS](https://michaelnthiessen.com/difference-between-computed-property-and-watcher/)

----
Sending some Posts objects from Parent -> Children half of the video.

----
Fetching data in `setup()`.

We use json-server and a temp db:  

`npm install -g json-server`  
creating a `data` folder with `db.json` inside with some posts.  
`json-server --watch /data/db.json`

Using `fetch` to get data from the "database".

```
<script>
import {computed, ref, watch} from 'vue'
import PostList from '../components/PostList.vue'
export default {
  name: 'Home',
  components : {
    PostList
  },
  setup() {
    const posts = ref([])
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch('http://localhost:3000/posts')
        if (!data.ok) {
          throw Error('No data vailable')
        }else{
          posts.value = await data.json()
        }
      }
      catch(e){
        error.value = e.message
        console.log(error.value)
      }

    }
    load()
    
    const showPosts = ref(true)

    return {
      posts,
      showPosts,
      error
    }
  },
}
</script>
```
----
Using `Composables` (reusable functions)  
We create `composables/getPosts.js` and take the code that we created and move it there with some minor changes.  
```
import { ref } from 'vue'

const getPosts = () => {
    const posts = ref([])
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch('http://localhost:3000/posts')
        if (!data.ok) {
          throw Error('No data vailable')
        }else{
          posts.value = await data.json()
        }
      }
      catch(e){
        error.value = e.message
        console.log(error.value)
      }
    }
    
    return { posts, error, load }
}

export default getPosts
```

`Home.vue` after removal and usage of `getPosts.js`:
```
...
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
 
```