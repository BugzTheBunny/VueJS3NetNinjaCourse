import { ref } from 'vue'

const getPost = (id) => {
    const posts = ref(null)
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch(`http://localhost:3000/posts/${id}`)
        if (!data.ok) {
          throw Error('No data available')
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

export default getPost