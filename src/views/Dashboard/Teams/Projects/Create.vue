<template>
    <div>
        <div v-if="team">
            <pageHeader 
                title="Nuovo progetto"
                :routes="[
                    {
                        to: { name: 'Teams'},
                        text: 'Gestisci teams'
                    },
                    {
                        to: { name: 'Teams.show', params: {slug: team.slug }},
                        text: team.name
                    },
                ]"
                resource="crea nuovo progetto"
            />

            <form @submit.prevent="storeProject" class="bg-white mb-4 p-4 rounded-lg shadow-custom">
                <errorMessage
                    :errors="errors"
                />

                <baseInput
                    label="Nome *"
                    type="text"
                    name="name"
                    v-model="project.name"
                    class="mb-4"
                />

                <div class="mb-4">
                    <label for="description" class="text-sm text-gray-400 block">Descrizione</label>
                    <vue-editor
                        v-model="project.description"
                        :editor-toolbar="customToolbar"
                        placeholder="Inserisci una descrizione per questo team..."
                    />
                </div>

                <div class="mb-4">
                    <label for="end_date">Data scadenza</label>
                    <input
                        type="date"
                        name="end_date"
                        v-model="project.end_date"
                        class="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400">
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
import baseInput from '@/components/Layouts/baseInput'
import baseButton from '@/components/Layouts/baseButton'
import errorMessage from '@/components/Layouts/errorMessage'
import { VueEditor } from "vue2-editor";

export default {
    name: 'Dashboard.Teams.Project.Create',
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        pageHeader,
        baseInput,
        baseButton,
        errorMessage,
        VueEditor
    },
    mounted() {
        this.getTeam()
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
            project: {
                name: '',
                description: '',
                end_date: ''
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
        team() {
            return this.$store.getters['teams/team']
        },
        errors() {
            return this.$store.getters['projects/errors']
        },
        user() {
            return this.$store.getters['auth/user']
        },
    },
    methods: {
        getTeam() {
            this.$store.dispatch('teams/getTeam', {slug: this.slug})
        },
        storeProject() {
            this.$store.dispatch('projects/storeProject', {
                user_id: this.user.id,
                project: this.project,
                team: this.team
            })
        },
        clearErrors() {
            this.$store.dispatch('projects/clearErrors')
        }
    }
}
</script>