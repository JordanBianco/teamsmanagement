<template>
    <div>
        <pageHeader 
            title="Team"
            :routes="[
                {
                    to: { name: 'Teams'},
                    text: 'Gestione teams'
                },
            ]"
            resource="crea nuovo team"
        />

        <form @submit.prevent="storeTeam" class="bg-white mb-4 p-4 rounded-lg shadow-custom">
            <errorMessage
                :errors="errors"
            />
            <baseInput
                label="Nome *"
                type="text"
                name="name"
                v-model="team.name"
                class="mb-4"
            />

            <baseInput
                label="Colore"
                type="color"
                name="color"
                v-model="team.color"
                class="mb-4 max-w-max"
            />

            <baseTextarea
                label="Descrizione"
                name="description"
                :rows="4"
                v-model="team.description"
                class="mb-4"
            />

            <baseButton
                text="Salva"
            />            
        </form>
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'
import baseInput from '@/components/Layouts/baseInput'
import baseTextarea from '@/components/Layouts/baseTextarea'
import baseSelectInput from '@/components/Layouts/baseSelectInput'
import baseButton from '@/components/Layouts/baseButton'
import errorMessage from '@/components/Layouts/errorMessage'

export default {
    name: 'Dashboard.Teams.create',
    components: {
        pageHeader,
        baseInput,
        baseTextarea,
        baseSelectInput,
        baseButton,
        errorMessage
    },
    mounted() {
        this.getAllUsers()
    },
    watch: {
        "$route" : {
            handler() {
                this.clearErrors()
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            team: {
                name: '',
                description: '',
                color: ''
            }
        }
    },
    computed: {
        errors() {
            return this.$store.getters['teams/errors']
        }
    },
    methods: {
        storeTeam() {
            this.$store.dispatch('teams/storeTeam', { team : this.team})
        },
        clearErrors() {
            this.$store.dispatch('teams/clearErrors')
        }
    }
}
</script>