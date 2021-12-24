<template>
    <header :class="{ 'flex items-center justify-between mb-6' : to }">
        <h2 class="text-xl text-gray-700">
            {{ text }}
        </h2>
        
        <router-link
            v-if="to"
            :to="to"
            class="bg-indigo-400 hover:bg-indigo-500 transition text-white rounded-lg px-3 py-1.5 text-sm"
        >
            {{ route }}
        </router-link>
        
    </header>
</template>

<script>
export default {
    name: 'Layouts.pageHeader',
    props: {
        text: {
            type: String,
            default: 'Header'
        },
        to: {
            type: Object,
            required: false
        },
        route: {
            type: String,
            default: 'text'
        }
    }
}
</script>