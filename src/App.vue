<template>
	<div>
		<router-view class="min-h-screen" />
	</div>
</template>

<script>
export default {
	// 
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