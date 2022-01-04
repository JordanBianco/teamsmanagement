<template>
    <div>
        <div v-if="team">
            <pageHeader 
                :title="'Ruoli ' + team.name"
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
                resource="gestione ruoli"
            />

            <div
                v-for="user in team.users"
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
                    <div class="flex items-center space-x-2">
                        <baseBadge
                            :text="role(user)"
                        />

                        <changeRole
                            :user="user"
                            :team="team"
                        />
                    </div>
            </div>

        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'
import userAvatar from '@/components/Layouts/userAvatar'
import changeRole from '@/components/changeRole'
import baseBadge from '@/components/Layouts/baseBadge'

export default {
    name: 'Dashboard.Teams.Roles',
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        pageHeader,
        userAvatar,
        baseBadge,
        changeRole
    },
    mounted() {
        this.getTeam()
    },
    computed: {
        team() {
            return this.$store.getters['teams/team']
        },
    },
    methods: {
        getTeam() {
            this.$store.dispatch('teams/getTeam', { slug: this.slug })
        },
        role(user) {
            return user.roles.filter(role => {
                return role.pivot.team_id == this.team.id
            })
        }
    }
}
</script>