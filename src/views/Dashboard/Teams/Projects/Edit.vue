<template>
    <div>
        <div v-if="project">
            <pageHeader 
                title="Modifica progetto"
                :routes="[
                    {
                        to: { name: 'Teams'},
                        text: 'Gestisci teams'
                    },
                    {
                        to: { name: 'Teams.show', params: { slug: project.team.slug }},
                        text: project.team.name
                    },
                    {
                        to: { name: 'Projects.show', params: { 
                            tslug: project.team.slug, 
                            pslug: project.slug, 
                        }},
                        text: project.name
                    },
                ]"
                resource="modifica"
            />

            <form @submit.prevent="updateProject" class="bg-white mb-4 p-4 rounded-lg shadow-custom">
                <errorMessage
                    :errors="errors"
                />

                <div class="mb-4">
                    <label for="name" class="text-sm text-gray-400 block">Nome *</label>
                    <input
                        name="name"
                        type="text"
                        v-model="project.name"
                        class="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400">
                </div>

                <div class="mb-8">
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
import errorMessage from '@/components/Layouts/errorMessage'
import baseButton from '@/components/Layouts/baseButton'
import { VueEditor } from "vue2-editor";

export default {
    name: 'Dashboard.Teams.Project.Edit',
    props: {
        tslug: { // slug of the team
            type: String,
            required: true
        },
        pslug: { // slug of the project
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
        this.getProject()
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
        project() {
            return this.$store.getters['projects/project']
        },
        errors() {
            return this.$store.getters['projects/errors']
        }
    },
    methods: {
        getProject() {
            this.$store.dispatch('projects/getProject', {
                tslug: this.tslug,
                pslug: this.pslug,
            })
        },
        updateProject() {
            this.$store.dispatch('projects/updateProject', {project: this.project})
        },
        clearErrors() {
            this.$store.dispatch('projects/clearErrors')            
        }
    }
}
</script>
