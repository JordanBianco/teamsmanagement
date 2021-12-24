<template>
    <div v-if="user">
        <theHeader />

        <section class="flex">
            <theSidebar />

            <router-view
                class="min-h-screen w-full bg-indigo-50 py-6 pl-64 pr-8"
                :key="$route.path">
            </router-view>
        </section>
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