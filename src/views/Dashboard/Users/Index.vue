<template>
    <div>
        <pageHeader 
            text="Gestione Utenti"
            :to="{ name: 'Dashboard' }"
            route="Aggiungi utente"
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

                <tr v-for="user, i in users.data" :key="i" class="odd:bg-gray-100 even:bg-gray-50 text-gray-500 text-sm">
                    <td class="p-2 text-center text-xs text-gray-400 font-semibold">
                        #{{ user.id }}
                    </td>
                    <td class="p-2 flex justify-center">
                        <userAvatar :user="user" />
                    </td>
                    <td class="py-2 px-4 whitespace-nowrap">
                        <div class="relative">
                            <router-link
                                :to="{ name: 'Users.show', params: { slug: user.slug }}">
                                    {{ user.name }}
                            </router-link>
                            <div
                                class="w-2 h-2 bg-indigo-400 rounded-full absolute -left-5 top-2"
                                v-if="user.is_admin"></div>
                        </div>
                    </td>
                    <td class="py-2 px-4 whitespace-nowrap">{{ user.email }}</td>
                    <td class="py-2 px-4 whitespace-nowrap"></td>
                    <td class="py-2 px-4 whitespace-nowrap">Lorem, ipsum.</td>
                    <td class="py-2 px-4 whitespace-nowrap">{{ $moment(user.created_at).format('DD/MM/YYYY, HH:mm') }}</td>
                    <td class="py-2 px-4">
                        e
                        s
                        d
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
                'ultimo login',
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
    }

}
</script>