<template>
  <div class="calendar-container">
    <h3 class="title">Date selection</h3>
    <vue3-datepicker class="select" v-model="selectedDate" @update:model-value="onDateSelected" />
    <p class="info">*No tasks for future</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Vue3Datepicker from 'vue3-datepicker';

export default {
  name: 'CalendarView',
  components: {
    Vue3Datepicker
  },
  setup() {
    const selectedDate = ref(new Date());
    const router = useRouter();

    const onDateSelected = () => {
      const localDate = new Date(selectedDate.value);
      const year = localDate.getFullYear();
      const month = localDate.getMonth() + 1;
      const day = localDate.getDate();
      const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`;
      router.push(`/habithistory/${formattedDate}`);
    };

    return {
      selectedDate,
      onDateSelected
    };
  }
};
</script>

<style scoped>
.calendar-container {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 10vh;
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 6px;
  overflow-wrap: break-word;
}

.title {
  font-size: 24px;
  margin-bottom: 1rem;
  color: #333;
}

.info {
  font-size: 14px;
  color: #777;
  margin-top: 1rem;
}
</style>
