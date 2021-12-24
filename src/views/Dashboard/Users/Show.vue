<template>
    <div>
        <pageHeader 
            text="Utente"
        />
        <div v-if="user">
            {{ user }}
        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'

export default {
    name: 'Dashboard.Users.Show',
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        pageHeader
    },
    mounted() {
        this.getUser()
    },
    computed: {
        user() {
            return this.$store.getters['users/user']
        }
    },
    methods: {
        getUser() {
            this.$store.dispatch('users/getUser', {slug: this.slug})
        }
    }

}
</script>