<script setup lang="ts">
import { useConvexQuery, useConvexMutation } from 'convex-vue'
import { api } from '../../../convex/_generated/api'
import type { Id } from '../../../convex/_generated/dataModel'

const { data: todos, isPending } = useConvexQuery(api.todos.getTodos)
const { mutate: deleteTodo } = useConvexMutation(api.todos.deleteTodo)
const { mutate: updateTodo } = useConvexMutation(api.todos.updateTodo)

// Delete todo
const handleDelete = async (id: Id<'todos'>) => {
  if (confirm('Are you sure you want to delete this todo?')) {
    await deleteTodo({ id })
  }
}

// Toggle completion
const handleToggleComplete = async (todo: { _id: Id<'todos'>, text: string, completed: boolean }) => {
  await updateTodo({
    id: todo._id,
    text: todo.text,
    completed: !todo.completed
  })
}
</script>

<template>
  <div class="app">
    <div class="container">
      <header class="header">
        <h1>Admin Dashboard</h1>
        <p class="subtitle">Manage all todos</p>
      </header>

      <!-- Stats -->
      <div v-if="!isPending && todos" class="stats">
        <div class="stat-card">
          <div class="stat-value">{{ todos.length }}</div>
          <div class="stat-label">Total Todos</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ todos.filter(t => t.completed).length }}</div>
          <div class="stat-label">Completed</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ todos.filter(t => !t.completed).length }}</div>
          <div class="stat-label">Pending</div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isPending" class="loading">Loading todos...</div>

      <!-- Todos Table -->
      <div v-else-if="todos && todos.length > 0" class="todos-table">
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Text</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="todo in todos"
              :key="todo._id"
              :class="{ completed: todo.completed }"
            >
              <td>
                <input
                  type="checkbox"
                  :checked="todo.completed"
                  @change="handleToggleComplete(todo)"
                  class="todo-checkbox"
                />
              </td>
              <td>
                <span :class="{ 'text-completed': todo.completed }">
                  {{ todo.text }}
                </span>
              </td>
              <td>
                <button
                  @click="handleDelete(todo._id)"
                  class="btn btn-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <p>No todos found.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e0e0e0;
}

h1 {
  color: #1e3c72;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
}

.todos-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f5f5f5;
}

th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e0e0e0;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

tr:hover {
  background: #f9f9f9;
}

tr.completed {
  background: #f5f5f5;
  opacity: 0.7;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.text-completed {
  text-decoration: line-through;
  color: #999;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.btn-delete {
  background: #f44336;
  color: white;
}

.btn-delete:hover {
  background: #d32f2f;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #999;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .app {
    padding: 1rem;
  }

  .container {
    padding: 1.5rem;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  table {
    font-size: 0.9rem;
  }

  th,
  td {
    padding: 0.75rem 0.5rem;
  }
}
</style>
