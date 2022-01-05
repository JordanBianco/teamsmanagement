<template>
    <div>
        <div v-if="project">
            <pageHeader 
                :title="project.name"
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
                        to: { name: 'Projects', params: { slug: project.team.slug }},
                        text: 'Progetti'
                    },
                ]"
                resource="overview"
            />

            <!-- <div class="grid grid-cols-2 gap-4">
                <section class="bg-white mb-4 p-4 rounded-lg shadow-custom">
                    TASK 10
                </section>

                <section class="bg-white mb-4 p-4 rounded-lg shadow-custom">
                    TASK COMPLETATE 1/10
                </section>
            </div> -->

            <section class="bg-white mb-4 p-4 rounded-lg shadow-custom">
                <div v-html="project.description" class="text-gray-500 text-sm"></div>
            </section>

        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'

export default {
    name: 'Dashboard.Teams.Project.Show',
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
        pageHeader
    },
    mounted() {
        this.getProject()
    },
    computed: {
        project() {
            return this.$store.getters['projects/project']
        }
    },
    methods: {
        getProject() {
            this.$store.dispatch('projects/getProject', {
                tslug: this.tslug,
                pslug: this.pslug,
            })
        }
    }
}
</script>