<template>
    <div class="flex items-center space-x-2">
        <!--
            Name è facoltativo, perchè nel Header passo il nome dell'utente loggato
            Nella lista degli utenti ho bisogno solo dell'avatar
         -->
        <span v-if="name" class="text-gray-500 text-sm">{{ name }}</span>
        <div class="flex-none">
            <img
                :src="avatar"
                alt="user_avatar"
                :class="classes">
        </div>
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
        },
        classes: {
            type: String,
            required: false,
            default: "w-9 h-9 rounded-full"
        }
    },
    computed: {
        avatar() {
            if (this.user.avatar) {
                return this.user.avatar
            } else {
                return 'https://eu.ui-avatars.com/api/?name=' + this.user.name
                    // + '&rounded=true'
                    + '&color=818cf8'
                    + '&background=ccd1fc'
            }
        },
    },
}
</script>