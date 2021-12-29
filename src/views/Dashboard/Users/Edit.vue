<template>
    <div>
        <div v-if="user">
            <pageHeader 
                title="Modifica Utente"
                :routes="[
                    {
                        to: { name: 'Users'},
                        text: 'Gestione utenti'
                    },
                    {
                        to: { name: 'Users.show', params: { slug: user.slug }},
                        text: user.name 
                    },
                ]"
                resource="modifica"
            />

            <form @submit.prevent="updateUser" class="bg-white mb-4 p-4 rounded-lg shadow-custom">
                <errorMessage
                    :errors="errors"
                />

                <div class="mb-4">
                    <label class="text-sm text-gray-400">Nome</label>
                    <input
                        name="name"
                        type="text"
                        v-model="user.name"
                        class="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400">
                </div>
                <div class="mb-4">
                    <label class="text-sm text-gray-400">Email</label>
                    <input
                        name="email"
                        type="email"
                        v-model="user.email"
                        class="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400">
                </div>
                <div class="mb-4">
                    <label class="text-sm text-gray-400">Data Nascita</label>
                    <input
                        name="birth_date"
                        type="date"
                        v-model="user.birth_date"
                        class="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400">
                </div>
                <div class="mb-4">
                    <label class="text-sm text-gray-400">Telefono</label>
                    <input
                        name="phone_number"
                        type="text"
                        v-model="user.phone_number"
                        class="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400">
                </div>
                <div class="mb-4">
                    <label class="block text-sm text-gray-400">Team</label>
                    <div
                        v-for="team in user.teams"
                        :key="team.id"
                        :class="{ 'flex items-baseline space-x-2' : user.teams }">
                            <div
                                v-if="team.color"
                                class="w-2 h-2 rounded-full"
                                :style="'background:' + team.color">
                            </div>
                            <span>{{ team.name }}</span>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm text-gray-400">Genere</label>
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-1">
                            <input
                                name="gender"
                                type="radio"
                                value="M"
                                v-model="user.gender"
                                class="mt-0.5">
                            <span class="text-sm text-gray-500">M</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <input
                                name="gender"
                                type="radio"
                                value="F"
                                v-model="user.gender"
                                class="mt-0.5">
                            <span class="text-sm text-gray-500">F</span>
                        </div>
                    </div>
                </div>
                <div v-if="user.email != 'admin@admin.com'" class="mb-8">
                    <label class="block text-sm text-gray-400">Concedere i privilegi di amministratore?</label>
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-1">
                            <input
                                name="is_admin"
                                type="radio"
                                :value="true"
                                v-model="user.is_admin"
                                class="mt-0.5">
                            <span class="text-sm text-gray-500">Sì</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <input
                                name="is_admin"
                                type="radio"
                                :value="false"
                                v-model="user.is_admin"
                                class="mt-0.5">
                            <span class="text-sm text-gray-500">No</span>
                        </div>
                    </div>
                </div>

                <baseButton
                    text="Salva"
                />
            </form>

        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'
import errorMessage from '@/components/Layouts/errorMessage'
import baseButton from '@/components/Layouts/baseButton'

export default {
    name: 'Dashboard.Users.Edit',
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        pageHeader,
        errorMessage,
        baseButton
    },
    mounted() {
        this.getUser()
    },
    watch: {
        "$route": {
            handler() {
                this.clearErrors()
            },
            deep: true,
            immediate: true
        },
    },
    computed: {
        user() {
            return this.$store.getters['users/user']
        },
        errors() {
            return this.$store.getters['users/errors']
        }
    },
    methods: {
        getUser() {
            this.$store.dispatch('users/getUser', {slug: this.slug})
        },
        updateUser() {
            this.$store.dispatch('users/updateUser', {user: this.user})
        },
        clearErrors() {
            this.$store.dispatch('users/clearErrors')            
        }
    }

}
</script>