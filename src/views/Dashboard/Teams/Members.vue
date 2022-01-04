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
                resource="gestisci membri"
            />

            <section class="border-b border-gray-200 mb-8 text-sm flex items-center">
                <div
                    @click="view = 'remove'"
                    :class="[ view == 'remove' ? 'border-b text-gray-600 border-indigo-400' : 'text-gray-400' ]"
                    class="p-4 pl-0 max-w-max cursor-pointer transition">
                        Rimuovi utenti
                </div>
                <div
                    @click="view = 'add'"
                    :class="[ view == 'add' ? 'border-b text-gray-600 border-indigo-400' : 'text-gray-400' ]"
                    class="p-4 max-w-max cursor-pointer transition">
                        Aggiungi utenti
                </div>
            </section>
            <!-- Rimuovi Membri dal gruppo -->
            <div v-if="view == 'remove'">
                <div
                    v-for="user in members"
                    :key="user.id"
                    class="bg-gray-50 p-4 rounded-lg flex items-center justify-between space-x-10 mb-4">
                        <!-- Left / Info -->
                        <div class="flex items-start space-x-4">
                            <userAvatar
                                :user="user"
                                :classes="'w-8 h-8 rounded-full flex-none'"
                            />
                            <div class="text-sm ">
                                <router-link
                                    class="block"
                                    :to="{ name: 'Users.show', params: { slug: user.slug }}">
                                        <span class="text-gray-600">{{ user.name }}</span>
                                </router-link>
                                <span class="text-gray-400 block">{{ user.email }}</span>
                            </div>
                        </div>

                        <!-- Right -->
                        <div
                            @click="removeMember(user, team)"
                            class="bg-gray-200 rounded-lg px-2 text-gray-400 hover:bg-red-100 hover:text-red-500 transition cursor-pointer text-sm">
                                <span>Rimuovi</span>
                        </div>
                </div>
            </div>
            <!-- Aggiungi Membri al gruppo -->
            <div v-if="view == 'add'">
                <div
                    v-for="user in notMembers"
                    :key="user.id"
                    class="bg-gray-50 p-4 rounded-lg flex items-center justify-between space-x-10 mb-4">
                        <div class="flex items-start space-x-4">
                            <userAvatar
                                :user="user"
                                :classes="'w-8 h-8 rounded-full flex-none'"
                            />
                            <div class="text-sm ">
                                <span class="text-gray-600 block">{{ user.name }}</span>
                                <span class="text-gray-400 block">{{ user.email }}</span>
                            </div>
                        </div>

                        <div
                            @click="addMember(user, team)"
                            class="bg-gray-200 rounded-lg px-2 text-gray-400 hover:bg-green-100 hover:text-green-500 transition cursor-pointer text-sm">
                                <span>Aggiungi</span>
                        </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'
import userAvatar from '@/components/Layouts/userAvatar'

export default {
    name: 'Dashboard.Teams.Members',
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        pageHeader,
        userAvatar,
    },
    mounted() {
        this.getTeam()
        this.getMembers()
        this.getNotMembers()
    },
    data() {
        return {
            view: 'remove',
        }
    },
    computed: {
        team() {
            return this.$store.getters['teams/team']
        },
        members() {
            return this.$store.getters['teamUser/members']
        },
        notMembers() {
            return this.$store.getters['teamUser/notMembers']
        },
    },
    methods: {
        getTeam() {
            this.$store.dispatch('teams/getTeam', { slug: this.slug })
        },
        getMembers() {
            this.$store.dispatch('teamUser/getMembers', { slug: this.slug })
        },
        getNotMembers() {
            this.$store.dispatch('teamUser/getNotMembers', { slug: this.slug })
        },
        addMember(user, team) {
            this.$store.dispatch('teamUser/addMember', {
                user: user,
                team: team,
            })
        },
        removeMember(user, team) {
            this.$store.dispatch('teamUser/removeMember', {
                user: user,
                team: team,
            })
        }
    }
}
</script>