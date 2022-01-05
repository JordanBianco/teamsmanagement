<template>
    <div>
        <pageHeader 
            title="Nuovo Team"
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

            <div class="mb-8">
                <label for="description" class="text-sm text-gray-400 block">Descrizione</label>
                <vue-editor
                    v-model="team.description"
                    :editor-toolbar="customToolbar"
                    placeholder="Inserisci una descrizione per questo team..."
                />
            </div>

            <baseButton
                text="Salva"
            />
        </form>
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'
import baseInput from '@/components/Layouts/baseInput'
import baseSelectInput from '@/components/Layouts/baseSelectInput'
import baseButton from '@/components/Layouts/baseButton'
import errorMessage from '@/components/Layouts/errorMessage'
import { VueEditor } from "vue2-editor";

export default {
    name: 'Dashboard.Teams.create',
    components: {
        pageHeader,
        baseInput,
        baseSelectInput,
        baseButton,
        errorMessage,
        VueEditor
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
                color: '',
                description: ''
            },
            customToolbar: [
                [{ header: [false, 1, 2, 3, 4, 5, 6] }],
                ["bold", "italic", "underline", "strike"], // toggled buttons
                [
                    { align: "" },
                    { align: "center" },
                    { align: "right" },
                    { align: "justify" }
                ],
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ color: [] }, { background: [] }],
                ["link"],
                ["clean"] // remove formatting button
            ]
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