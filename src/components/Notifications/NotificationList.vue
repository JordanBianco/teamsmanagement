<template>
    <div
        class="fixed z-50 top-18 right-8">
            <transition-group name="fade">
                <notification-message
                    v-for="(notification, index) in notifications" :key="index"
                    :notification="notification"
                    :index="index"/>
            </transition-group>
    </div> 
</template>

<script>
import notificationMessage from '@/components/Notifications/NotificationMessage'

export default {
    components: {
        notificationMessage
    },
    computed: {
        notifications() {
            return this.$store.state.notifications.notifications;
        }
    }
}
</script>
