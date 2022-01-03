<template>
    <div>
        <select
            name="role"
            v-model="role_id"
            @change="updateRole()"
            class="text-gray-500 px-2 py-1.5 text-sm rounded-lg focus:outline-none border focus:border-gray-300 transition max-w-max">
                <option value="">Cambia ruolo</option>

                <option
                    v-for="role in roles"
                    :key="role.id"
                    :value="role.id">{{ role.name }}</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'changeRole',
    props: {
        user: {
            type: Object,
            required: true,
        },
        team: {
            type: Object,
            required: true,
        }
    },
    mounted() {
        this.getRoles()
    },
    data() {
        return {
            role_id: ''
        }
    },
    computed: {
        roles() {
            return this.$store.getters['roles/roles']
        }
    },
    methods: {
        getRoles() {
            this.$store.dispatch('roles/getRoles')
        },
        updateRole() {
            this.$store.dispatch('roles/updateRole', {
                team: this.team,
                user: this.user,
                role_id: this.role_id,
            })
        },
    }
}
</script>