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
            <div class="w-2/3 flex justify-end items-center space-x-3">
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
                    name="perPage"
                    v-model="filters.perPage"
                    :values="perPageVal"
                />
                <div @click="toggleFiltersMenu()" class="cursor-pointer">
                    <svg class="w-5 h-5 flex-none text-gray-400 hover:text-gray-500 transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M7,6H6V3A1,1,0,0,0,4,3V6H3A1,1,0,0,0,3,8H7A1,1,0,0,0,7,6ZM5,10a1,1,0,0,0-1,1V21a1,1,0,0,0,2,0V11A1,1,0,0,0,5,10Zm7,8a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V19A1,1,0,0,0,12,18Zm9-8H20V3a1,1,0,0,0-2,0v7H17a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Zm-2,4a1,1,0,0,0-1,1v6a1,1,0,0,0,2,0V15A1,1,0,0,0,19,14Zm-5,0H13V3a1,1,0,0,0-2,0V14H10a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Z"/></svg>
                </div>
            </div>
        </section>

        <div v-if="users" class="">
           <table class="w-full bg-white rounded-lg shadow-custom overflow-x-auto">
               <tableHeader :columns="columns" />

                <tr
                    v-for="(user, index) in users.data"
                    :key="index"
                    :class="[ selectedUsers.includes(user) ? 'bg-indigo-50' : 'odd:bg-gray-100 even:bg-gray-50' ]"
                    class="text-gray-500 text-sm">
                        <td class="pl-4 py-2 text-center">
                            <input
                                type="checkbox"
                                name="selectedUsers"
                                class="mt-2"
                                :value="user"
                                v-model="selectedUsers"
                            >
                        </td>
                        <td class="p-2 text-center text-xs text-gray-400 font-semibold">
                            #{{ user.id }}
                        </td>
                        <td class="pl-5 py-2">
                            <userAvatar :user="user" />
                        </td>
                        <td class="py-2 px-4">
                            <router-link :to="{ name: 'Users.show', params: { slug: user.slug }}">
                                {{ user.name }}
                            </router-link>
                        </td>
                        <td class="py-2 px-4 whitespace-nowrap">{{ user.email }}</td>
                        <td class="py-2 px-4 whitespace-nowrap">{{ user.phone_number }}</td>
                        <td class="py-2 px-4 whitespace-nowrap">
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
                        </td>
                        <td class="py-2 px-4 whitespace-nowrap">
                            {{ $moment(user.created_at).format('DD/MM/YYYY, HH:mm') }}
                        </td>
                        <td class="py-2 px-8">
                            <div class="relative flex justify-center">
                                <svg
                                    @click="openMenu(index)"
                                    class="w-5 h-5 text-gray-400 hover:text-gray-500 transition cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                                
                                    <div
                                        v-if="showMenuIndex === index"
                                        class="p-2 rounded-lg shadow bg-white absolute top-5 right-0 flex flex-col z-10">
                                            <router-link
                                                :to="{ name: 'Users.show', params: { slug: user.slug }}"
                                                class="text-gray-400 hover:text-gray-500 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition flex items-center space-x-1">
                                                    <svg class="w-4.5 h-4.5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/></svg>
                                                    <span>Dettagli</span>
                                            </router-link>

                                            <router-link
                                                :to="{ name: 'Users.edit', params: { slug: user.slug }}"
                                                class="text-gray-400 hover:text-gray-500 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition flex items-center space-x-1">
                                                    <svg class="w-4.5 h-4.5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>
                                                    <span>Modifica</span>
                                            </router-link>

                                            <span class="block border-b border-gray-100 my-1"></span>

                                            <button
                                                @click="deleteUser(user, index)"
                                                class="text-gray-400 hover:text-red-500 hover:bg-red-100 px-2 py-1.5 rounded-lg transition flex items-center space-x-1">
                                                    <svg class="w-4.5 h-4.5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>
                                                    <span>Elimina</span>
                                            </button>
                                    </div>
                            </div>
                        </td>
                </tr>
            </table>
        </div>

        <footer class="flex items-center m-4" :class="[ selectedUsers.length ? 'justify-between' : 'justify-end' ]">
            <div v-if="selectedUsers.length" class="flex space-x-4 items-center">
                <p class="text-gray-500 text-sm">{{ selectedUsers.length }} utenti selezionati</p>
                <button
                    @click="deleteUsers()"
                    title="Elimina utenti"
                    class="bg-gray-200 rounded-lg p-0.5 text-gray-400 hover:bg-red-200 hover:text-red-500 transition">
                        <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>
                </button>
            </div>

            <pagination
                class="flex space-x-4 text-gray-500"
                :data="users"
                @pagination-change-page="getUsers">
                    <div slot="prev-nav"  class="bg-indigo-400 p-0.5 rounded-full text-white">
                        <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"/></svg>
                    </div>
                    <div slot="next-nav" class="bg-indigo-400 p-0.5 rounded-full text-white">
                        <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"/></svg>
                    </div>
            </pagination>
        </footer>

        <!-- filters -->
        <aside :class="{ 'translate-x-full' : !filtersMenu }" class="fixed transition duration-200 ease-in-out right-0 bottom-0 h-screen transform w-64 bg-c-light-gray text-gray-200">
            <div class="mt-36 px-4 py-2.5">
                <header class="mb-10">
                    <div class="flex items-center space-x-2 text-gray-500">
                        <div @click="toggleFiltersMenu()" class="hover:text-gray-400 hover:border-gray-400 transition border p-1 rounded-lg border-gray-500 cursor-pointer">
                            <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"/></svg>
                        </div>
                        <span>Filtri</span>
                    </div>
                </header>

                <div class="space-y-5">
                    <div>
                        <label for="team" class="text-gray-500 mb-1 block text-sm">
                                Filtra per team
                        </label>
                        <select
                            v-model="filters.team"
                            name="team"
                            class="text-gray-400 bg-c-light-gray p-2 text-sm rounded-lg focus:outline-none border border-gray-700 focus:border-gray-600 transition w-full">
                            <option value="">Filtra per team</option>
                            <option
                                v-for="(team, i) in teams"
                                :key="i"
                                :value="team.id">
                                    {{ team.name }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label for="role" class="text-gray-500 mb-1 block text-sm">
                                Filtra per ruolo
                        </label>
                        <select
                            v-model="filters.role"
                            name="team"
                            class="text-gray-400 bg-c-light-gray p-2 text-sm rounded-lg focus:outline-none border border-gray-700 focus:border-gray-600 transition w-full">
                            <option value="">Filtra per ruolo</option>
                            <option
                                v-for="(role, i) in roles"
                                :key="i"
                                :value="role.id">
                                    {{ role.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </aside>
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
            filtersMenu: false,
            selectedUsers: [],
            filters: {
                search: '',
                perPage: 10,
                field: 'ID',
                dir: 'asc',
                team: '',
                role: ''
            },
            columns: [
                '',
                'ID',
                'avatar',
                'nome',
                'email',
                'telefono',
                'team',
                'registrato il',
                ''
            ],
            fieldVal: [
                'ID',
                'Nome',
                'Email',
                'Data'
            ],
            dirVal: [
                'asc',
                'desc'
            ],
            perPageVal: [10, 20, 30, 50],
            showMenuIndex: null
        }
    },
    mounted() {
        this.getUsers()
        this.getAllTeams()
        this.getRoles()
    },
    watch: {
        "filters.search": function() {
            this.getUsers()
        },
        "filters.role": function() {
            this.getUsers()
        },
        "filters.team": function() {
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
            return this.$store.getters['users/teams']
        },        
        roles() {
            return this.$store.getters['roles/roles']
        },
    },
    methods: {
        getUsers(page = 1) {
            this.$store.dispatch('users/getUsers', {
                filters: this.filters,
                page: page
            })
        },
        getAllTeams() {
            this.$store.dispatch('users/getAllTeams')
        },
        getRoles() {
            this.$store.dispatch('roles/getRoles')
        },
        deleteUser(user, index) {
            if (confirm('Eliminare ' + user.name  +'?')) {
                this.$store.dispatch('users/deleteUser', {
                    id: user.id,
                    index: index
                })
                this.showMenuIndex = null
            }
        },
        deleteUsers() {
            if (confirm('Eliminare ' + this.selectedUsers.length  +' utenti?')) {
                this.$store.dispatch('users/deleteUsers', {
                    users: this.selectedUsers
                })
                this.selectedUsers = []
            }
        },
        toggleFiltersMenu() {
            this.filtersMenu = ! this.filtersMenu
        },
        openMenu(index) {
            if (this.showMenuIndex == index) {
                this.showMenuIndex = null
            } else {
                this.showMenuIndex = index
            }
        }
    }

}
</script>