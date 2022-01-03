<template>
    <div>
        <pageHeader 
            title="Gestione Teams"
        />
        
        <section class="bg-white mb-4 p-4 flex justify-between rounded-lg shadow-custom">
            <div class="w-1/3">
                <div class="relative">
                    <baseInput
                        name="search"
                        type="search"
                        placeholder="Cerca tra i teams..."
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
                    name="search"
                    v-model="filters.perPage"
                    :values="perPageVal"
                />
                <router-link
                    :to="{ name: 'Teams.create' }"
                    title="Nuovo team"
                    class="text-gray-50 bg-indigo-400 hover:bg-indigo-500 rounded-full p-1.5">
                        <svg class="w-4 h-4 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"/></svg>
                </router-link>
            </div>
        </section>

        <div v-if="teams" class="bg-white rounded-lg shadow-custom">
           <table class="w-full">
               <tableHeader :columns="columns" />

                <tr
                    v-for="(team, index) in teams.data"
                    :key="index"
                    :class="[ selectedTeams.includes(team.id) ? 'bg-indigo-50' : 'odd:bg-gray-100 even:bg-gray-50' ]"
                    class="text-gray-500 text-sm">
                        <td class="pl-4 py-2 text-center">
                            <input
                                type="checkbox"
                                name="selectedTeams"
                                class="mt-2"
                                :value="team.id"
                                v-model="selectedTeams"
                            >
                        </td>
                        <td class="px-4 py-2 text-xs text-gray-400 font-semibold">
                            #{{ team.id }}
                        </td>
                        <td class="py-2 px-4">
                            <div class="flex items-baseline space-x-2">
                                <div
                                    v-if="team.color"
                                    class="w-2 h-2 flex-none rounded-full"
                                    :style="'background:' + team.color">
                                </div>
                                <router-link
                                    class="whitespace-nowrap"
                                    :to="{ name: 'Teams.show', params: { slug: team.slug }}">
                                        {{ team.name }}
                                </router-link>
                            </div>
                        </td>
                        <td class="py-2 px-4">
                            <div v-html="truncate(team.description)"></div>
                        </td>
                        <td class="py-2 px-4">
                            {{ team.users_count }}
                        </td>
                        <td class="py-2 px-4 whitespace-nowrap">{{ $moment(team.created_at).format('DD/MM/YYYY, HH:mm') }}</td>
                        <td class="py-2 px-4">
                            <div class="flex items-center space-x-1">
                                <router-link
                                    title="Dettagli"
                                    :to="{ name: 'Teams.show', params: { slug: team.slug }}"
                                    class="bg-gray-200 rounded-lg p-0.5 text-gray-400 hover:text-gray-500 transition">
                                        <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/></svg>
                                </router-link>

                                <router-link
                                    title="Modifica"
                                    :to="{ name: 'Teams.edit', params: { slug: team.slug }}"
                                    class="bg-gray-200 rounded-lg p-0.5 text-gray-400 hover:text-gray-500 transition">
                                        <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>
                                </router-link>
                                
                                <button
                                    @click="deleteTeam(team, index)"
                                    title="Elimina"
                                    class="bg-gray-200 rounded-lg p-0.5 text-gray-400 hover:bg-red-200 hover:text-red-500 transition">
                                        <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>
                                </button>
                            </div>
                        </td>
                </tr>
            </table>
        </div>

        <footer class="flex items-center m-4" :class="[ selectedTeams.length ? 'justify-between' : 'justify-end' ]">
            <div v-if="selectedTeams.length" class="flex space-x-4 items-center">
                <p class="text-gray-500 text-sm">{{ selectedTeams.length }} teams selezionati</p>
                <button
                    @click="deleteTeams(selectedTeams)"
                    title="Elimina teams"
                    class="bg-gray-200 rounded-lg p-0.5 text-gray-400 hover:bg-red-200 hover:text-red-500 transition">
                        <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>
                </button>
            </div>

            <pagination
                class="flex space-x-4 text-gray-500"
                :data="teams"
                @pagination-change-page="getTeams">
                    <div slot="prev-nav"  class="bg-indigo-400 p-0.5 rounded-full text-white">
                        <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"/></svg>
                    </div>
                    <div slot="next-nav" class="bg-indigo-400 p-0.5 rounded-full text-white">
                        <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"/></svg>
                    </div>
            </pagination>
        </footer>
    </div>
</template>

<script>
import tableHeader from '@/components/Layouts/tableHeader'
import pageHeader from '@/components/Layouts/pageHeader'
import baseInput from '@/components/Layouts/baseInput'
import baseSelectInput from '@/components/Layouts/baseSelectInput'

export default {
    name: 'Dashboard.Teams.Index',
    components: {
        tableHeader,
        pageHeader,
        baseInput,
        baseSelectInput,
    },
    data() {
        return {
            selectedTeams: [],
            filters: {
                search: '',
                perPage: 10,
                field: 'ID',
                dir: 'asc',
            },
            columns: [
                '',
                'ID',
                'nome',
                'descrizione',
                'membri',
                'creato il',
                'azioni'
            ],
            fieldVal: [
                'ID',
                'Nome',
                'Membri',
                'Data'
            ],
            dirVal: ['asc','desc'],
            perPageVal: [10, 20, 30]
        }
    },
    mounted() {
        this.getTeams()
    },
    watch: {
        "filters.search": function() {
            this.getTeams()
        },
        "filters.field": function() {
            this.getTeams()
        },
        "filters.dir": function() {
            this.getTeams()
        },
        "filters.perPage": function() {
            this.getTeams()
        },
        success() {
            if (this.success) {
                this.$store.dispatch('teams/setSuccessStatus', {value: false})
                this.getTeams()
            }
        }
    },
    computed: {
        teams() {
            return this.$store.getters['teams/teams']
        },
        success() {
            return this.$store.getters['teams/success']
        },
    },
    methods: {
        getTeams(page = 1) {
            this.$store.dispatch('teams/getTeams', {
                filters: this.filters,
                page: page
            })
        },
        deleteTeam(team, index) {
            if (confirm('Eliminare ' + team.name  +'?')) {
                this.$store.dispatch('teams/deleteTeam', {
                    id: team.id,
                    index: index
                })
            }
        },
        deleteTeams(teams) {
            if (confirm('Eliminare ' + teams.length  +' teams?')) {
                this.$store.dispatch('teams/deleteTeams', {teams})
                this.selectedTeams = []
            }
        },
        truncate(text) {
            if (text && text.length > 100) {
                return text.substring(0, 100) + '...'
            } else {
                return text
            }
        }
    },
}
</script>