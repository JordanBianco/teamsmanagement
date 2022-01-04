<template>
    <button
        :type="type"
        :class="{ 'flex justify-center items-center space-x-4' : svg }"
        class="bg-gradient-to-r from-indigo-400 to-purple-500 transition text-white rounded px-3 py-1.5 text-sm relative"
    >
        <span>{{ text }}</span>
        <div
            class="absolute right-24"
            v-if="svg && loading"
            v-html="svg"></div>
    </button>
</template>

<script>
export default {
    name: 'Layouts.baseButton',
    props: {
        text: {
            type: String,
            default: "Submit",
        },
        type: {
            type: String,
            default: "submit"
        },
        svg: {
            type: String,
            required: false
        },
        loading: {
            type: Boolean,
            required: false,
        },
    }
}
</script>