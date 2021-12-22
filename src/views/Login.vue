<template>
    <div>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email</label>
                <baseInput
                    v-model="user.email"
                    type="email"
                    placeholder="inserisci la tua email..."/>
            </div>
            <div>
                <label for="password">Password</label>
                <baseInput
                    v-model="user.password"
                    type="password"
                    placeholder="inserisci la tua password..." />
            </div>
            <baseButton text="Login" />

            <!-- {{ errors }} -->
        </form>
    </div>
</template>

<script>
import baseButton from '@/components/Layouts/baseButton'
import baseInput from '@/components/Layouts/baseInput'

export default {
    name: 'Login',
    components: {
        baseButton,
        baseInput
    },
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    computed: {
        errorKeys() {
            if (this.$store.state.auth.errors.length != 0) {
                console.log(Object.keys(this.$store.state.auth.errors))
            }
        }
    },
    methods: {
        login() {
            this.$store.dispatch('auth/login', { user: this.user })
        }
    }
}
</script>