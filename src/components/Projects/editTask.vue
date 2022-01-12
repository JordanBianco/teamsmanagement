<template>
    <div>
        <aside
            :class="{ 'translate-x-full' : !showEditTaskMenu }"
            class="fixed transition duration-200 ease-in-out right-0 bottom-0 h-screen transform w-96 bg-gray-50 text-gray-600 z-40">
                <header class="flex justify-between p-4.5 border-b bg-white mb-4">
                    <span class="text-gray-500">Modifica Task</span>
                    <button @click="closeEditTaskMenu">
                        <svg class="w-6 h-6 flex-none text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                    </button>
                </header>

                <form @submit.prevent="updateTask" class="p-4">
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
                            rows="3"
                            class="resize-none border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400"></textarea>
                    </div>

                    <div class="mb-4">
                        <label for="status" class="text-sm text-gray-400 block">Stato</label>
                        <select
                            v-model="task.status"
                            name="status"
                            class="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400">
                            <option
                                v-for="(status, i) in statuses"
                                :key="i"
                                :value="status">
                                    {{ status }}
                            </option>
                        </select>
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
                        text="Modifica Task"
                    />
                </form>
        </aside>

        <!-- Overlay -->
        <div
            v-if="showEditTaskMenu"
            @click="closeEditTaskMenu"
            class="fixed z-30 inset-0 bg-black opacity-30"></div>
    </div>
</template>

<script>
import errorMessage from '@/components/Layouts/errorMessage'
import baseInput from '@/components/Layouts/baseInput'
import baseButton from '@/components/Layouts/baseButton'

export default {
    name: 'Project.editTask',
    props: {
        task: {
            type: Object,
            required: true
        },
        project: {
            type: Object,
            required: true
        },
        members: {
            type: Array,
            required: true
        },
        showEditTaskMenu: {
            type: Boolean,
            required: true
        }
    },
    components: {
        errorMessage,
        baseInput,
        baseButton
    },
    watch: {
        success: {
            handler() {
                if (this.success == true) {
                    console.log("success")
                }
                // this.$emit("updatedCreate", this.crudModelCreate);
            },
            deep: true,
            immediate: true
            // if (this.success) {
            //     console.log('success')
            //     // this.closeNewTaskMenu()
            // }
        }
    },
    data() {
        return {
            statuses: [
                'pending',
                'in progress',
                'completed'
            ]
        }
    },
    computed: {
        errors() {
            return this.$store.getters['tasks/errors']
        },
        success() {
            return this.$store.state.tasks.success
        }
    },
    methods: {
        closeEditTaskMenu() {
            this.$emit('closeEditTaskMenu')
            // this.setSuccessStatus(false)
            // this.task.assigned_to = ''
            // this.task.name = ''
            // this.task.description = ''
            // this.task.due_date = ''
            // this.$store.dispatch('tasks/clearErrors')
        },
        updateTask() {
            this.$store.dispatch('tasks/updateTask', {
                task: this.task,
                slug: this.project.slug
            })
        },
        // setSuccessStatus(value) {
        //     this.$store.dispatch('tasks/setSuccessStatus', value)
        // },
    }
}
</script>