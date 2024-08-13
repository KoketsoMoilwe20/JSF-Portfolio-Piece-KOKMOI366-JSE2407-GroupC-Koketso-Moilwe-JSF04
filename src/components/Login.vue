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
</script>