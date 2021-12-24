<template>
    <nav class="border-b border-gray-200 sticky top-0 bg-white">
        <div class="flex justify-end py-3.5 px-8">
            <userAvatar
                :user="user"
                :name="user.name"    
            />
        </div>
    </nav>
</template>

<script>
import userAvatar from '@/components/Layouts/userAvatar'

export default {
    name: 'theHeader',
    components: {
        userAvatar
    },
    computed: {
        user() {
            return this.$store.getters['auth/user']
        }
    }
}
</script>