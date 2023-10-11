import { createRouter, createWebHistory } from 'vue-router';

import habithistory from '../components/HabitHistory.vue';
import habits from '../components/HabitList.vue';
import Calendar from '../components/Calendar.vue';
import SelectedDate from '../components/SelectedDate.vue';
import home from '../views/home.vue';

const routes = [
  { path: '/', component: home },
  { path: '/habithistory/', name: 'habithistory', component: habithistory },
  { path: '/habits', name: 'habits', component: habits },
  { path: '/habithistory/calendar', component: Calendar },
  { path: '/habithistory/:date', component: SelectedDate },
  { path: '/habithistory/date', name: 'DayView', component: habithistory },
  { path: '/habithistory/week', name: 'WeekView', component: habithistory },
  { path: '/habithistory/month', name: 'MonthView', component: habithistory }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
