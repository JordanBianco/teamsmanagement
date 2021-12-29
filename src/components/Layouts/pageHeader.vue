<template>
    <header class="mb-6" :class="{ 'flex items-baseline space-x-4' : routes }">
        <!-- Titolo pagina -->
        <h2 class="text-xl text-gray-700">
            {{ title }}
        </h2>

        <!-- Breadcrumb, che può avere una o più rotte -->
        <section
            v-if="routes"
            class="flex items-center space-x-0.5 text-sm">
                <div
                    v-for="route, index in routes"
                    :key="index"
                    class="flex items-center space-x-0.5">
                        <router-link
                            class="text-gray-400 hover:text-gray-500 transition"
                            :to="route.to">
                                {{ route.text }}
                        </router-link>
                        <svg
                            class="w-4 h-4 flex-none text-gray-400 mt-0.5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path fill="currentColor" d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"/>
                        </svg>
                </div>

                <span class="text-indigo-400">{{ resource }}</span>
        </section>        
    </header>
</template>

<script>
export default {
    name: 'Layouts.pageHeader',
    props: {
        title: {
            type: String,
            default: 'Header'
        },
        routes: {
            type: Array,
            required: false
        },
        resource: {
            type: String,
            default: null,
            required: false
        },
    }
}
</script>