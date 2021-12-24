<template>
    <div>
        <label
            v-if="label"
            for="label"
            class="text-sm text-gray-400">
                {{ label }}    
        </label>
        <input
            :type="type"
            :name="name"
            :required="required"
            :placeholder="placeholder"
            @input="updateValue"
            :class="{ 'pl-8' : type == 'search' }"
            class="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full transition focus:outline-none focus:border-gray-400">
    </div>
</template>

<script>
export default {
    name: 'Layouts.baseInput',
    props: {
        type: {
            type: String,
            default: "text"
        },
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            default: null,
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