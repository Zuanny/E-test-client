<script setup>
import { RouterLink, RouterView } from "vue-router";

</script>

<template>
  

    <RouterLink to="/login"></RouterLink>
    <RouterLink to="/"></RouterLink>
    <RouterLink :to="{name:'videoroom', params: {id:':id'}}"></RouterLink>
    <RouterView />
  
</template>

<style>

</style>
