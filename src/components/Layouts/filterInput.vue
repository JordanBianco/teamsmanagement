<template>
    <div>
        <label
            v-if="label"
            :for="name"
            class="text-gray-500 mb-1 block text-sm">
            {{ label }}
        </label>

        <select
            @input="updateValue"
            :name="name"
            class="text-gray-400 bg-c-light-gray p-2 text-sm rounded-lg focus:outline-none border border-gray-700 focus:border-gray-600 transition w-full"
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
    name: 'Layouts.filterInput',
    props: {
        label: {
            type: String,
            required: false
        },
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
    },
    methods: {
        updateValue(event) {
            return this.$emit("input", event.target.value);
        },
    },
}
</script>