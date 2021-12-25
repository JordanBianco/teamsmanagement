<template>
    <span
        :class="color()"
        class="block px-2 py-0.5 text-sm rounded-full max-w-max">
            {{ text }}
    </span>
</template>

<script>
export default {
    name: 'Layouts.baseBadge',
    props: {
        text: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: "base"
        }
    },
    methods: {
        color() {
            switch (this.type) {
                case 'base':
                    return 'text-indigo-500 bg-indigo-100'
                case 'success':
                    return 'text-green-500 bg-green-100'
                case 'error':
                    return 'text-red-500 bg-red-100'
                case 'info':
                    return 'text-blue-500 bg-blue-100'
                default:
                    return 'text-indigo-500 bg-indigo-100'
            }
        }
    }
}
</script>