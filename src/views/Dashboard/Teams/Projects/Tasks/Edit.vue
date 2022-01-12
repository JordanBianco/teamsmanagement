<template>
    <div>
        <div v-if="task">
            <pageHeader 
                title="Nuovo progetto"
                :routes="[
                    {
                        to: { name: 'Teams'},
                        text: 'Gestisci teams'
                    },
                    {
                        to: { name: 'Teams.show', params: {slug: tslug }},
                        text: tslug
                    },
                    {
                        to: { name: 'Projects.show', params: {slug: pslug }},
                        text: pslug
                    },
                ]"
                resource="modifica task"
            />
            
            <form @submit.prevent="updateTask" class="p-4 bg-white rounded-lg shadow-custom">

                <errorMessage
                    :errors="errors"
                />

                <div class="mb-4">
                    <label for="assigned_to" class="text-sm text-gray-400 block">Assegna a</label>
                        <select
                            v-model="task.assigned_to"
                            name="assigned_to"
                            class="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400">
                            <option value="">Scegli un membro</option>
                            <option
                                v-for="(user, i) in members"
                                :key="i"
                                :value="user.id">
                                    {{ user.name }}
                            </option>
                        </select>
                </div>

                <div class="mb-4">
                    <label for="name" class="text-sm text-gray-400 block">Nome *</label>
                    <input
                        name="name"
                        type="text"
                        v-model="task.name"
                        class="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400">
                </div>

                <div class="mb-4">
                    <label for="description" class="text-sm text-gray-400 block">Descrizione</label>
                    <textarea
                        name="description"
                        v-model="task.description"
                        rows="6"
                        class="resize-none border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400"></textarea>
                </div>

                <div class="mb-4">
                    <label for="assigned_to" class="text-sm text-gray-400 block">Stato</label>
                    <select
                        v-model="task.status"
                        name="status"
                        class="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400">
                        <option
                            v-for="(status, i) in status"
                            :key="i"
                            :value="status">
                                {{ status }}
                        </option>
                    </select>
                </div>

                <div class="mb-8">
                    <label for="end_date">Data scadenza</label>
                    <input
                        type="date"
                        name="end_date"
                        v-model="task.due_date"
                        class="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400">
                </div>

                <baseButton
                    text="Modifica Task"
                />
            </form>
        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'
import errorMessage from '@/components/Layouts/errorMessage'
import baseButton from '@/components/Layouts/baseButton'

export default {
    name: 'Project.Tasks.edit',
    props: {
        tslug: {
            type: String,
            required: true
        },
        pslug: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
    },
    components: {
        pageHeader,
        errorMessage,
        baseButton
    },
    mounted() {
        this.getTask()
        this.getMembers()
    },
    data() {
        return {
            status: [
                'pending',
                'in progress',
                'completed'
            ]
        }
    },
    computed: {
        task() {
            return this.$store.getters['tasks/task']
        },
        members() {
            return this.$store.getters['teamMembers/members']
        },
        errors() {
            return this.$store.getters['tasks/errors']
        },
    },
    methods: {
        getTask() {
            this.$store.dispatch('tasks/getTask', { 
                slug: this.pslug,
                id: this.id
            })
        },
        getMembers() {
            this.$store.dispatch('teamMembers/getMembers', { slug: this.tslug })
        },
        updateTask() {
            this.$store.dispatch('tasks/updateTask', {
                slug: this.pslug,
                task: this.task
            })
        }
    }
}
</script>