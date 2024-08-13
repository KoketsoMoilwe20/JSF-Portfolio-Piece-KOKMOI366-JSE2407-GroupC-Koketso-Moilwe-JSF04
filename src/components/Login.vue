<template>
    <div>
        <h2>Login</h2>
        <form>
            <div>
                <label>Username</label>
                <input type="text" id="username" required />
            </div>

            <div>
                <label>Password</label>
                <input

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
            
        }
    }
</script>