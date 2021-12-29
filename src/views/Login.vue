<template>
    <div class="bg-c-light-gray flex justify-center items-center">
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
                :loading="loading"
                svg='<svg class="animate-spin w-6 h-6 flex-none text-gray-400" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M6.8042,15A.99956.99956,0,0,0,5.438,14.63379l-1.73242,1a1.00016,1.00016,0,0,0,1,1.73242l1.73242-1A1.00073,1.00073,0,0,0,6.8042,15ZM3.70557,8.36621l1.73242,1a1.00016,1.00016,0,1,0,1-1.73242l-1.73242-1a1.00016,1.00016,0,0,0-1,1.73242ZM6,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H5A1,1,0,0,0,6,12ZM17.1958,9a1.0006,1.0006,0,0,0,1.36621.36621l1.73242-1a1.00016,1.00016,0,1,0-1-1.73242l-1.73242,1A1.00073,1.00073,0,0,0,17.1958,9ZM15,6.8042A1.0006,1.0006,0,0,0,16.36621,6.438l1-1.73242a1.00016,1.00016,0,1,0-1.73242-1l-1,1.73242A1.00073,1.00073,0,0,0,15,6.8042Zm5.29443,8.82959-1.73242-1a1.00016,1.00016,0,1,0-1,1.73242l1.73242,1a1.00016,1.00016,0,0,0,1-1.73242ZM16.36621,17.562a1.00016,1.00016,0,1,0-1.73242,1l1,1.73242a1.00016,1.00016,0,1,0,1.73242-1ZM21,11H19a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Zm-9,7a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V19A1,1,0,0,0,12,18Zm-3-.8042a.99954.99954,0,0,0-1.36621.36621l-1,1.73242a1.00016,1.00016,0,0,0,1.73242,1l1-1.73242A1.00073,1.00073,0,0,0,9,17.1958ZM12,2a1,1,0,0,0-1,1V5a1,1,0,0,0,2,0V3A1,1,0,0,0,12,2Z"/></svg>'
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
    watch: {
    },
    // Aggiungere watch quando avrò pagina password dimenticata
    computed: {
        errors() {
            return this.$store.getters['auth/errors']
        },
        loading() {
            return this.$store.getters['auth/loading']
        },
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