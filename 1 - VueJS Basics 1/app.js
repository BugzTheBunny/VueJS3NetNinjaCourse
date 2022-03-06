const app = Vue.createApp({
    data() {
        return {
            show: true,
            title: 'The Final Empire',
            author: 'Brandon Sanderson',
            age: 45,
            posX: 0,
            posY: 0,
            booksList: [
                { title: 'book 1', link: 'https://www.google.com/' },
                { title: 'book 2', link: 'https://www.google.com/' },
                { title: 'book 3', link: 'https://www.google.com/' },
                { title: 'book 4', link: 'https://www.google.com/' }
            ]
        }
    },
    methods: {
        changeTitle() {
            this.title = 'New title!'
        },
        changeShow() {
            this.show = !this.show
        },
        handleEvent(event, data) {
            console.log(event, data)
        },
        handleMouseMove(event) {
            this.posX = event.screenX
            this.posY = event.screenY
        },
        getDate() {
            // This will log
            return Date.now()
        }
    },
    computed: {
        getComputedDate() {
            // This wont log
            console.log('Computed', Date.now())
            return Date.now()
        }

    }
})

app.mount('#app')