**Using CDN**

In this part we are using CDN version of Vue, just to understand the basics.

----

**Docs** - https://vuejs.org/guide/quick-start.html#without-build-tools  

**CDN** - `<script src="https://unpkg.com/vue@3"></script>` (Add to html)

----

### **index.html + Vue template:**

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://unpkg.com/vue@3"></script>
    <title>Document</title>
</head>

<body>
    <h1>Hello!</h1>

    <div id="app"></div> <- The item that the Vue is mounted to in app.js

    <script src="app.js"></script>
</body>

</html>
```
### app.js Vue template.
```
const app = Vue.createApp() <- Creating Vue object.

app.mount('#app') <- Mounting to the ID in the HTML
```

----
_Note:_ **Vue Object** 

When we use the CDN in the html, we are getting access to a Vue Object, with which we interact.

We are getting a method called `createApp()`, so that's how we actually initiat the object, and what Vue is actually is.

And we combine this Object to the html by **mounting** it to an html element by using `vue.mount('#id')` by doing so, we are mounting the Vue object to the element in the HTML.

----
_Note:_ `data()` method.

the data method let's us to return data to the html, for example:  
By using the following code, we will be able to use `{{title}}` in the HTML (inside the div with the app)  
**data method:**
```
const app = Vue.createApp({
    data() {
        return {
            title: 'The Final Empire'
        }
    }
})
```
**use in HTML:**
```
<div id="app">
    <h2>{{title}}</h2>
</div>
```
----
## **Directives:**
Directives are basically functionality inside the HTML by using Vue.
```
a directive is some special token in the markup that tells the library to do something to a DOM element. In Vue.js, the concept of directive is drastically simpler than that in Angular. A Vue.js directive can only appear in the form of a prefixed HTML attribute that takes the following format:

v stands for Vue.

Usage in Vue:

v-on:click="doSomething()"
@click="doSomething()" <- this is the same, but shorter syntax.
```
You can write JS inside the directives, but it's better ofcourse to use the code outside,
to be exact, inside `methods`:
```
const app = Vue.createApp({
    data() {
        return {
            title: 'The Final Empire',
            author: 'Brandon Sanderson',
            age: 45
        }
    },
    methods: {
        changeTitle() {
            this.title = 'New title!'
        }
    },
})
```
Now we can use the `changeTitle()` function inside the HTML:
```
<div id="app">
    <h2>{{ title }} - {{ author }}</h2>
    <h5>{{ age }}</h5>
    <button @click="changeTitle">Change Title</button>
</div>
```
----
## **Conditional Rendering:**
We can use `v-if` just as normally as in any other language.
example:
1. add a function to change a boolean variable + add the variable:
```
...
data() {
    return {
        show: true,
        ...
    }
},
methods: {
    ...
    changeShow() {
        this.show = !this.show
    }
...
```
2. hide the age inside a `div` with an `v-if`, and add a button with the function.
```
<div v-if="show">
    <h5>{{ age }}</h5>
</div>
<button @click="changeShow">Show age</button>
```
Now the age will be shows / hidden on click.

Another conditional rendering is `v-show`.  
`v-if` in our example will take out the component from the HTML completely, while `v-show` will use CSS to hide an item, meaning you will still be able to see it in the HTML (f12).

----
## **Mouse Events**
_Note:_ by default, event directives get the event parameter as default (like self in python, and they are the first parameter, if you want to use more variables, you can use `$event`), the event has a tons of parameters inside it for usage.
here are some mouse events, the names are self explaining:  
**Some CSS for the boxes**
```
<style>
    .box {
        padding: 100px 0;
        width: 400px;
        text-align: center;
        background: #ddd;
        margin: 20px;
        display: inline-block;
    }
</style>
```
**html**
```
<div class="box" @mouseover="handleEvent($event,'mouseOver')">mouseover (Mouse Over)</div>
<div class="box" @mouseleave="handleEvent($event,'mouseLeave')">mouseleave (Mouse Leave)</div>
<div class="box" @dblclick="handleEvent($event,'doubleClick')">dblclick (Double Click)</div>
<div class="box" @mousemove="handleMouseMove">Position | X : {{posX}} | Y : {{posY}}</div>

```
**JS**
```
data() {
    return {
        ...
        posX: 0,
        posY: 0
    }
},
methods: {
    ...
    handleEvent(event, data) {
        console.log(event, data)
    },
        handleMouseMove(event) {
            this.posX = event.screenX
            this.posY = event.screenY
        }
},
```
----
**Looping : v-for**  
Nothing to explain really:
**JS**
```
data() {
    return {
        ...
        booksList: [
            { title: 'book 1', link: 'https://www.google.com/' },
            { title: 'book 2', link: 'https://www.google.com/' },
            { title: 'book 3', link: 'https://www.google.com/' },
            { title: 'book 4', link: 'https://www.google.com/' }
        ]
    }
},
```
**HTML**
```
<!-- iteration (v-for) -->
<hr>
<div>
    <h2 v-for="book in booksList">
        <strong>{{book.title}} : </strong>
        <small><a href="{{book.link}}">Buy</a></small>
    </h2>
</div>
```
----
**attributes Binding : v-bind**  
Sometimes we will need to bind data to attributes, for example href.
if you will try to use {{link}} or link in an href, as you see in the example above, you will see that you are not getting the URL, you are getting the plain text, in order to work with it correctly, you need to bind the data to the attribute, like so:  
`<small><a v-bind:href="book.link">Buy</a></small>`
but instead of `v-bind:` Vue gives you a shorter way, just use `:`:
```
<small><a :href="book.link">Buy</a></small>
```
----
**Computed Properties**
Better to read [here](https://vuejs.org/guide/essentials/computed.html#basic-example) 