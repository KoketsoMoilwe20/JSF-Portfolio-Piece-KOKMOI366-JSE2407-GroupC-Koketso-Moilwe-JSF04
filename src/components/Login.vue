<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="username">Username</label>
                <input 
                    v-model="username" 
                    type="text" 
                    id="username" 
                    required 
                />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input
                    v-model="password"
                    :type="passwordVisible ? 'text' : 'password'"
                    id="password"
                    required
                 />

                 <button type="button" @click="togglePasswordVisibility">
                    {{ passwordVisible ? 'Hide' : 'Show' }}
                 </button>
            </div>
            <div v-if="loading" class="loading">Authenticating...</div>
            <div v-if="error" class="error">{{ error }}</div>
            <button 
                type="submit" 
                :disabled="!username || !password || loading"
            >
                Login
            </button>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { jwtDecode } from 'jwt-decode';

    const username = ref('');
    const password = ref('');
    const passwordVisible = ref(false);
    const loading = ref(false);
    const error = ref('');
    const router = useRouter();

    const togglePasswordVisibility = () => {
        passwordVisible.value = !passwordVisible.value;
    };

    const handleLogin = async () => {
        if (!username.value || !password.value) {
            error.value = 'Username and password are required';
            return;
        }

        loading.value = true;
        error.value = '';

        try {
            const response = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    username: username.value,
                    password: password.value,
                }),
            });
            
            

            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                //Storing the JWT in local storage
                localStorage.setItem('token', token);

                //Decode the token to get the user ID
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub;

                //Store the user ID in local storage for reference
                localStorage.setItem('userId', userId);

                router.push('/');
            } else {
                error.value = 'Invalid username or password';
            }
        } catch (e) {
            error.value = 'An error occurred while logging in';

        } finally {
            loading.value = false;
        }
    };
</script>

<style scoped>

.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type='text'],
input[type='password'] {
  width: calc(100% - 42px);
  padding: 8px;
  margin-right: 10px;
}

button[type='submit'] {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type='button'] {
  padding: 6px;
  background-color: #ddd;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.loading {
  margin-bottom: 10px;
  color: #4caf50;
}

.error {
  margin-bottom: 10px;
  color: red;
}
</style>