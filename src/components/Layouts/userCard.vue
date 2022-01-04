<template>
    <div>
        <router-link
            v-for="user in users"
            :key="user.id"
            :to="{ name: 'Users.show', params: { slug: user.slug }}"
            class="bg-gray-50 p-2 rounded-lg flex items-start space-x-4 mb-2">
                <userAvatar
                    :user="user"
                    :classes="'w-8 h-8 rounded-full'"
                />
                <div class="text-sm w-full">
                    <div class="flex justify-between items-center space-x-2">
                        <span class="text-gray-600 block">{{ user.name }}</span>
                        <baseBadge
                            :text="role(user)"
                        />
                    </div>
                    <span class="text-gray-400 block mb-1">{{ user.email }}</span>
                </div>
        </router-link>
    </div>
</template>

<script>
import userAvatar from '@/components/Layouts/userAvatar'
import baseBadge from '@/components/Layouts/baseBadge'

export default {
    name: 'Layouts.userCard',
    props: {
        users: {
            type: [Object, Array],
            required: true,
        },
        team: {
            type: Object,
            required: true
        }
    },
    components: {
        userAvatar,
        baseBadge
    },
    methods: {
        role(user) {
            return user.roles.filter(role => {
                return role.pivot.team_id == this.team.id
            })
        }
    }
}
</script>