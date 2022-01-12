<template>
    <div>
        <div
            title="Nuova Task"
            @click="openNewTaskMenu"
            class="bg-gradient-to-r from-indigo-400 to-purple-400 shadow-custom rounded-full p-1.5 max-w-max cursor-pointer">
                <svg class="w-4 h-4 flex-none text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"/></svg>
        </div>

        <aside
            :class="{ 'translate-x-full' : !showNewTaskMenu }"
            class="fixed transition duration-200 ease-in-out right-0 bottom-0 h-screen transform w-96 bg-gray-50 text-gray-600 z-40">
                <header class="flex justify-between p-4.5 border-b bg-white mb-4">
                    <span class="text-gray-500">Aggiungi Task</span>
                    <button @click="closeNewTaskMenu">
                        <svg class="w-6 h-6 flex-none text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                    </button>
                </header>

                <form @submit.prevent="storeTask" class="p-4">
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
                            type="text"
                            name="name"
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

                    <div class="mb-8">
                        <label for="end_date" class="text-sm text-gray-400 block">Data scadenza</label>
                        <input
                            type="date"
                            name="end_date"
                            v-model="task.due_date"
                            class="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400">
                    </div>

                    <baseButton
                        text="Aggiungi Task"
                    />
                </form>
        </aside>

        <!-- Overlay -->
        <div
            v-if="showNewTaskMenu"
            @click="closeNewTaskMenu"
            class="fixed z-30 inset-0 bg-black opacity-30"></div>
    </div>
</template>

<script>
import errorMessage from '@/components/Layouts/errorMessage'
import baseInput from '@/components/Layouts/baseInput'
import baseButton from '@/components/Layouts/baseButton'

export default {
    name: 'Project.createTask',
    props: {
        project: {
            type: Object,
            required: true
        },
        members: {
            type: Array,
            required: true
        },
    },
    components: {
        errorMessage,
        baseInput,
        baseButton
    },
    watch: {
        success() {
            if (this.success) {
                this.closeNewTaskMenu()
            }
        }
    },
    data() {
        return {
            showNewTaskMenu: false,
            task: {
                assigned_to: '',
                name: '',
                description: '',
                due_date: ''
            }
        }
    },
    computed: {
        errors() {
            return this.$store.getters['tasks/errors']
        },
        success() {
            return this.$store.getters['tasks/success']
        }
    },
    methods: {
        openNewTaskMenu() {
            this.showNewTaskMenu = true
        },
        closeNewTaskMenu() {
            this.showNewTaskMenu = false
            this.setSuccessStatus(false)
            this.task.assigned_to = ''
            this.task.name = ''
            this.task.description = ''
            this.task.due_date = ''
            this.$store.dispatch('tasks/clearErrors')
        },
        storeTask() {
            this.$store.dispatch('tasks/storeTask', {
                task: this.task,
                project: this.project
            })
        },
        setSuccessStatus(value) {
            this.$store.dispatch('tasks/setSuccessStatus', value)
        },
    }
}
</script>