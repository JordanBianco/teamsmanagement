<template>
    <div v-if="user" class="bg-indigo-50">
        <theHeader />

        <theSidebar />

        <transition name="fade">
            <router-view
                class="w-full pt-6 pb-20 p-4 md:pl-64 md:pr-8 z-20"
                :key="$route.path">
            </router-view>
        </transition>
    </div>
</template>

<script>
import theHeader from '@/components/Layouts/theHeader'
import theSidebar from '@/components/Layouts/theSidebar'

export default {
    name: 'Dashboard',
    components: {
		theHeader,
        theSidebar,
	},
    mounted() {
        this.$store.dispatch('auth/getUser')
    },
    computed: {
        user() {
            return this.$store.state.auth.user
        }
    }
}
</script>