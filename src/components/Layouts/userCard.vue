<template>
    <div>
        <router-link
            v-for="user in users"
            :key="user.id"
            :to="{ name: 'Users.show', params: { slug: user.slug }}"
            class="bg-gray-50 p-2 rounded-lg flex items-start space-x-4 mb-2">
                <userAvatar
                    :user="user"
                    :classes="'w-8 h-8 rounded-full flex-none'"
                />
            <div class="text-sm ">
                <span class="text-gray-600 block">{{ user.name }}</span>
                <span class="text-gray-400 block">{{ user.email }}</span>
            </div>
        </router-link>
    </div>
</template>

<script>
import userAvatar from '@/components/Layouts/userAvatar'

export default {
    name: 'Layouts.userCard',
    props: {
        users: {
            type: [Object, Array],
            required: true,
            default: []
        }
    },
    components: {
        userAvatar
    }
}
</script>