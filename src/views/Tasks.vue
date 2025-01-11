<template>
  <h1 v-if="tasks.length === 0" class="text-white center">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">
      Всего активных задач: {{ onlyActiveTasks.length }}
    </h3>
    <div v-for="task in tasks" :key="task.id" class="card">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{ task.deadline }}
          </small>
        </strong>
      </p>
      <button @click="goToTask(task.id)" class="btn primary">Посмотреть</button>
    </div>
  </template>
</template>

<script>
import AppStatus from "../components/AppStatus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
//import {ref} from 'vue'
import { computed } from "vue";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const tasks = computed(() => store.state.tasks);
    const goToTask = (id) => {
      router.push(`/task/${id}`);
    };
    const onlyActiveTasks = computed(() => {
      return tasks.value.filter((task) => task.status === "active");
    });
    return {
      tasks,
      goToTask,
      onlyActiveTasks,
    };
  },
  components: { AppStatus },
};
</script>
