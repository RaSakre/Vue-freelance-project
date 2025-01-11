<template>
	<div v-if="task" class="card">
		<h2>{{ task.title }}</h2>
		<p><strong>Статус</strong>:
			<AppStatus :type="task.status" />
		</p>
		<p>
			<strong>Дэдлайн</strong>:
			{{ new Date(task.deadline).toLocaleDateString() }}
		</p>
		<p><strong>Описание</strong>: {{ task.description }}</p>
		<div>
			<button @click="patchInProgressTask" class="btn">Взять в работу</button>
			<button @click="patchDoneTask" class="btn primary">Завершить</button>
			<button @click="patchCancelTask" class="btn danger">Отменить</button>
		</div>
	</div>
	<h3 v-else class="text-white center">
		Задачи с id = <strong>{{ id }}</strong> нет.
	</h3>
</template>

<script>
import AppStatus from "../components/AppStatus";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
	setup() {
		const router = useRoute();
		const id = Number(router.params.id);
		const store = useStore();
		const tasks = computed(() => store.state.tasks);
		const task = computed(() =>
			tasks.value.find((task) => Number(task.id) === id)
		);
		const patchCancelTask = () => {
			store.dispatch("patchStatusTask", {
				id: id,
				status: "canceled",
			});
		};
		const patchInProgressTask = () => {
			store.dispatch("patchStatusTask", {
				id: id,
				status: "inprogress",
			});
		};
		const patchDoneTask = () => {
			store.dispatch("patchStatusTask", {
				id: id,
				status: "done",
			});
		};
		return {
			task,
			id,
			patchCancelTask,
			patchInProgressTask,
			patchDoneTask,
		};
	},
	components: { AppStatus },
};
</script>

<style scoped></style>
