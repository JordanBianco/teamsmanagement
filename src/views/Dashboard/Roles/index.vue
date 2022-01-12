<template>
    <div>
        <pageHeader 
            title="Gestione Ruoli"
        />

        <div v-if="roles" class="bg-white rounded-lg shadow-custom">
           <table class="w-full">
               <tableHeader :columns="columns" />

                <tr
                    v-for="(role, index) in roles"
                    :key="index"
                    class="text-gray-500 text-sm odd:bg-gray-100 even:bg-gray-50">
                        <td class="p-2 text-center text-xs text-gray-400 font-semibold">
                            #{{ role.id }}
                        </td>
                        <td class="py-2 px-4">
                            {{ role.name }}
                        </td>
                        <td class="py-2 px-4">
                            <div class="flex items-center space-x-1">
                                <router-link
                                    title="Modifica"
                                    class="bg-gray-200 rounded-lg p-0.5 text-gray-400 hover:text-gray-500 transition"
                                    to="">
                                        <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>
                                </router-link>

                                <button
                                    title="Elimina"
                                    class="bg-gray-200 rounded-lg p-0.5 text-gray-400 hover:bg-red-200 hover:text-red-500 transition">
                                        <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>
                                </button>
                            </div>
                        </td>
                </tr>
           </table>
        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layouts/pageHeader'
import tableHeader from '@/components/Layouts/tableHeader'

export default {
    name: 'Dashboard.Roles',
    components: {
        pageHeader,
        tableHeader
    },
    mounted() {
        this.getRoles()
    },
    data() {
        return {
            columns: [
                'id',
                'name'
            ]
        }
    },
    computed: {
        roles() {
            return this.$store.getters['roles/roles']
        }
    },
    methods: {
        getRoles() {
            this.$store.dispatch('roles/getRoles')
        }
    }
}
</script>