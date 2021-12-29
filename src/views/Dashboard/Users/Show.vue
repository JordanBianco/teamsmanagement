<template>
    <div>
        <div v-if="user">
            <pageHeader 
                title="Utente"
                :routes="[
                    {
                        to: { name: 'Users'},
                        text: 'Gestione utenti'
                    },
                ]"
                :resource="user.name"
            />

            <div class="flex items-start space-x-4">
                <!-- Left General Info -->
                <section class="bg-white mb-4 p-4 rounded-lg shadow-custom w-1/2">
                    <header class="flex items-start space-x-6 mb-8">
                        <userAvatar
                            :user="user"
                            classes="w-32 h-32 rounded-lg flex-none"
                        />
                        <div class="flex flex-col justify-between">
                            <div>
                                <h2 class="text-lg text-gray-700 -mb-1">{{ user.name }}</h2>
                                <span class="text-indigo-400">{{ user.email }}</span>
                                <div v-if="user.is_admin" class="mt-2">
                                    <baseBadge 
                                        text="Admin"
                                        type="base"
                                    />
                                </div>
                            </div>

                            <div class="flex items-center space-x-1 mt-4">
                                <router-link
                                    title="Modifica"
                                    class="bg-gray-200 rounded-lg p-1 text-gray-400 hover:text-gray-500 transition"
                                    :to="{ name: 'Users.edit', params: { slug: user.slug }}">
                                        <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>
                                </router-link>
                                
                                <button
                                    @click="deleteUser(user)"
                                    title="Elimina"
                                    class="bg-gray-200 rounded-lg p-1 text-gray-400 hover:bg-red-200 hover:text-red-500 transition">
                                        <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>
                                </button>
                            </div>
                        </div>
                    </header>

                    <section class="space-y-4">
                        <div>
                            <span class="block text-gray-700 -mb-1">Genere</span>
                            <span v-if="user.gender" class="text-sm text-gray-500">{{ user.gender }}</span>
                            <span v-else class="text-sm text-gray-500">-</span>
                        </div>

                        <div>
                            <span class="block text-gray-700 -mb-1">Data verifica email</span>
                            <span v-if="user.email_verified_at" class="text-sm text-gray-500">{{ $moment(user.email_verified_at).format('DD/MM/YYYY HH:mm') }}</span>
                            <span v-else class="text-sm text-gray-500">Email non verificata</span>
                        </div>

                        <div>
                            <span class="block text-gray-700 -mb-1">Data nascita</span>
                            <span v-if="user.birth_date" class="text-sm text-gray-500">{{ $moment(user.birth_date).format('DD/MM/YYYY') }}</span>
                            <span v-else class="text-sm text-gray-500">-</span>
                        </div>

                        <div>
                            <span class="block text-gray-700 -mb-1">Numero telefono</span>
                            <span v-if="user.phone_number" class="text-sm text-gray-500">{{ user.phone_number }}</span>
                            <span v-else class="text-sm text-gray-500">-</span>
                        </div>

                        <div>
                            <span class="block text-gray-700 -mb-1">Registrato il</span>
                            <span class="text-sm text-gray-500">{{ $moment(user.created_at).format('DD/MM/YYYY') }}</span>
                        </div>
                    </section>
                </section>

                <!-- Right Team info -->
                <section class="w-1/2">
                    <h2 class="text-xl text-gray-700 mb-4">
                        Teams
                    </h2>
                    <div
                        v-for="team in user.teams"
                        :key="team.id"
                        class="bg-white mb-4 p-4 rounded-lg shadow-custom"
                        :class="{ 'flex items-baseline space-x-2' : user.teams }">
                            <div
                                v-if="team.color"
                                class="w-2 h-2 rounded-full"
                                :style="'background:' + team.color">
                            </div>
                            <router-link :to="{ name: 'Teams.show', params: {slug: team.slug }}">
                                {{ team.name }}
                            </router-link>
                    </div>
                </section>
            </div>

        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'
import userAvatar from '@/components/Layouts/userAvatar'
import baseBadge from '@/components/Layouts/baseBadge'

export default {
    name: 'Dashboard.Users.Show',
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        pageHeader,
        userAvatar,
        baseBadge
    },
    mounted() {
        this.getUser()
    },
    computed: {
        user() {
            return this.$store.getters['users/user']
        }
    },
    methods: {
        getUser() {
            this.$store.dispatch('users/getUser', {slug: this.slug})
        },
        deleteUser(user) {
            if (confirm('Eliminare ' + user.name  +'?')) {
                this.$store.dispatch('users/deleteUser', {id: user.id})
            }
        },

    }

}
</script>