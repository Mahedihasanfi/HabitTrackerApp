<template>
  <div class="selected-date-container">
    <h3 class="title">Date: {{ $route.params.date }}</h3>
    <p class="subtitle">Tasks for this date:</p>

    <div v-if="tasksWithSelectedDate.length === 0" class="no-task-message">
      <div>No active task found!</div>
      <div>
        <router-link id="link" to="/habithistory/calendar">
          <button type="button" id="link1" class="navigation-button">
            Navigate to another date?
          </button>
        </router-link>
      </div>
    </div>

    <ul class="task-list">
      <li class="task-item" v-for="task in tasksWithSelectedDate" :key="task.text">
        <span class="task-text">{{ task.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { isSameDay } from 'date-fns';

export default {
  name: 'SelectedDate',
  computed: {
    tasksWithSelectedDate() {
      const selectedDate = this.$route.params.date;
      return this.getTasksWithSelectedDate(selectedDate);
    }
  },
  methods: {
    getTasksWithSelectedDate(selectedDate) {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      return tasks.filter(task => {
        return (
          task.completionHistory.some(historyDate => {
            const historyDateParts = historyDate.split('/');
            const historyYear = parseInt(historyDateParts[2], 10);
            const historyMonth = parseInt(historyDateParts[0], 10) - 1;
            const historyDay = parseInt(historyDateParts[1], 10);
            const parsedHistoryDate = new Date(historyYear, historyMonth, historyDay);
            return isSameDay(parsedHistoryDate, new Date(selectedDate));
          }) && !task.stopped
        );
      });
    }
  }
};
</script>

<style scoped>
.selected-date-container {
  max-width: 600px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 4px #0000001a;
  margin-top: 20px;
}

.title {
  font-size: 24px;
  color: #333;
}

.subtitle {
  font-size: 16px;
  color: #555;
  margin-top: 10px;
}

.no-task-message {
  font-size: 14px;
  color: #777;
  margin-top: 20px;
  text-align: center;
}

.task-list {
  list-style: none;
  margin-top: 20px;
  padding: 0;
}

.task-item {
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 1px 2px #0000001a;
}

.task-text {
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
}

.task-text::before {
  color: #007bff;
}
</style>
