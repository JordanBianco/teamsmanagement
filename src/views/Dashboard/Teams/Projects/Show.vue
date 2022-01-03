<template>
    <div>
        {{ tslug }}
    </div>
</template>

<script>
export default {
    props: {
        tslug: { // slug of the team
            type: String,
            required: true
        }
    },
    // mounted() {
    //     this.getProjects()
    // },
    // methods: {
    //     getProjects() {
    //         this.$store.dispatch('projects/getProjects', {slug: this.tslug })
    //     }
    // }
}
</script>