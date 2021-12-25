<template>
    <div>
        <pageHeader 
            title="Gestione Utenti"
        />
        
        <section class="bg-white mb-4 p-4 flex justify-between rounded-lg shadow-custom">
            <div class="w-1/3">
                <div class="relative">
                    <baseInput
                        name="search"
                        type="search"
                        placeholder="Cerca tra gli utenti..."
                        v-model="filters.search"
                    />
                    <div class="absolute top-2 left-2">
                        <svg class="w-4.5 h-4.5 text-gray-300 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"/></svg>
                    </div>
                </div>
            </div>
            <div class="w-2/3 flex justify-end space-x-3">
                <baseSelectInput
                    name="admin"
                    v-model="filters.admin"
                    :values="adminVal"
                />
                <baseSelectInput
                    name="team"
                    text="Filtra per team"
                    v-model="filters.team"
                    :values="teams"
                />
                <baseSelectInput
                    name="field"
                    v-model="filters.field"
                    :values="fieldVal"
                />
                <baseSelectInput
                    name="dir"
                    v-model="filters.dir"
                    :values="dirVal"
                />
                <baseSelectInput
                    name="search"
                    v-model="filters.perPage"
                    :values="perPageVal"
                />
            </div>
        </section>

        <div v-if="users" class="bg-white rounded-lg shadow-custom">
           <table class="w-full">
               <tableHeader :columns="columns" />

                <tr v-for="(user, index) in users.data" :key="index" class="odd:bg-gray-100 even:bg-gray-50 text-gray-500 text-sm">
                    <td class="p-2 text-center text-xs text-gray-400 font-semibold">
                        #{{ user.id }}
                    </td>
                    <td class="p-2 flex justify-center">
                        <userAvatar :user="user" />
                    </td>
                    <td class="py-2 px-4 whitespace-nowrap">
                        <div class="relative">
                            <router-link :to="{ name: 'Users.show', params: { slug: user.slug }}">
                                {{ user.name }}
                            </router-link>
                            <div
                                class="w-2 h-2 bg-indigo-400 rounded-full absolute -left-5 top-2"
                                v-if="user.is_admin"></div>
                        </div>
                    </td>
                    <td class="py-2 px-4 whitespace-nowrap">{{ user.email }}</td>
                    <td class="py-2 px-4 whitespace-nowrap">Lorem, ipsum.</td>
                    <td class="py-2 px-4 whitespace-nowrap">{{ $moment(user.created_at).format('DD/MM/YYYY, HH:mm') }}</td>
                    <td class="py-2 px-4">
                        <div class="flex items-center space-x-1">
                            <router-link
                                title="Dettagli"
                                class="bg-gray-200 rounded-lg p-0.5 text-gray-400 hover:text-gray-500 transition"
                                :to="{ name: 'Users.show', params: { slug: user.slug }}">
                                    <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/></svg>
                            </router-link>

                            <router-link
                                title="Modifica"
                                class="bg-gray-200 rounded-lg p-0.5 text-gray-400 hover:text-gray-500 transition"
                                :to="{ name: 'Users.edit', params: { slug: user.slug }}">
                                    <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>
                            </router-link>
                            
                            <button
                                @click="deleteUser(user, index)"
                                title="Elimina"
                                class="bg-gray-200 rounded-lg p-0.5 text-gray-400 hover:bg-red-200 hover:text-red-500 transition">
                                    <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>
                            </button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import tableHeader from '@/components/Layouts/tableHeader'
import pageHeader from '@/components/Layouts/pageHeader'
import baseInput from '@/components/Layouts/baseInput'
import baseSelectInput from '@/components/Layouts/baseSelectInput'
import userAvatar from '@/components/Layouts/userAvatar'

export default {
    name: 'Dashboard.Users.Index',
    components: {
        pageHeader,
        tableHeader,
        baseInput,
        baseSelectInput,
        userAvatar
    },
    data() {
        return {
            filters: {
                search: '',
                perPage: 10,
                field: 'ID',
                dir: 'asc',
                team: '',
                admin: 'Tutti'
            },
            columns: [
                'ID',
                'avatar',
                'name',
                'email',
                'team',
                'registrato il',
                'azioni'
            ],
            fieldVal: [
                'ID',
                'Nome',
                'Email',
                'Registrazione'
            ],
            dirVal: ['asc','desc'],
            adminVal: ['Tutti','Admin', 'Utenti'],
            perPageVal: [10, 20, 30, 50]
        }
    },
    mounted() {
        this.getUsers()
    },
    watch: {
        "filters.search": function() {
            this.getUsers()
        },
        "filters.admin": function() {
            this.getUsers()
        },
        "filters.field": function() {
            this.getUsers()
        },
        "filters.dir": function() {
            this.getUsers()
        },
        "filters.perPage": function() {
            this.getUsers()
        },
    },
    computed: {
        users() {
            return this.$store.getters['users/users']
        },
        teams() {
            return []
        }
    },
    methods: {
        getUsers() {
            this.$store.dispatch('users/getUsers', {filters: this.filters})
        },
        deleteUser(user, index) {
            if (confirm('Eliminare ' + user.name  +'?')) {
                this.$store.dispatch('users/deleteUser', {
                    id: user.id,
                    index: index
                    
                })
            }
        },
    }

}
</script>