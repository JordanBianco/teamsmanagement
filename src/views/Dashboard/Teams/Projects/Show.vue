<template>
    <div>
        <div v-if="project">
            <div class="flex items-start justify-between">
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
                    ]"
                    resource="project overview"
                />                

                <div class="flex items-center space-x-2">
                    <userAvatar
                        v-for="user in members"
                        :key="user.id"
                        :user="user"
                        :classes="'w-7 h-7 flex-none rounded-full'"
                    />
                </div>
            </div>

            <section class="flex space-x-8">
                <div class="w-3/4">
                    <section>
                        <div class="mb-4 flex items-center space-x-4 justify-end">
                            <div class="flex space-x-2 items-center text-sm text-gray-500">
                                <input
                                    type="checkbox"
                                    v-model="filters.uncompleted"
                                    :value="true"
                                    name="uncompleted"
                                    >
                                <span>mostra solo tasks non completate</span>
                            </div>

                            <createTask
                                :project="project"
                                :members="members"
                            />
                        </div>

                        <table class="w-full">
                            <tableHeader class="bg-white rounded-lg shadow-custom" :columns="columns" />

                            <tr
                                v-for="(task, index) in tasks"
                                :key="index"
                                :class="[ selectedTasks.includes(task.id) ? 'bg-indigo-50' : 'odd:bg-gray-100 even:bg-gray-50' ]"
                                class="text-gray-500 text-sm">
                                    <td class="pl-4 py-2 text-center">
                                        <input
                                            type="checkbox"
                                            name="selectedTeams"
                                            class="mt-2"
                                            :value="task"
                                            v-model="selectedTasks"
                                        >
                                    </td>
                                    <td class="py-2 pl-4 w-1/3">
                                        <div class="flex justify-between items-center mb-1">
                                            <span
                                                :class="[ task.status == 'completed' ? 'text-gray-400 line-through' : 'text-gray-600' ]"
                                                class="block">
                                                    {{ task.name }}
                                            </span>
                                            <svg
                                                @click="showDescription(index)"
                                                :class="[ showDescriptionIndex === index ? 'rotate-180' : '' ]"
                                                class="w-5 h-5 flex-none text-gray-400 hover:text-gray-500 transition transform cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17,13.41,12.71,9.17a1,1,0,0,0-1.42,0L7.05,13.41a1,1,0,0,0,0,1.42,1,1,0,0,0,1.41,0L12,11.29l3.54,3.54a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29A1,1,0,0,0,17,13.41Z"/></svg>
                                        </div>
                                        <div
                                            v-if="showDescriptionIndex === index"
                                            class="text-gray-400 text-justify text-xs leading-tight">
                                                {{ task.description }}
                                        </div>
                                    </td>
                                    <td class="py-2 pl-4">
                                        <userAvatar
                                            v-if="task.user"
                                            :user="task.user" 
                                            :name="task.user.name"
                                            :classes="'w-7 h-7 flex-none rounded-full'"
                                        />
                                        <div v-else class="text-gray-400">
                                            non ancora assegnata
                                        </div>
                                    </td>
                                    <td class="py-2">
                                        <div
                                            :class="statusColor(task.status)"
                                            class="text-xs px-3 py-0.5 rounded-full max-w-max">
                                                {{ task.status }}
                                        </div>
                                    </td>
                                    <td class="py-2 px-4 whitespace-nowrap">
                                        {{ $moment(task.due_date).format('YYYY-MM-DD') }}
                                    </td>
                                    <td class="py-2 px-4">
                                        <div class="relative flex justify-center">
                                            <svg
                                                @click="openMenu(index)"
                                                class="w-5 h-5 text-gray-400 hover:text-gray-500 transition cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                                            
                                                <div
                                                    v-if="showMenuIndex === index"
                                                    class="p-2 rounded-lg shadow bg-white absolute top-5 right-0 flex flex-col z-10">
                                                        <router-link
                                                            :to="{ name: 'Tasks.edit', params: {
                                                                id: task.id,
                                                                tslug: tslug,
                                                                pslug: pslug,
                                                            }}"
                                                            class="text-gray-400 hover:text-gray-500 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition flex items-center space-x-1">
                                                                <svg class="w-4.5 h-4.5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>
                                                                <span>Modifica</span>
                                                        </router-link>

                                                        <span class="block border-b border-gray-100 my-1"></span>

                                                        <button
                                                            @click="deleteTask(task, index)"
                                                            class="text-gray-400 hover:text-red-500 hover:bg-red-100 px-2 py-1.5 rounded-lg transition flex items-center space-x-1">
                                                                <svg class="w-4.5 h-4.5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>
                                                                <span>Elimina</span>
                                                        </button>
                                                </div>
                                        </div>
                                    </td>
                            </tr>
                        </table>

                        <footer class="flex items-center m-4" :class="[ selectedTasks.length ? 'justify-between' : 'justify-end' ]">
                            <div v-if="selectedTasks.length" class="flex space-x-4 items-center">
                                <p class="text-gray-500 text-sm">{{ selectedTasks.length }} tasks selezionate</p>
                                <button
                                    @click="deleteTasks()"
                                    title="Eliminare Tasks"
                                    class="bg-gray-200 rounded-lg p-0.5 text-gray-400 hover:bg-red-200 hover:text-red-500 transition">
                                        <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>
                                </button>
                            </div>
                        </footer>

                    </section>

                </div>
                <div class="w-1/4 space-y-4">
                    <doughnut
                        v-if="tasks.length != 0"
                        class="p-4 bg-white rounded-lg shadow-custom"
                        :height="300"
                        :chartData="tasksData"
                    />
                    <section class="bg-white p-4 rounded-lg shadow-custom space-y-2">
                        <div class="flex items-start text-gray-400 space-x-3">
                            <svg class="w-4.5 h-4.5 flex-none mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"/></svg>

                            <div>
                                <span class="block text-xs text-gray-400">Progetto creato da</span>
                                <span class="block text-sm text-gray-600">{{ project.user.name }}</span>
                            </div>
                        </div>

                        <div class="flex items-start text-gray-400 space-x-3">
                            <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M13,14H9a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2ZM17,4H15.82A3,3,0,0,0,13,2H11A3,3,0,0,0,8.18,4H7A3,3,0,0,0,4,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V7A3,3,0,0,0,17,4ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm8,14a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V7A1,1,0,0,1,7,6H8V7A1,1,0,0,0,9,8h6a1,1,0,0,0,1-1V6h1a1,1,0,0,1,1,1Zm-3-9H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z"/></svg>

                            <div>
                                <span class="block text-xs text-gray-400">Tasks totali</span>
                                <span class="block text-sm text-gray-600">{{ tasks.length }}</span>
                            </div>
                        </div>

                        <div class="flex items-start text-gray-400 space-x-3">
                            <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.09814,12.63379,13,11.42285V7a1,1,0,0,0-2,0v5a.99985.99985,0,0,0,.5.86621l2.59814,1.5a1.00016,1.00016,0,1,0,1-1.73242ZM12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Z"/></svg>

                            <div>
                                <span class="block text-xs text-gray-400">Data creazione</span>
                                <span class="block text-sm text-gray-600">{{ $moment(project.created_at).format('YYYY-MM-DD') }}</span>
                            </div>
                        </div>

                        <div class="flex items-start text-gray-400 space-x-3">
                            <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M18.9917,21.002h-1V19.335a5.00057,5.00057,0,0,0-.29956-1.67773c-.01093-.02936-.0224-.05658-.03589-.08454a4.97694,4.97694,0,0,0-.66455-1.23675l-1.3999-1.86719a3.01933,3.01933,0,0,1-.6001-1.80078V11.6582a3.02108,3.02108,0,0,1,.87842-2.12109l.65722-.65723A4.94566,4.94566,0,0,0,17.92365,6.0415c.00054-.01391.008-.02551.008-.03955l-.00281-.01373a5.01836,5.01836,0,0,0,.06287-.64349V3.002h1a1,1,0,0,0,0-2h-14a1,1,0,0,0,0,2h1V5.34473a5.01836,5.01836,0,0,0,.06287.64349L6.05176,6.002c0,.014.00744.02564.008.03955a4.94571,4.94571,0,0,0,1.3963,2.83838l.65723.65723A3.02108,3.02108,0,0,1,8.9917,11.6582V12.668a3.02212,3.02212,0,0,1-.59961,1.80078L6.99121,16.33594a4.98221,4.98221,0,0,0-.66437,1.23718c-.0133.02771-.02472.05463-.03552.08368A5.00309,5.00309,0,0,0,5.9917,19.335v1.667h-1a1,1,0,0,0,0,2h14a1,1,0,0,0,0-2Zm-11-16v-2h8v2Zm.87842,2.46387A2.97036,2.97036,0,0,1,8.49323,7.002h6.99694a2.97094,2.97094,0,0,1-.37689.46387l-.65723.65723a4.9603,4.9603,0,0,0-1.42187,2.8789h-2.085A4.96025,4.96025,0,0,0,9.52734,8.123ZM9.99219,15.668a5.03688,5.03688,0,0,0,.98828-2.666h2.02246a5.03332,5.03332,0,0,0,.98877,2.666l1.00012,1.334H8.99133Zm5.99951,5.334h-8V19.335a2.954,2.954,0,0,1,.02722-.333h7.94556a2.954,2.954,0,0,1,.02722.333Z"/></svg>

                            <div>
                                <span class="block text-xs text-gray-400">Data scadenza</span>
                                <span class="block text-sm text-gray-600">{{ $moment(project.end_date).format('YYYY-MM-DD') }}</span>
                            </div>
                        </div>
                    </section>

                    <section class="bg-white p-4 rounded-lg shadow-custom mb-4">
                        <h3 class="text-gray-600 mb-2">Descrizione</h3>
                        <div v-html="project.description" class="text-gray-400 text-sm"></div>
                    </section>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'
