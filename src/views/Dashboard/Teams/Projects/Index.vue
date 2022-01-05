<template>
    <div>
        <div v-if="team">
            <div class="flex justify-between">
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
                    resource="overview"
                />

                <div>
                    <router-link
                        :to="{ name: 'Projects.create', params: { slug: team.slug }}"
                        title="Nuovo progetto"
                        class="bg-gradient-to-r from-indigo-400 to-purple-400 transition shadow-custom rounded-full p-1.5 max-w-max block">
                            <svg class="w-4 h-4 flex-none text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"/></svg>
                    </router-link>
                </div>
            </div>

            <section v-if="projects.length != 0">

                <section class="bg-white mb-4 p-4 flex justify-between rounded-lg shadow-custom">
                    <div class="w-1/3">
                        <div class="relative">
                            <baseInput
                                name="search"
                                type="search"
                                placeholder="Cerca tra i progetti..."
                                v-model="filters.search"
                            />
                            <div class="absolute top-2 left-2">
                                <svg class="w-4.5 h-4.5 text-gray-300 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div class="w-2/3 flex justify-end items-center space-x-3">
                        <baseSelectInput
                            name="field"
                            v-model="filters.field"
                            :values="fieldVal"
                        />

                        <baseSelectInput
                            name="dir"
                            v-model="filters.dir"
                            :values="dirVal"
                        />
                    </div>
                </section>

                <section class="grid grid-cols-4 gap-4">
                    <div
                        v-for="(project, index) in projects"
                        :key="index"
                        class="bg-white rounded-lg shadow-custom h-36 relative">
                            <router-link
                                :to="{ name: 'Projects.show', params: 
                                    { 
                                        tslug: team.slug,
                                        pslug: project.slug
                                    }
                                }">
                                    <div
                                        class="px-4 py-1 my-4"
                                        :style="team.color ? 'border-left: 3.5px solid ' + team.color : 'border-left: 3.5px solid lightgray'">
                                            <span class="text-gray-600">{{ project.name }}</span>
                                    </div>
                                </router-link>

                                <div class="absolute bottom-4 left-4 right-4">

                                    <div class="flex items-center justify-between">
                                        
                                        <userAvatar
                                            :user="project.user"
                                            :name="project.user.name"
                                            :classes="'w-7 h-7 flex-none rounded-full'"
                                        />

                                        <div class="flex items-center space-x-1">
                                            <div
                                                v-if="expiring(project)"
                                                title="In scadenza a breve"
                                                class="bg-red-200 rounded-lg p-0.5 text-red-400"
                                            >
                                                    <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.09814,12.63379,13,11.42285V7a1,1,0,0,0-2,0v5a.99985.99985,0,0,0,.5.86621l2.59814,1.5a1.00016,1.00016,0,1,0,1-1.73242ZM12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Z"/></svg>
                                            </div>

                                            <router-link
                                                title="Modifica progetto"
                                                class="bg-gray-200 rounded-lg p-0.5 text-gray-400 hover:text-gray-500 transition"
                                                :to="{ name: 'Projects.edit', params:
                                                    { 
                                                        tslug: team.slug,
                                                        pslug: project.slug
                                                    }
                                                }">
                                                    <svg class="w-5 h-5 flex-none text-gray-400 hover:text-gray-500 transition cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>
                                            </router-link>

                                            <div
                                                title="Elimina progetto"
                                                class="bg-gray-200 rounded-lg p-0.5 text-gray-400 hover:text-gray-500 transition">
                                                    <svg
                                                        @click="deleteProject(project, index)"
                                                        class="w-5 h-5 flex-none text-gray-400 hover:text-gray-500 transition cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    </div>
                </section>
            </section>
        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'
import baseInput from '@/components/Layouts/baseInput'
import baseSelectInput from '@/components/Layouts/baseSelectInput'
import userAvatar from '@/components/Layouts/userAvatar'

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
        baseInput,
        baseSelectInput,
        userAvatar
    },
    mounted() {
        this.getTeam()
        this.getProjects()
    },
    watch: {
        "filters.search":function() {
            this.getProjects()
        },
        "filters.field":function() {
            this.getProjects()
        },
        "filters.dir":function() {
            this.getProjects()
        }
    },
    data() {
        return {
            filters: {
                search: '',
                field: 'ID',
                dir: 'asc',
            },
            fieldVal: [
                'ID',
                'Task completate',
                'Data scadenza',
                'Data creazione'
            ],
            dirVal: [
                'asc',
                'desc'
            ],
        }
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
            this.$store.dispatch('projects/getProjects', {
                slug: this.slug,
                filters: this.filters    
            })
        },
        deleteProject(project, index) {
            if (confirm('Eliminare ' + project.name + '?')) {
                this.$store.dispatch('projects/deleteProject', {
                    team: this.team,
                    project: project,
                    index: index
                })
            }
        },
        expiring(project) {
            if (this.$moment().format('MM') == this.$moment(project.end_date).format('MM')) {
                let result = this.$moment().format('DD') - this.$moment(project.end_date).format('DD')
                if (result <= 0 && result >= -5) {
                    return true
                }
            }
        },
    }
}
</script>