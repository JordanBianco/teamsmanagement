<template>
    <div>
        <div v-if="team">
            <div class="bg-white rounded-lg shadow-custom p-4">

                <header class="flex items-center justify-between mb-4">
                    <h2 class="text-gray-600">Membri</h2>

                    <div class="relative text-sm">
                        <svg
                            @click="openMenu"
                            class="w-5 h-5 text-gray-400 hover:text-gray-500 transition cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    
                            <div
                                v-if="showMenu"
                                class="p-1 rounded-lg shadow bg-white absolute top-5 right-0 flex flex-col z-10 whitespace-nowrap">
                                    <router-link
                                        :to="{ name: 'Teams.members', params: { slug: team.slug} }"
                                        class="text-gray-400 hover:text-gray-500 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition flex items-center space-x-2">
                                            <svg class="w-4.5 h-4.5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21,10.5H20v-1a1,1,0,0,0-2,0v1H17a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0v-1h1a1,1,0,0,0,0-2Zm-7.7,1.72A4.92,4.92,0,0,0,15,8.5a5,5,0,0,0-10,0,4.92,4.92,0,0,0,1.7,3.72A8,8,0,0,0,2,19.5a1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,13.3,12.22ZM10,11.5a3,3,0,1,1,3-3A3,3,0,0,1,10,11.5Z"/></svg>
                                            <span>Aggiungi membri</span>
                                    </router-link>
                                    
                                    <router-link
                                        :to="{ name: 'Teams.roles', params: { slug: team.slug }}"
                                        class="text-gray-400 hover:text-gray-500 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition flex items-center space-x-2">
                                            <svg class="w-4.5 h-4.5 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                                            <span>Gestisci ruoli</span>
                                    </router-link>
                            </div>
                    </div>
                </header>

                <div
                    v-for="(user, index) in members"
                    :key="index"
                    :class="[ selectedUsers.includes(user) ? 'bg-indigo-50' : 'odd:bg-gray-100 even:bg-gray-50' ]"
                    class="text-sm flex items-start justify-between rounded-lg p-3 mb-2">
                        <div class="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                name="selectedUsers"
                                class="mt-2"
                                :value="user"
                                v-model="selectedUsers"
                            >
                            <div class="flex items-center space-x-3">
                                <userAvatar
                                    :user="user"
                                    :classes="'w-8 h-8 flex-none rounded-full'"
                                />
                                <div class="flex flex-col items-start">
                                    <span class="text-sm text-gray-600 block">{{ user.name }}</span>
                                    <button
                                        @click="removeMember(user, index)"
                                        class="text-gray-400 hover:text-red-500 transition text-xs">
                                            <span>rimuovi</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <baseBadge
                                :text="role(user)"
                            />
                        </div>
                </div>

                <footer
                    v-if="selectedUsers.length"
                    class="flex items-center mt-4 justify-between">
                        <p class="text-gray-500 text-sm">{{ selectedUsers.length }} membri selezionati</p>
                        <button
                            @click="removeMembers()"
                            class="text-gray-400 hover:text-red-500 transition text-xs">
                                <span>rimuovi</span>
                        </button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import userAvatar from '@/components/Layouts/userAvatar'
import baseBadge from '@/components/Layouts/baseBadge'

export default {
    name: 'Dashboard.Teams.teamMembers',
    props: {
        team: {
            type: Object,
            required: true
        }
    },
    components: {
        userAvatar,
        baseBadge
    },
    mounted() {
        this.getMembers()
    },
    data() {
        return {
            selectedUsers: [],
            showMenu: false
        }
    },
    computed: {
        members() {
            return this.$store.getters['teamMembers/members']
        },
    },
    methods: {
        getMembers() {
            this.$store.dispatch('teamMembers/getMembers', { slug: this.team.slug })
        },
        role(user) {
            return user.roles.filter(role => {
                return role.pivot.team_id == this.team.id
            })
        },
        removeMember(user, index) {
            if (confirm('Rimuovere ' + user.name + 'dal team?')) {
                this.$store.dispatch('teamMembers/removeMember', {
                    user: user,
                    index: index,
                    team: this.team
                })
            }
        },
        removeMembers() {
            if (confirm('Rimuovere ' + this.selectedUsers.length + ' membri dal team?')) {
                this.$store.dispatch('teamMembers/removeMembers', {
                    team: this.team,
                    users: this.selectedUsers
                })

                this.selectedUsers = []
            }
        },
        openMenu() {
            this.showMenu = ! this.showMenu
        }
    }
}
</script>