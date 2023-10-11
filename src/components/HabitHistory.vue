<template>
  <div class="habit-history">
    <h1>Habit History</h1>
    <div v-if="!showUnmarkSection" class="view-options">
      <router-link id="link" to="/habithistory/calendar">
        <button type="button" id="link1" class="navigation-button">Navigate to date</button>
      </router-link>
      <button type="button" class="view-button" @click="changeView('week')">Week View</button>
    </div>
    <button type="button" class="unmark-button" @click="toggleUnmarkSection">
      Toggle to unmark
    </button>

    <div v-if="!showUnmarkSection">
      <div v-if="currentView === 'week'">
        <h2>Week View</h2>
        <div class="view" v-for="(tasks, week) in tasksByWeek" :key="week">
          <h3>Week {{ week }}</h3>
          <div v-for="task in tasks" :key="task.text">
            {{ task.text }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="showUnmarkSection">
      <div class="view" v-for="date in taskDates" :key="date">
        <h3>{{ date }}</h3>
        <div v-for="task in tasksByDate[date]" :key="task.text">
          <label for="checking"></label>
          <input
            type="checkbox"
            v-model="task.completed"
            @change="updateTaskCompletion(task, date)"
          />
          {{ task.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskHistory',
  data() {
    return {
      tasks: [],
      currentView: '',
      showUnmarkSection: false
    };
  },
  computed: {
    taskDates() {
      const dates = new Set();

      this.tasks.forEach(task => {
        task.completionHistory.forEach(completionDate => {
          const date = new Date(completionDate).toLocaleDateString();
          dates.add(date);
        });
      });
      return Array.from(dates);
    },

    tasksByDate() {
      const tasksByDate = {};

      this.tasks.forEach(task => {
        if (!task.stopped) {
          task.completionHistory.forEach(completionDate => {
            const date = new Date(completionDate).toLocaleDateString();

            if (!tasksByDate[date]) {
              tasksByDate[date] = [];
            }
            tasksByDate[date].push(task);
          });
        }
      });
      return tasksByDate;
    },
    tasksByWeek() {
      const tasksByWeek = {};

      this.tasks.forEach(task => {
        if (!task.stopped) {
          task.completionHistory.forEach(completionDate => {
            const date = new Date(completionDate).toLocaleDateString();
            const weekNumber = this.getWeekNumber(new Date(date));

            if (!tasksByWeek[weekNumber]) {
              tasksByWeek[weekNumber] = [];
            }
            tasksByWeek[weekNumber].push(task);
          });
        }
      });
      return tasksByWeek;
    }
  },
  methods: {
    changeView(view, date = null) {
      if (view === 'day' && date) {
        this.$router.push({ name: 'habithistory', params: { date } });
      } else {
        let routeName = '';
        if (view === 'week') {
          routeName = 'WeekView';
        }
        this.$router.push({ name: routeName });
        this.currentView = view;
      }
    },

    getWeekNumber(date) {
      const target = new Date(date.valueOf());
      const dayNr = (date.getDay() + 6) % 7;
      target.setDate(target.getDate() - dayNr + 3);
      const firstThursday = target.valueOf();
      target.setMonth(0, 1);
      if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
      }
      return 1 + Math.ceil((firstThursday - target) / 604800000);
    },
    updateTaskCompletion(task, date) {
      const foundTask = this.tasks.find(t => t.text === task.text);
      if (foundTask) {
        foundTask.completed = task.completed;

        const completionIndex = foundTask.completionHistory.indexOf(date);
        if (task.completed && completionIndex === -1) {
          foundTask.completionHistory.push(date);
        } else if (!task.completed && completionIndex !== -1) {
          foundTask.completionHistory.splice(completionIndex, 1);
        }
        this.saveTasks();
      }
    },
    toggleUnmarkSection() {
      this.showUnmarkSection = !this.showUnmarkSection;
      this.saveTasks();
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
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

<style scoped>
.habit-history {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 4px #0000001a;
  margin-top: 20px;
}

.view-options {
  margin-bottom: 10px;
}

.navigation-button{
  padding: 8px 12px;
  font-size: 13px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.view-button {
  padding: 8px 12px;
  font-size: 13px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.unmark-button {
  padding: 8px 12px;
  font-size: 13px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.view-button:hover {
  background-color: #0056b3;
}

.unmark-button:hover {
  background-color: #0056b3;
}

.view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px #0000001a;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
  }
}
</style>
