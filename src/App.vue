<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
  
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import Header from './components/Header.vue';

  const router = useRouter();
  const isAuthenticated = ref(false);

  

  onMounted(() => {
    console.log("app component mounted")
  })
    
</script>