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
            </div>
        </form>
    </div>
</template>

<script>
    import { ref, reactive } from 'vue';
    import { useRouter } from 'vue-router';

    const username = ref('');
    const password = ref('');
    const passwordVisible = ref(false);
    const loading = ref(false);
    const error = ref('');
    const router = useRouter();

    const togglePasswordVisibility = () => {
        passwordVisible.value = !passwordVisible;
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
                    username:value,
                    password: password.value,
                }),
            });
            
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                const redirectPath = router.currentRoute.value.query.redirect || '/';
                router.push(redirectPath);
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