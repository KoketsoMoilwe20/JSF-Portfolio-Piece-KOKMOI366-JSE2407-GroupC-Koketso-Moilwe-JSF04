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

  const checkAuth = () => {
    isAuthenticated.value = !!localStorage.getItem('token');
    if (!isAuthenticated.value && router.currentRoute.value.meta.requiresAuth) {
      router.push('/login');
    }
  };

  onMounted(() => {
    checkAuth();
    console.log("app component mounted")
  })

  watch(() => router.currentRoute.value, checkAuth);
    
</script>