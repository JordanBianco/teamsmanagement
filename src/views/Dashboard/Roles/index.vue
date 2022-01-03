<template>
    <div>
        {{ roles }}
    </div>
</template>

<script>
export default {
    name: 'Dashboard.Roles',
    mounted() {
        this.getRoles()
    },
    computed: {
        roles() {
            return this.$store.getters['roles/roles']
        }
    },
    methods: {
        getRoles() {
            this.$store.dispatch('roles/getRoles')
        }
    }
}
</script>