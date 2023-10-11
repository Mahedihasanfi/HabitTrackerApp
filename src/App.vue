<template>
  <div class="app-container background-image">
    <div class="center-container">
      <h1>Habit Tracker</h1>
      <div class="button-container">
        <router-link class="nav-link" to="/habithistory/">
          <button class="nav-button days-button" type="button">Habits History</button>
        </router-link>
        <router-link class="nav-link" to="/habits">
          <button class="nav-button todolist-button" type="button">Habits List</button>
        </router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<style>
.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: auto;
}

.app-container {
  text-align: center;
  background-color: transparent;
}

.background-image {
  background-image: url('/src/assets/pexels.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  margin: 0;
  color: #490303;
  font-size: 24px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
}

.nav-link {
  padding: 5px;
}

.nav-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.days-button {
  background-color: #06c519;
  color: white;
}

.days-button:hover {
  background-color: #05ab15;
}

.todolist-button {
  background-color: #c5c206;
  color: white;
}

.todolist-button:hover {
  background-color: #b3a705;
}
</style>