import tableHeader from '@/components/Layouts/tableHeader'
import userAvatar from '@/components/Layouts/userAvatar'

import doughnut from '@/components/Charts/doughnut'

import createTask from '@/components/Projects/createTask'

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
        pageHeader,
        tableHeader,
        userAvatar,
        createTask,
        doughnut,
    },
    mounted() {
        this.getProject()
        this.getTasks()
        this.getMembers()
    },
    watch: {
        "filters.uncompleted": function() {
            this.getTasks()
        },
        tasks() {
            this.setTasksData()
        }
    },
    data() {
        return {
            columns: [ 
                '',
                'Nome',
                'Assegnato a',
                'Stato',
                'Data scadenza',
                ''
            ],
            filters: {
                uncompleted: false
            },
            selectedTasks: [],
            showMenuIndex: null,
            showDescriptionIndex: null,

            tasksData: {},
        }
    },
    computed: {
        project() {
            return this.$store.getters['projects/project']
        },
        tasks() {
            return this.$store.getters['tasks/tasks']
        },
        members() {
            return this.$store.getters['teamMembers/members']
        },
        completed() {
            return this.$store.getters['tasks/completed']
        },
        pending() {
            return this.$store.getters['tasks/pending']
        },
        progress() {
            return this.$store.getters['tasks/progress']
        },
        errors() {
            return this.$store.getters['tasks/errors']
        },
    },
    methods: {
        getProject() {
            this.$store.dispatch('projects/getProject', {
                tslug: this.tslug,
                pslug: this.pslug,
            })
        },
        getTasks() {
            this.$store.dispatch('tasks/getTasks', {
                slug: this.pslug,
                filters: this.filters
            })
        },
        getMembers() {
            this.$store.dispatch('teamMembers/getMembers', { slug: this.tslug })
        },
        deleteTask(task, index) {
            if (confirm('Eliminare ' + task.name  + '?')) {
                this.$store.dispatch('tasks/deleteTask', {
                    project: this.project,
                    task: task,
                    index: index
                })

                this.showMenuIndex = null
            }
        },
        deleteTasks() {
            if (confirm('Eliminare ' + this.selectedTasks.length  + ' tasks?')) {
                this.$store.dispatch('tasks/deleteTasks', {
                    project: this.project,
                    tasks: this.selectedTasks,
                })

                this.selectedTasks = []
            }
        },
        showDescription(index) {
            if (this.showDescriptionIndex == index) {
                this.showDescriptionIndex = null
            } else {
                this.showDescriptionIndex = index
            }
        },
        openMenu(index) {
            if (this.showMenuIndex == index) {
                this.showMenuIndex = null
            } else {
                this.showMenuIndex = index
            }
        },
        statusColor(status) {
            switch (status) {
                case 'pending':
                    return 'bg-indigo-100 text-indigo-500'
                case 'in progress':
                    return 'bg-blue-100 text-blue-500'
                case 'completed':
                    return 'bg-green-100 text-green-500'
            }
        },
        setTasksData() {
            let datasets = []

            let chart_labels = [
                'Task da assegnare', 
                'Task in progress',
                'Task completate'
            ] 

            let colorlist = [
                'rgba(165, 180, 252)', // indigo
                'rgba(147, 197, 253)', // blue
                'rgba(110, 231, 183)' // green
            ]
            
            datasets.push({
                data: [
                    this.pending.length,
                    this.progress.length,
                    this.completed.length,
                ],
                backgroundColor: colorlist,
            })

            this.tasksData = Object.assign({}, this.datasets, 
                {
                    labels: chart_labels, 
                    datasets: datasets
                }
            )
        }
    }
}
</script>