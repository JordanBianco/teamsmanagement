<template>
    <tr class="border-b border-gray-100">
        <th
            v-for="(column, index) in columns"
            :key="index"
            class="text-indigo-400 p-4 text-xs uppercase font-normal tracking-wider whitespace-nowrap max-w-max text-left">
                {{ column }}
        </th>
    </tr>
</template>

<script>
export default {
    name: 'Layouts.tHeader',
    props: {
        columns: {
            type: Array,
            required: true
        }
    }
}
</script>