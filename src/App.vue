<template>
	<the-navbar></the-navbar>
	<div class="container with-nav">
		<router-view />
	</div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import TheNavbar from "./components/TheNavbar";

export default {
	setup() {
		const store = useStore();
		const loadTasks = () => {
			store.dispatch("loadTasks");
		};
		onMounted(() => {
			loadTasks();
		});
	},
	components: {
		TheNavbar,
	},
};
</script>

<style></style>
