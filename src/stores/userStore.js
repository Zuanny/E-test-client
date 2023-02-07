import {ref} from 'vue';
import {defineStore} from 'pinia';

export const userStore = defineStore('userStore', ()=>{
    const user = ref(JSON.parse(localStorage.getItem('user')));


    function setUser(userValue) {
        localStorage.setItem('user', JSON.stringify(userValue));

        user.value = userValue;
    }

    return {        
        setUser,
        user
    }
})