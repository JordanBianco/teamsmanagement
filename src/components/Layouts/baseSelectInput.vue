<template>
    <div>
        <label
            v-if="label"
            :for="name"
            class="text-sm text-gray-400">
                {{ label }}
        </label>
        <select
                @input="updateValue"
                :name="name"
                class="text-gray-500 px-2 py-1.5 text-sm rounded-lg focus:outline-none border focus:border-gray-300 transition w-full"
            >
            <option v-if="text" value="">{{ text }}</option>
            <option
                v-for="(value, i) in values"
                :key="i"
                :value="value">
                    {{ value }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'Layouts.baseSelectInput',
    props: {
        name: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: false
        },
        values: {
            type: Array,
            required: true
        },
        label: {
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