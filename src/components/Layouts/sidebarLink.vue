<template>
    <router-link
        :to="to"
        exact-active-class="text-c-white"
        class="flex items-center space-x-2 px-4 py-2 hover:bg-c-dark-gray text-gray-500 transition text-sm">
            <div
                v-if="svg"
                v-html="svg">
            </div>
        <span class="tracking-wider">{{ text }}</span>
    </router-link>
</template>

<script>
export default {
    name: 'Layouts.sidebarLink',
    props: {
        text: {
            type: String,
            default: 'item',
            required: true
        },
        to: {
            type: Object,
            default: null,
            required: true
        },
        svg: {
            type: String,
            default: null,
            required: false
        }
    }
}
</script>

<style>

</style>