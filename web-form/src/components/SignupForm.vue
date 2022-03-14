<template>
    <form @submit.prevent="handleSubmit">
        <label>Email</label>
        <input type="email" required v-model="email">

        <label>Password</label>
        <input type="password" required v-model="password">

        <label>Role:</label>
        <select v-model="role">
            <option value="developer">Web Developer</option>
            <option value="designer">Web Designer</option>
        </select>

        <div class="terms">
            <input type="checkbox"  v-model="accepted" required>
            <label>Accept terms and conditions</label>
        </div>

        <div class="skills">
            <input type="text" v-model="tempSkill" @keyup="addSkill" >
            <h2>Skills:</h2>
            <div v-for="skill in skills" :key="skill" class="pill" >
                <span @click="removeSkill(skill)">{{skill}}</span>
            </div>
        </div>
        <div class="submit">
            <button>Create an account</button>
        </div>
        <!-- <div>
            <input type="checkbox" value="Yoshi" v-model="names">
            <label>Yoshi</label>
        </div>
        <div>
            <input type="checkbox" value="Mario" v-model="names">
            <label>Mario</label>
        </div> -->
    </form>
    <p>  Email: {{email}},
         Password: {{password}} ,
         Role: {{role}},
         Terms: {{accepted}},
         <!-- Names: {{names}} -->
         </p>
</template>  

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            role:'',
            accepted: false,
            tempSkill:'',
            skills:[]
            // names: []
        }
    },
    methods: {
        addSkill(event){
            if (event.key === "Enter" && this.tempSkill){
                if (this.skills.includes(this.tempSkill)){
                    alert('Already Inside!')
                    this.tempSkill = '';
                }else{
                    this.skills.push(this.tempSkill)
                    this.tempSkill = '';
                }
                
            }
            
        },
        removeSkill(skill){
            this.skills = this.skills.filter((item) => {
                return skill !== item
            })
        },
        handleSubmit(){
            // Handling submit.. password length ETC..
        }
    },
}
</script>

<style>
    form{
     max-width: 420px;
     margin: 30px auto;   
     background: white;
     text-align: left;
     padding: 40px;
     border-radius: 10px;
    }

    label{
        color: #aaa;
        display: inline-block;
        margin: 20px 0 15px;
        font-size: 0.6em;
        letter-spacing: 1px;
        font-weight: bold;
        text-transform: uppercase;
    }

    input ,select{
        display: block;
        padding: 10px 6px;
        width: 100%;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #ddd;
        color: #555;
    }

    input[type="checkbox"] {
        display: inline-block;
        width: 16px;
        margin: 0 10px 0;
        position: relative;
        top: 2px;
    }
    .pill{
        border-radius: 5px;
        background: #aaa;
        text-align: center;
        color: white;
        font-weight: bold;
        letter-spacing: 1px;
        font-size: 1.2rem;
        cursor: pointer;
    }

    button{
        background: #0b6dff;
        border: 0;
        color: white;
        font-size: 25px;
        font-weight: bold;
        border-radius: 25px;
        padding: 10px 20px;
        margin-top: 20px;
    }

    .submit{
        text-align: center;
    }

</style>