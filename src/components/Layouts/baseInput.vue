<template>
    <input
        :type="type"
        :placeholder="placeholder"
        class="">
</template>

<script>
export default {
    name: 'Layouts.baseInput',
    props: {
        type: {
            type: String,
            default: "text"
        },
        placeholder: {
            type: String,
            default: null,
            required: false
        },
    }
}
</script>