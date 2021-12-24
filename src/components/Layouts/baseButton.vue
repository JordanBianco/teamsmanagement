<template>
    <button
        :type="type"
        class="bg-indigo-500 hover:bg-indigo-600 transition text-white rounded px-3 py-1.5 text-sm"
    >
        {{ text }}
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
        }        
    }
}
</script>