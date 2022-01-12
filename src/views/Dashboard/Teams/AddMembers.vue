<template>
    <div>
        <div v-if="team">
            <pageHeader 
                :title="'Membri ' + team.name"
                :routes="[
                    {
                        to: { name: 'Teams'},
                        text: 'Gestione teams'
                    },
                    {
                        to: { name: 'Teams.show', params: { slug: team.slug}},
                        text: team.name
                    },
                ]"
                resource="aggiungi membri"
            />

            <section class="bg-white mb-4 p-4 rounded-lg shadow-custom">
                <div class="lg:w-1/2 xl:w-1/3">
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
            </section>

            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <div
                    v-for="(user, index) in notMembers"
                    :key="user.id"
                    class="bg-gray-50 p-4 rounded-lg flex flex-col space-y-2 items-start md:flex-row md:space-y-0 md:justify-between">
                        <div class="flex items-start space-x-3">
                            <userAvatar
                                :user="user"
                            />
                            <div class="text-sm ">
                                <span class="text-gray-600 block">{{ user.name }}</span>
                                <span class="text-gray-400 block">{{ user.email }}</span>
                            </div>
                        </div>

                        <button
                            @click="addMember(user, index)"
                            class="border border-gray-300 rounded-lg px-2 py-1 text-gray-300 hover:border-indigo-400 hover:text-indigo-400 transition text-xs w-full md:max-w-max">
                                Aggiungi
                        </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'
import userAvatar from '@/components/Layouts/userAvatar'
import baseInput from '@/components/Layouts/baseInput'

export default {
    name: 'Dashboard.Teams.AddMembers',
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        pageHeader,
        userAvatar,
        baseInput
    },
    mounted() {
        this.getTeam()
        this.getNotMembers()
    },
    watch: {
        "filters.search": function() {
            this.getNotMembers()
        },
    },
    data() {
        return {
            filters: {
                search: ''
            }
        }
    },
    computed: {
        team() {
            return this.$store.getters['teams/team']
        },
        notMembers() {
            return this.$store.getters['teamMembers/notMembers']
        },
    },
    methods: {
        getTeam() {
            this.$store.dispatch('teams/getTeam', { slug: this.slug })
        },
        getNotMembers() {
            this.$store.dispatch('teamMembers/getNotMembers', { 
                slug: this.slug,
                filters: this.filters
            })
        },
        addMember(user, index) {
            this.$store.dispatch('teamMembers/addMember', {
                user: user,
                index: index,
                team: this.team
            })
        },
    }
}
</script>