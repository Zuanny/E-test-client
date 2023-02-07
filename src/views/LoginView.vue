<template>
    <div class="login container-fluid">
        <div class="row justify-content-md-center">
            <div class="container-login">
                <h1>Cadastro</h1>
                <div>
                    <form @submit.prevent="login" class="form-login">
                        <label for="">
                            <span>Nome de Usuario</span>
                            <input
                             type="text" 
                             name="name"
                             v-model="user.name"
                             >
                        </label>
                        <button  type="submit">Login</button>
                    </form>
                </div>
    
            </div>

        </div>
    </div>

</template>

<script setup>

import http from '../services/http'
import {reactive} from 'vue'
import {useRouter} from 'vue-router'
import {userStore} from '../stores/userStore'
    const router = useRouter();
    const setUser = userStore()
    const user = reactive({
        name: ''
    })

   async function login() {
    try {
        const {data} = await http.post('/users', user)
        setUser.setUser(data)
        router.push({name: 'home'})
        
    } catch (error) {
        console.log(error?.response?.data);
    }       
    }
</script>

<style scoped >
.login{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(65, 65, 65);
    width:100vw;
    height:100vh;
    display:flex;
    align-items: center;
    justify-content: center;
}


.container-login{
    /* margin-top: 18.75rem;
    margin-left: 26.25rem; */
    display: inline-block;
    width: 300px;
    height: 300px;
    background-color: #fff;
    box-shadow: 0 19px 38px black, 0 15px 12px rgba(0,0,0,0.22);
    border-radius: 25px;
    /* widows: 40%; */
    text-align: center;
}
h1{
    color: black;
    padding-top: 10px;
    font-size: 30px;
}
.form{
    padding: 50px 30px;
    -webkit-transition: -webkit-transform 1.2s ease-in-out;
    transition: -webkit-transform  1.2s ease-in-out;
    transition: transform  1.2s ease-in-out;
    transition: transform  1.2s ease-in-out, -webkit-transform  1.2s ease-in-out;
    
}
label{
    color: black;
    display: block;
    width: 260px;
    margin: 25px auto 0;
    text-align: center;

}

/* label span {
    font-size: 14px;
    font-weight: 600;
    
} */

button {
    color: black;
    background-color: rgb(180, 226, 11);
    border-radius: 12px;
    padding: 10px;
    font-size: 16px;
    margin: 25px;
    width: 70%;
    
}

input{
    /* text-align: center; */
    
    color: black;
    background-color: rgb(255, 255, 255);
    border-radius: 12px;
    margin-top: 5px;
    padding: 10px ;
    font-size: 16px;
    /* margin: px; */
    width: 72%;
}
</style>