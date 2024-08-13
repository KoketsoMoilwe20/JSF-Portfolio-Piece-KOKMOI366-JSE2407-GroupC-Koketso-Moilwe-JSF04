<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
  
</template>

<script setup>
  import { onMounted } from 'vue';
  import Header from './components/Header.vue';

  onMounted(() => {
    console.log("app component mounted")
  })
    
</script>