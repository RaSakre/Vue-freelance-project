<template>
	<form @submit.prevent="submitForm" class="card">
		<h1>Создать новую задачу</h1>
		<div class="form-control">
			<label for="title">Название</label>
			<input v-model="taskData.title" type="text" id="title" />
		</div>

		<div class="form-control">
			<label for="date">Дата дэдлайна</label>
			<input v-model="taskData.deadline" type="date" id="date" />
		</div>

		<div class="form-control">
			<label for="description">Описание</label>
			<textarea v-model="taskData.description" id="description"></textarea>
		</div>

		<button :disabled="!this.isActive" class="btn primary">Создать</button>
	</form>
</template>

<script>
import { mapActions } from "vuex";
import { useRouter } from "vue-router";
export default {
	data() {
		return {
			taskData: {
				title: "",
				deadline: "",
				description: "",
				status: "active",
			},
		};
	},
	methods: {
		...mapActions(["postTask"]),
		async submitForm() {
			try {
				const deadlineDate = this.date; // Получаем дату из вычисляемого свойства
				const currentDate = new Date();
				if (deadlineDate < currentDate) {
					this.taskData.status = "canceled"; // Устанавливаем статус в 'отменено'
				}
				const response = await this.postTask(this.taskData);

				if (response) {
					// Редирект на главную страницу после успешного создания задачи
					this.router.push("/");
				}
			} catch (error) {
				console.error("Ошибка при создании задачи:", error);
			}
		},
	},
	setup() {
		const router = useRouter();
		return { router };
	},
	computed: {
		isActive: function () {
			return (
				this.taskData.title !== "" &&
				this.taskData.deadline !== "" &&
				this.taskData.description !== ""
			);
		},
		date() {
			let [yy, mm, dd] = this.taskData.deadline.split("-");
			return new Date(parseInt(yy), parseInt(mm) - 1, parseInt(dd));
		},
	},
};
</script>
