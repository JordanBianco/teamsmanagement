<template>
    <div>
        <div v-if="team">
            <pageHeader 
                :title="team.name"
                :routes="[
                    {
                        to: { name: 'Teams'},
                        text: 'Gestione teams'
                    },
                ]"
                resource="overview"
            />

            <!-- Overview -->
            <section class="bg-white mb-4 p-4 rounded-lg shadow-custom">
                <header class="flex items-start justify-between space-x-10 mb-4">
                    <!-- Left / Info -->
                    <div>
                        <div class="flex items-center space-x-2 mb-2">
                            <div
                                v-if="team.color"
                                class="w-2 h-2 rounded-full"
                                :style="'background:' + team.color">
                            </div>
                            <h2 class="text-lg text-gray-700">{{ team.name }}</h2>
                        </div>
                        <div v-html="team.description" class="text-gray-500 text-sm"></div>
                    </div>

                    <!-- Right / Azioni -->
                    <div class="flex items-center space-x-1">                        
                        <router-link
                            title="Modifica"
                            class="bg-gray-200 rounded-lg p-1 text-gray-400 hover:text-gray-500 transition"
                            :to="{ name: 'Teams.edit', params: { slug: team.slug }}">
                                <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>
                        </router-link>
                        
                        <button
                            @click="deleteTeam(team)"
                            title="Elimina"
                            class="bg-gray-200 rounded-lg p-1 text-gray-400 hover:bg-red-200 hover:text-red-500 transition">
                                <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>
                        </button>
                    </div>
                </header>                
            </section>

            <div class="flex space-x-4">
                <!-- Progetti -->
                <section class="bg-white mb-4 p-4 rounded-lg shadow-custom w-2/3">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-base text-gray-700">
                            Progetti
                            <span class="text-sm text-gray-400">{{team.projects.length }}</span>    
                        </h3>
                        <router-link
                            :to="{ name: 'Projects'}"
                            class="text-sm text-gray-400 hover:text-gray-500 transition">
                                Gestisci
                        </router-link>
                    </div>

                    {{ team.projects }}
                </section>

                <!-- Gestione membri gruppo -->
                <section class="bg-white mb-4 p-4 rounded-lg shadow-custom w-1/3">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-base text-gray-700">
                            Membri
                            <span class="text-sm text-gray-400">{{team.users.length}}</span>    
                        </h3>

                        <div class="flex items-center space-x-2">
                            <router-link
                                title="Gestisci Ruoli"
                                class="bg-gray-200 rounded-lg p-1 text-gray-400 hover:text-gray-500 transition"
                                :to="{ name: 'Teams.roles', params: { slug: team.slug }}">
                                    <svg class="w-4 h-4 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71,6.53,20.29,5.12l1.42-1.41a1,1,0,1,0-1.42-1.42L9.75,12.83a5,5,0,1,0,1.42,1.42l4.88-4.89,1.41,1.42a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42L17.46,8l1.42-1.42L20.29,8a1,1,0,0,0,.71.29A1,1,0,0,0,21.71,8,1,1,0,0,0,21.71,6.53ZM7,20a3,3,0,1,1,3-3A3,3,0,0,1,7,20Z"/></svg>
                            </router-link>

                            <router-link
                                title="Gestisci utenti"
                                :to="{ name: 'Teams.members', params: { slug: team.slug} }"
                                class="bg-gray-200 rounded-lg p-1 text-gray-400 hover:text-gray-500 transition">
                                    <svg class="w-4 h-4 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21,10.5H20v-1a1,1,0,0,0-2,0v1H17a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0v-1h1a1,1,0,0,0,0-2Zm-7.7,1.72A4.92,4.92,0,0,0,15,8.5a5,5,0,0,0-10,0,4.92,4.92,0,0,0,1.7,3.72A8,8,0,0,0,2,19.5a1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,13.3,12.22ZM10,11.5a3,3,0,1,1,3-3A3,3,0,0,1,10,11.5Z"/></svg>
                            </router-link>
                        </div>
                    </div>

                    <div v-if="team.users.length > 0">
                        <userCard
                            :users="team.users"
                            :team="team"
                        />
                    </div>
                    <div v-else>
                        <p class="text-gray-400 text-sm">Non ci sono ancora membri.</p>
                    </div>
                </section>
            </div>

        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'
import userCard from '@/components/Layouts/userCard'

export default {
    name: 'Dashboard.Teams.Show',
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        pageHeader,
        userCard
    },
    mounted() {
        this.getTeam()
    },
    computed: {
        team() {
            return this.$store.getters['teams/team']
        }
    },
    methods: {
        getTeam() {
            this.$store.dispatch('teams/getTeam', {slug: this.slug})
        },
        deleteTeam(team) {
            if (confirm('Eliminare ' + team.name  +'?')) {
                this.$store.dispatch('teams/deleteTeam', {id: team.id})                
            }
        }
    }

}
</script>