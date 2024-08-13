<template>
    <div>
        <h2>Login</h2>
        <form>
            <div>
                <label>Username</label>
                <input type="text" id="username" required />
            </div>
        </form>
    </div>
</template>

<script>
    import { ref, reactive } from 'vue';
    import { useRouter } from 'vue-router';

    const passwordVisible = ref(false);

    const togglePasswordVisibility = () => {
        passwordVisible.value = !passwordVisible;
    };
</script>