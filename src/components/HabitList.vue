<template>
  <div class="habitlist-container">
    <div class="habitlist">
      <h1>Habit List</h1>
      <div class="habit-input-container">
        <input v-model="task" class="habit-input" placeholder="Add a habit..." />
        <button type="button" class="add-button" @click="addTask">Add Habit</button>
      </div>
      <ul class="habit-list">
        <li
          v-for="(taskItem, index) in tasks"
          :key="index"
          :class="{ completed: taskItem.completed, stopped: taskItem.stopped }"
        >
          <label for="text"></label>
          <input type="text" v-model="taskItem.text" @blur="saveTasks" class="text-input" />

          <div class="action-buttons">
            <label for="checkbox">Check to done</label>
            <input
              type="checkbox"
              v-model="taskItem.completed"
              @change="updateTask(index)"
              class="checkbox-input"
            />
            <button type="button" class="action-button" @click="removeTask(index)">Delete</button>
            <button
              type="button"
              class="action-button"
              @click="stopTask(index)"
              v-if="!taskItem.stopped"
            >
              Stop
            </button>
            <button
              type="button"
              class="action-button-res"
              @click="restoreTask(index)"
              v-if="taskItem.stopped"
            >
              Restore
            </button>
          </div>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      task: '',
      tasks: []
    };
  },
  methods: {
    addTask() {
      if (this.task.trim() === '') return;
      const newTask = {
        text: this.task,
        time: new Date().toLocaleString(),
        completed: false,
        stopped: false,
        completionHistory: []
      };
      this.tasks.push(newTask);
      this.task = '';
      this.saveTasks();
    },

    removeTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    updateTask(index) {
      if (this.tasks[index].completed) {
        const todayDateString = new Date().toLocaleDateString();
        if (!this.tasks[index].completionHistory.includes(todayDateString)) {
          this.tasks[index].completionHistory.push(todayDateString);
        }
      }
      this.tasks[index].time = new Date().toLocaleString();
      this.saveTasks();
    },

    stopTask(index) {
      this.tasks[index].stopped = true;
      this.saveTasks();
    },
    restoreTask(index) {
      this.tasks[index].stopped = false;
      this.saveTasks();
    }
  },
  created() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }
};
</script>

<style>
.habitlist-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.habitlist {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0.1px 2px 4px #0000001a;
}

.habit-input-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.habit-input {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.add-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.add-button:hover {
  background-color: #0056b3;
}

.habit-list {
  text-align: left;
}

.habit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.checkbox-input {
  width: 12px;
  height: 12px;
}

.text-input {
  flex-grow: 1;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 4px;
  padding: 9px;
}

.action-button {
  padding: 2px 4px;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.action-button-res {
  padding: 2px 4px;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  background-color: #0980ff;
}

.action-button:hover {
  border-color: #03172c;
  color: #007bff;
}

.action-button-res:hover {
  border-color: #03172c;
  background-color: #07b736;
}

.completed {
  text-decoration: line-through;
  color: #885151;
}
</style>
