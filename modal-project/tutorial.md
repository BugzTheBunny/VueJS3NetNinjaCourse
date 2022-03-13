# Using CLI

`vue create modal-project`  
`Babel only`

----
**Structure:**  

- `node_modules:` All of the libraries and dependancies are stored here.
- `public:` Contains the two initial files (Index.html & favicon) for the app, the index.html is the page that is sent initialy to the browser.
- `src`: Contains all of the source code for the application.
    - `main.js` : the JS file that kickstarts the application.
    - `App.vue` : the root component for the application.
- `babel.config.js` : configuration for using babel.
----
_Note_: Each component should containt `<template>` at bare minimum, both `<script>` and `<style>` are optional.

----
`refs` - You can use refs to interact with items inside the HTML, kind of a selector, for example, in the example before us, we see that we can interact with `$refs` inside the method, and we are using it to change the value of the input.
```
<template> 
<div>
  <h1>{{ title }}</h1>
  <input type="text" ref="you_can_use_me" />
  <button @click="handleClick">Click me!</button>
</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      title: "My App!",
    };
  },
  methods:{
    handleClick(){
      console.log(this.$refs.you_can_use_me)
      this.$refs.you_can_use_me.value = 'Added Value!!'
}
  }
};
</script>
```

----
_Note:_ Using global CSS.
The "right" way to use global css is to create a CSS file under `assets`, and import it in `main.js`
```
import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css' <- This line

createApp(App).mount('#app')
```

----
`props` / AKA sending data from parent to child component.

For example, here is how we pass date from `App.vue` to `Modal.vue`

`App.vue` : We send a `prop` called `message` with a string.
```
<template>
  <Modal message="Sign Up For the Giveaway!" />
</template>

<script>
import Modal from './components/Modal.vue'

export default {
  name: "App",
  components :{
    Modal,
  },
};
</script>
```
Using in `Modal.vue`:  
We need to use `props` property 
```
<template>
    <div class="backdrop">
        <div class="modal">
            <h1>Hello!</h1>
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'message'
    ]
}
</script>
```
The problem with this, is that these are Strings, but if we want to pass data, lists, jsons etc.
We can use binding, in the following example we send `names list` to `Modal.vue`
App.vue
```
<template>
  <Modal message="Sign Up For the Giveaway!" :names=names />
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
      names: [
        'Slava','Liz'
      ]
    }
  },
};
</script>
```
`Modal.vue`
```
<template>
    <div class="backdrop">
        <div class="modal">
            <h1>Hello!</h1>
            <p>{{ message }}</p>
            <p v-for="name in names" :key="name" class="name">{{name}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'message',
        'names'
    ]
}
</script>
```
----
`props` for conditions of theming and simillar stuff:  
You can also use props to change the theme of the component, for example, the Name Liz will be green if we do it like so:
`Modal.vue`
```
<template>
    <div class="backdrop">
        <div class="modal">
            <h1>Hello!</h1>
            <p>{{ message }}</p>
            <p 
            v-for="name in names" 
            :key="name" 
            class="name"
            :class="{color_me: theme === 'Liz'}"
            >{{name}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'message',
        'names',
    ]
}
</script>

<style>
.color_me{
    color:red;
}
</style>
```
----
### **Emit Custom Events** : [LINK](https://vuejs.org/guide/components/events.html#emitting-and-listening-to-events)
Basically, this allows us to called functions from whithin a child component.
For example, if we have a function that hides the component, and we want to call it from the child component, we can do it like so:

`Parent (App.vue)`:
we created a listener (`@close="handleShow"`)
```
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
```
Child `Modal.vue`:  
We created a function and emitted there an event on click:
```
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
```
The parent component is listeining to the "close" event that we are emitting from inside the child, then we use it inside the parent.