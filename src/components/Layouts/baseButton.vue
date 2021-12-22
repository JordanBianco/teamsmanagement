<template>
    <button
        :type="type"
        class=""
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