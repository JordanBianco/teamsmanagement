<template>
    <span
        :class="color()"
        class="block px-2 py-0.5 text-xs rounded-full max-w-max">
            {{ text[0].name }}
    </span>
</template>

<script>
export default {
    name: 'Layouts.baseBadge',
    props: {
        text: {
            type: Array,
            required: true
        },
    },
    methods: {
        color() {
            switch (this.text[0].name) {
                case 'Leader':
                    return 'text-red-500 bg-red-100'
                case 'Utente':
                    return 'text-indigo-500 bg-indigo-100'
                default:
                    return 'text-indigo-500 bg-indigo-100'
            }
        }
    }
}
</script>