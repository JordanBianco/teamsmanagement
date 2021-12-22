<template>
	<div>
		<div>
			<router-link to="/">Home</router-link> |
			<router-link :to="{ name: 'Login' }">Login</router-link> |
		</div>
		<router-view />
	</div>
</template>