<template>
    <div class="task-list">
      <h2>Todo List</h2>
      <form @submit.prevent="addNewTask">
        <input v-model="newTask" placeholder="Add a new task" />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
          <input v-if="editingTaskId === task.id" v-model="editTaskTitle" @keyup.enter="updateTask(task.id)" />
          <span v-else @click="toggleTaskCompletion(task.id)">{{ task.title }}</span>
          <button v-if="editingTaskId === task.id" @click="updateTask(task.id)">Save</button>
          <button v-else @click="startEditingTask(task.id, task.title)">Edit</button>
          <button @click="removeTask(task.id)">Delete</button>
        </li>
      </ul>
      <p>Incomplete tasks: {{ incompleteTasksCount }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useTaskStore } from '../stores/taskStore';
  
  export default {
    setup() {
      const taskStore = useTaskStore();
      const newTask = ref('');
      const editingTaskId = ref(null);
      const editTaskTitle = ref('');
  
      const addNewTask = () => {
        if (newTask.value.trim() === '') return;
        taskStore.addTask(newTask.value);
        newTask.value = '';
      };
  
      const removeTask = (taskId) => {
        taskStore.deleteTask(taskId);
      };
  
      const toggleTaskCompletion = (taskId) => {
        taskStore.toggleTaskCompletion(taskId);
      };
  
      const startEditingTask = (taskId, currentTitle) => {
        editingTaskId.value = taskId;
        editTaskTitle.value = currentTitle;
      };
  
      const updateTask = (taskId) => {
        taskStore.editTask(taskId, editTaskTitle.value);
        editingTaskId.value = null;
        editTaskTitle.value = '';
      };
  
      return {
        newTask,
        tasks: taskStore.tasks,
        incompleteTasksCount: taskStore.incompleteTasksCount,
        addNewTask,
        removeTask,
        toggleTaskCompletion,
        editingTaskId,
        editTaskTitle,
        startEditingTask,
        updateTask,
      };
    },
  };
  </script>
  
  <style>
  .task-list {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .completed {
    text-decoration: line-through;
  }
  form {
    margin-bottom: 20px;
  }
  input {
    width: calc(100% - 22px);
    padding: 10px;
    margin-right: 2px;
  }
  button {
    padding: 10px;
    cursor: pointer;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  </style>