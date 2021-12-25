<template>
    <div class="bg-gray-800 flex justify-center items-center">
        <form @submit.prevent="login" class="w-1/3 mx-auto bg-gray-100 shadow-2xl rounded-lg px-6 py-8">
            <h2 class="text-2xl text-gray-700 mb-4">Bentornato</h2>
            <errorMessage
                :errors="errors"
            />
            <baseInput
                v-model="user.email"
                type="email"
                name="email"
                placeholder="inserisci la tua email..."
                label="Email"
                class="mb-4"
            />
            <baseInput
                v-model="user.password"
                type="password"
                name="password"
                placeholder="inserisci la tua password..."
                label="Password"
                class="mb-8"
            />
            <baseButton
                class="w-full"
                text="Login"
            />
            <p class="text-xs text-gray-500 mt-0.5">Password dimenticata?</p>
        </form>
    </div>
</template>

<script>
import baseButton from '@/components/Layouts/baseButton'
import baseInput from '@/components/Layouts/baseInput'
import errorMessage from '@/components/Layouts/errorMessage'

export default {
    name: 'Login',
    components: {
        baseButton,
        baseInput,
        errorMessage
    },
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    // Aggiungere watch quando avrò pagina password dimenticata
    computed: {
        errors() {
            return this.$store.state.auth.errors
        }
    },
    methods: {
        login() {
            if (this.errors.length != 0) {
                this.$store.dispatch('auth/clearErrors')
            }
            this.$store.dispatch('auth/login', { user: this.user })
        }
    }
}
</script>