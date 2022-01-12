<template>
    <div>
        <div v-if="projects && team">
            <div class="grid grid-cols-3 gap-4">
                <div
                    v-for="(project, index) in projects"
                    :key="index"
                    class="bg-white rounded-lg shadow-custom h-32 p-4 relative">
                        <header class="flex space-x-4 items-start justify-between">
                            <router-link
                                :to="{ name: 'Projects.show', params: {
                                    tslug: team.slug,
                                    pslug: project.slug
                                }}"
                                class="block text-gray-500">
                                    {{ project.name }}
                            </router-link>

                            <div class="relative text-sm">
                                <svg
                                    @click="openMenu(index)"
                                    class="w-5 h-5 text-gray-400 hover:text-gray-500 transition cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                            
                                    <div
                                        v-if="showMenuIndex == index"
                                        class="p-1 rounded-lg shadow bg-white absolute top-5 right-0 flex flex-col z-10 whitespace-nowrap">
                                            <router-link
                                                :to="{ name: 'Projects.show', params: { tslug: team.slug, pslug: project.slug }}"
                                                class="text-gray-400 hover:text-gray-500 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition flex items-center space-x-2">
                                                    <svg class="w-4.5 h-4.5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/></svg>
                                                    <span>Dettagli</span>
                                            </router-link>

                                            <router-link
                                                :to="{ name: 'Projects.edit', params: { tslug: team.slug, pslug: project.slug }}"
                                                class="text-gray-400 hover:text-gray-500 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition flex items-center space-x-2">
                                                    <svg class="w-4.5 h-4.5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>
                                                    <span>Modifica</span>
                                            </router-link>

                                            <span class="block border-b border-gray-100 my-1"></span>

                                            <button
                                                @click="deleteProject(project, index)"
                                                class="text-gray-400 hover:text-red-500 hover:bg-red-100 px-2 py-1.5 rounded-lg transition flex items-center space-x-2">
                                                    <svg class="w-4.5 h-4.5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>
                                                    <span>Elimina</span>
                                            </button>
                                    </div>
                            </div>
                        </header>

                        <div class="absolute bottom-4 right-4">
                            <input
                                type="checkbox"
                                name="selectedProjects"
                                class="mt-2"
                                :value="project"
                                v-model="selectedProjects"
                            >
                        </div>
                </div>
            </div>
            <footer
                v-if="selectedProjects.length"
                class="flex items-center space-x-4 mt-4">
                    <p class="text-gray-500 text-sm">{{ selectedProjects.length }} progetti selezionati</p>
                    <button
                        @click="deleteProjects()"
                        class="text-gray-400 hover:text-red-500 transition text-xs">
                            <span>rimuovi</span>
                    </button>
            </footer>
        </div>
    </div>
</template>

<script>
import baseInput from '@/components/Layouts/baseInput'
import baseSelectInput from '@/components/Layouts/baseSelectInput'

export default {
    name: 'Dashboard.Teams.teamProjects',
    props: {
        team: {
            type: Object,
            required: true
        }
    },
    components: {
        baseInput,
        baseSelectInput
    },
    mounted() {
        this.getProjects()
    },
    data() {
        return {
            selectedProjects: [],
            showMenuIndex: null
        }
    },
    computed: {
        projects() {
            return this.$store.getters['projects/projects']
        },
    },
    methods: {
        getProjects() {
            this.$store.dispatch('projects/getProjects', {
                slug: this.team.slug,
            })
        },
        deleteProject(project, index) {
            if (confirm('Eliminare ' + project.name + '?')) {
                this.$store.dispatch('projects/deleteProject', {
                    team: this.team,
                    project: project,
                    index: index
                })

                this.showMenuIndex = null
            }
        },
        deleteProjects() {
            if (confirm('Eliminare ' + this.selectedProjects.length + ' progetti?')) {
                this.$store.dispatch('projects/deleteProjects', {
                    team: this.team,
                    projects: this.selectedProjects
                })

                this.selectedProjects = []
            }
        },
        // expiring(project) {
        //     if (this.$moment().format('MM') == this.$moment(project.end_date).format('MM')) {
        //         let result = this.$moment().format('DD') - this.$moment(project.end_date).format('DD')
        //         if (result <= 0 && result >= -5) {
        //             return true
        //         }
        //     }
        // },
        openMenu(index) {
            if (this.showMenuIndex == index) {
                this.showMenuIndex = null
            } else {
                this.showMenuIndex = index
            }
        }
    }
}
</script>