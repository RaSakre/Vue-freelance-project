import { createStore } from "vuex";

export default createStore({
  state: {
    tasks: [],
  },
  mutations: {
    addTasks(state, tasks) {
      state.tasks = tasks; // Заменяем весь массив на новый
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateStatusTask(state, task) {
      state.tasks.forEach((t) => {
        if (t.id == task.id) {
          t.status = task.status;
        }
      });
    },
  },
  actions: {
    async loadTasks(context) {
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      // console.log(data); // Логируем полученные данные
      context.commit("addTasks", data); // Передаем весь массив
    },
    async postTask(context, obj) {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: String(Math.floor(Math.random() * 1000)),
          title: obj.title,
          status: obj.status,
          deadline: obj.deadline,
          description: obj.description,
        }),
      });
      const data = await response.json();
      context.commit("addTask", data);
      return data;
    },
    async patchStatusTask({ commit }, { id, status }) {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
        }),
      });
      const updatedTask = await response.json();
      commit("updateStatusTask", updatedTask);
    },
  },
});
