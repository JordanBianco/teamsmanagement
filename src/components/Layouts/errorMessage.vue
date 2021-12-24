<template>
    <div
        v-if="errors.length != 0"
        :class="{ 'bg-red-100 rounded p-2 mb-4 flex space-x-2' : errors.length != 0 }">
            <svg
                class="text-red-500 flex-none w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,16a1,1,0,1,0,1,1A1,1,0,0,0,12,16Zm10.67,1.47-8.05-14a3,3,0,0,0-5.24,0l-8,14A3,3,0,0,0,3.94,22H20.06a3,3,0,0,0,2.61-4.53Zm-1.73,2a1,1,0,0,1-.88.51H3.94a1,1,0,0,1-.88-.51,1,1,0,0,1,0-1l8-14a1,1,0,0,1,1.78,0l8.05,14A1,1,0,0,1,20.94,19.49ZM12,8a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V9A1,1,0,0,0,12,8Z"/>
            </svg>
            <div>
                <div
                    v-for="(e, index) in errors"
                    :key="index"
                    class="text-red-500 text-sm">
                        {{ e[0] }}
                </div>
            </div>
    </div>
</template>

<script>
export default {
    name: 'Layouts.errorMessage',
    props: {
        errors: {
            type: [Array, Object],
            required: true
        }
    }
}
</script>