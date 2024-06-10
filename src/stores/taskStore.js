import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    addTask(title) {
      const newTask = {
        id: Date.now(),
        title,
        completed: false,
      };
      this.tasks.push(newTask);
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
    editTask(taskId, newTitle) {
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.title = newTitle;
      } 
    },
    toggleTaskCompletion(taskId) {
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  getters: {
    incompleteTasksCount(state) {
      return state.tasks.filter(task => !task.completed).length;
    },
  },
});