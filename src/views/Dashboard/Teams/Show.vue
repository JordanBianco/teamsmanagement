<template>
    <div>
        <div v-if="team">
            <div class="flex items-center justify-between">
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

                <div class="relative flex justify-center text-sm">
                    <svg
                        @click="openMenu"
                        class="w-5 h-5 text-gray-400 hover:text-gray-500 transition cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    
                        <div
                            v-if="showMenu"
                            class="p-1 rounded-lg shadow bg-white absolute top-5 right-0 flex flex-col z-10 whitespace-nowrap">
                                <router-link
                                    :to="{ name: 'Projects.create', params: { slug: team.slug }}"
                                    class="text-gray-400 hover:text-gray-500 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition flex items-center space-x-2">
                                        <svg class="w-4.5 h-4.5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"/></svg>
                                        <span>Nuovo progetto</span>
                                </router-link>
                                
                                <router-link
                                    :to="{ name: 'Teams.edit', params: { slug: team.slug }}"
                                    class="text-gray-400 hover:text-gray-500 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition flex items-center space-x-2">
                                        <svg class="w-4.5 h-4.5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>
                                        <span>Modifica team</span>
                                </router-link>

                                <span class="block border-b border-gray-100 my-1"></span>

                                <button
                                    @click="deleteTeam(team)"
                                    class="text-gray-400 hover:text-red-500 hover:bg-red-100 px-2 py-1.5 rounded-lg transition flex items-center space-x-2">
                                        <svg class="w-4.5 h-4.5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>
                                        <span>Elimina team</span>
                                </button>
                        </div>
                </div>
            </div>

            <div class="flex space-x-4">
                <div class="w-2/3">
                    <teamProjects
                        :team="team"
                    />
                </div>

                <div class="w-1/3">
                    <teamMembers
                        :team="team"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'
import userCard from '@/components/Layouts/userCard'
import teamMembers from '@/components/Teams/teamMembers'
import teamProjects from '@/components/Teams/teamProjects'

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
        userCard,
        teamMembers,
        teamProjects
    },
    mounted() {
        this.getTeam()
    },
    data() {
        return {
            showMenu: false
        }
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
        },
        openMenu() {
            this.showMenu = ! this.showMenu
        }
    }

}
</script>