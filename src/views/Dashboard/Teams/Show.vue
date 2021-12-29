<template>
    <div>
        <div v-if="team">
            <pageHeader 
                title="Team"
                :routes="[
                    {
                        to: { name: 'Teams'},
                        text: 'Gestione teams'
                    },
                ]"
                :resource="team.name"
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
                        <div class="text-gray-500 text-sm">
                            {{ team.description }}
                        </div>
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
                    <h3 class="text-base text-gray-700">Progetti</h3>
                </section>

                <!-- Gestione membri gruppo -->
                <section class="bg-white mb-4 p-4 rounded-lg shadow-custom w-1/3">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-base text-gray-700">
                            Membri
                            <span class="text-sm text-gray-400">{{team.users.length}}</span>    
                        </h3> 
                        <router-link
                            :to="{ name: 'Teams.members', params: { slug: team.slug} }"
                            class="text-sm text-gray-400 hover:text-gray-500 transition">
                                Gestisci
                        </router-link>
                    </div>

                    <div v-if="team.users.length > 0">
                        <userCard
                            :users="team.users"
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

        }
    }

}
</script>