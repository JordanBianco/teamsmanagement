<template>
    <div class="flex items-center space-x-2">
        <!--
            Name è facoltativo, perchè nel Header passo il nome dell'utente loggato
            Nella lista degli utenti ho bisogno solo dell'avatar
         -->
        <span v-if="name" class="text-gray-500 text-sm">{{ name }}</span>
        <img
            :src="avatar"
            alt=""
            class="w-8 h-8">
    </div>
</template>

<script>
export default {
    name: 'Layouts.userAvatar',
    props: {
        user: {
            type: Object,
            required: true,
            default: "Undefined"
        },
        name: {
            type: String,
            required: false
        }
    },
    computed: {
        avatar() {
            if (this.user.avatar) {
                return this.user.avatar
            } else {
                return 'https://eu.ui-avatars.com/api/?name=' + this.user.name
                    + '&rounded=true'
                    + '&color=818cf8'
                    + '&background=ccd1fc'
            }
        },
    },
}
</script>