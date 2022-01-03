<template>
    <div>
        <div v-if="team">
            <pageHeader 
                title="Modifica Team"
                :routes="[
                    {
                        to: { name: 'Teams'},
                        text: 'Gestione Teams'
                    },
                    {
                        to: { name: 'Teams.show', params: { slug: team.slug }},
                        text: team.name 
                    },
                ]"
                resource="modifica"
            />

            <form @submit.prevent="updateTeam" class="bg-white mb-4 p-4 rounded-lg shadow-custom">
                <errorMessage
                    :errors="errors"
                />

                <div class="mb-4">
                    <label for="name" class="text-sm text-gray-400 block">Nome *</label>
                    <input
                        name="name"
                        type="text"
                        v-model="team.name"
                        class="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400">
                </div>
                <div class="mb-4">
                    <label for="color" class="text-sm text-gray-400 block">Color</label>
                    <input
                        name="color"
                        type="color"
                        v-model="team.color"
                        class="border border-gray-200 rounded-lg px-2 py-1.5 text-sm transition focus:outline-none focus:border-gray-400">
                </div>

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
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'
import errorMessage from '@/components/Layouts/errorMessage'
import baseButton from '@/components/Layouts/baseButton'
import { VueEditor } from "vue2-editor";

export default {
    name: 'Dashboard.Users.Edit',
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        pageHeader,
        errorMessage,
        baseButton,
        VueEditor
    },
    mounted() {
        this.getTeam()
    },
    watch: {
        "$route": {
            handler() {
                this.clearErrors()
            },
            deep: true,
            immediate: true
        },
    },
    data() {
        return {
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
        team() {
            return this.$store.getters['teams/team']
        },
        errors() {
            return this.$store.getters['teams/errors']
        }
    },
    methods: {
        getTeam() {
            this.$store.dispatch('teams/getTeam', {slug: this.slug})
        },
        updateTeam() {
            this.$store.dispatch('teams/updateTeam', {team: this.team})
        },
        clearErrors() {
            this.$store.dispatch('teams/clearErrors')            
        }
    }

}
</script>