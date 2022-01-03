<template>
    <div>
        <div v-if="team">
            <pageHeader 
                title="Progetti"
                :routes="[
                    {
                        to: { name: 'Teams'},
                        text: 'Gestisci teams'
                    },
                    {
                        to: { name: 'Teams.show'},
                        text: team.name
                    },
                ]"
                resource="progetti"
            />

            <section class="grid grid-cols-4 gap-4">
                <router-link
                    :to="{ name: 'Projects.show', params: 
                        { 
                            tslug: team.slug,
                            pslug: project.slug
                        }
                    }"
                    v-for="(project, index) in projects"
                    :key="index"
                    class="bg-white rounded-lg shadow-custom h-36">
                        <div
                            class="px-2 py-1 my-4"
                            :style="team.color ? 'border-left: 3.5px solid ' + team.color : 'border-left: 3.5px solid lightgray'">
                                <span class="text-gray-600">{{ project.name }}</span>
                        </div>
                </router-link>
            </section>
        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'

export default {
    name: 'Dashboard.Teams.Project.Index',
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        pageHeader,
    },
    mounted() {
        this.getTeam()
        this.getProjects()
    },
    computed: {
        team() {
            return this.$store.getters['teams/team']
        },
        projects() {
            return this.$store.getters['projects/projects']
        }
    },
    methods: {
        getTeam() {
            this.$store.dispatch('teams/getTeam', {slug: this.slug})
        },
        getProjects() {
            this.$store.dispatch('projects/getProjects', {slug: this.slug })
        }
    }
}
</script>