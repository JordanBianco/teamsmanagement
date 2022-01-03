<template>
    <div>
        <div
            v-for="team in user.teams"
            :key="team.id"
            class="bg-white mb-4 p-4 rounded-lg shadow-custom flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <div
                        v-if="team.color"
                        class="w-2 h-2 rounded-full mt-1"
                        :style="'background:' + team.color">
                    </div>
                    <router-link :to="{ name: 'Teams.show', params: {slug: team.slug }}">
                        {{ team.name }}
                    </router-link>
                </div>
                <div class="flex items-center space-x-2">
                    <baseBadge 
                        :text="role(team)"
                    />
                </div>
        </div>

    </div>
</template>

<script>
import baseBadge from '@/components/Layouts/baseBadge'

export default {
    name: 'Layouts.userTeamInfo',
    components: {
        baseBadge
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    methods: {
        role(team) {
            return this.user.roles.filter(role => {
                return role.pivot.team_id == team.id
            })
        }
    }
}
</script>