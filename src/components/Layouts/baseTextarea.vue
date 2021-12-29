<template>
    <div>
        <label
            v-if="label"
            :for="name"
            class="text-sm text-gray-400">
                {{ label }}    
        </label>
        <textarea
            :name="name"
            :rows="rows"
            :placeholder="placeholder"
            :required="required"
            @input="updateValue"
            class="resize-none border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400"></textarea>
    </div>
</template>

<script>
export default {
    name: 'Layouts.baseTextarea',
    props: {
        label: {
            type: String,
            default: null,
            required: false
        },
        name: {
            type: String,
            required: true
        },
        rows: {
            type: Number,
            default: 5,
            required: false
        },
        required: {
            type: String,
            default: null,
            required: false
        },
        placeholder: {
            type: String,
            default: null,
            required: false
        },
    },
    methods: {
        updateValue(event) {
            return this.$emit("input", event.target.value);
        },
    },
}
</script>