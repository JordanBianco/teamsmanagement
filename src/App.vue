<template>
	<div>
		<router-view class="min-h-screen" />

		<notificationList />
	</div>
</template>

<script>
import notificationList from '@/components/Notifications/NotificationList'

export default {
	components: {
		notificationList
	}
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
	transition-property: opacity;
	transition-duration: .25s;
}

.fade-enter-active {
	transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
	opacity: 0
}
</style>