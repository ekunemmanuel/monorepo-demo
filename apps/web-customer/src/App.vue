<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useConvexQuery, useConvexMutation } from 'convex-vue'
import { api } from '../../../convex/_generated/api'
import type { Id } from '../../../convex/_generated/dataModel'

const { data: todos, isPending } = useConvexQuery(api.todos.getTodos)
const { mutate: addTodo, isPending: isAdding } = useConvexMutation(api.todos.addTodo)
const { mutate: updateTodo } = useConvexMutation(api.todos.updateTodo)
const { mutate: deleteTodo } = useConvexMutation(api.todos.deleteTodo)

// Form state
const newTodoText = ref('')
const editingId = ref<Id<'todos'> | null>(null)
const editingText = ref('')

// Add new todo
const handleAddTodo = async () => {
  if (!newTodoText.value.trim()) return
  await addTodo({ text: newTodoText.value.trim() })
  newTodoText.value = ''
}

// Toggle todo completion
const handleToggleComplete = async (todo: { _id: Id<'todos'>, text: string, completed: boolean }) => {
  await updateTodo({
    id: todo._id,
    text: todo.text,
    completed: !todo.completed
  })
}

// Start editing
const startEdit = (todo: { _id: Id<'todos'>, text: string, completed: boolean }) => {
  editingId.value = todo._id
  editingText.value = todo.text
}

// Cancel editing
const cancelEdit = () => {
  editingId.value = null
  editingText.value = ''
}

// Save edited todo
const handleSaveEdit = async (id: Id<'todos'>, completed: boolean) => {
  if (!editingText.value.trim()) {
    cancelEdit()
    return
  }
  await updateTodo({
    id,
    text: editingText.value.trim(),
    completed
  })
  cancelEdit()
}

// Delete todo
const handleDelete = async (id: Id<'todos'>) => {
  if (confirm('Are you sure you want to delete this todo?')) {
    await deleteTodo({ id })
  }
}
</script>

<template>
  <div class="app">
    <div class="container">
      <h1>Customer Web App - Todo Manager</h1>
      <p class="subtitle">Convex backend is connected!</p>

      <!-- Add Todo Form -->
      <div class="add-todo-form">
        <input
          v-model="newTodoText"
          type="text"
          placeholder="Add a new todo..."
          class="todo-input"
          @keyup.enter="handleAddTodo"
        />
        <button
          @click="handleAddTodo"
          :disabled="isAdding || !newTodoText.trim()"
          class="btn btn-primary"
        >
          {{ isAdding ? 'Adding...' : 'Add Todo' }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isPending" class="loading">Loading todos...</div>

      <!-- Todos List -->
      <template v-else-if="todos && todos.length > 0">
        <div class="todos-list">
          <div
            v-for="todo in todos"
            :key="todo._id"
            class="todo-item"
            :class="{ completed: todo.completed }"
          >
          <!-- Edit Mode -->
          <div v-if="editingId === todo._id" class="todo-edit">
            <input
              v-model="editingText"
              type="text"
              class="todo-input"
              @keyup.enter="handleSaveEdit(todo._id, todo.completed)"
              @keyup.esc="cancelEdit"
            />
            <button
              @click="handleSaveEdit(todo._id, todo.completed)"
              class="btn btn-save"
            >
              Save
            </button>
            <button
              @click="cancelEdit"
              class="btn btn-cancel"
            >
              Cancel
            </button>
          </div>

          <!-- View Mode -->
          <div v-else class="todo-view">
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="handleToggleComplete(todo)"
              class="todo-checkbox"
            />
            <span
              class="todo-text"
              :class="{ 'text-completed': todo.completed }"
            >
              {{ todo.text }}
            </span>
            <div class="todo-actions">
              <button
                @click="startEdit(todo)"
                class="btn btn-edit"
                title="Edit"
              >
                ✏️
              </button>
              <button
                @click="handleDelete(todo._id)"
                class="btn btn-delete"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
        </div>
      </template>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <p>No todos yet. Add one above to get started!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #42b983;
  margin-bottom: 0.5rem;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.add-todo-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.todo-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.todo-input:focus {
  outline: none;
  border-color: #42b983;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #42b983;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #35a372;
}

.btn-edit,
.btn-save {
  background: #2196f3;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn-edit:hover,
.btn-save:hover {
  background: #1976d2;
}

.btn-delete {
  background: #f44336;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn-delete:hover {
  background: #d32f2f;
}

.btn-cancel {
  background: #757575;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn-cancel:hover {
  background: #616161;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.todos-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.todo-item {
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.2s;
}

.todo-item:hover {
  border-color: #42b983;
  box-shadow: 0 2px 8px rgba(66, 185, 131, 0.1);
}

.todo-item.completed {
  background: #f5f5f5;
  opacity: 0.8;
}

.todo-view {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 1rem;
  word-break: break-word;
}

.text-completed {
  text-decoration: line-through;
  color: #999;
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
}

.todo-edit {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.todo-edit .todo-input {
  flex: 1;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #999;
}

.empty-state p {
  font-size: 1.1rem;
}

@media (max-width: 640px) {
  .app {
    padding: 1rem;
  }

  .container {
    padding: 1.5rem;
  }

  .add-todo-form {
    flex-direction: column;
  }

  .todo-view {
    flex-wrap: wrap;
  }

  .todo-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
