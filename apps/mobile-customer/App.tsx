import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ConvexProvider, useQuery, useMutation, ConvexReactClient } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL || '');

function TodoList() {
  const todos = useQuery(api.todos.getTodos);
  const addTodo = useMutation(api.todos.addTodo);
  const updateTodo = useMutation(api.todos.updateTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const [newTodoText, setNewTodoText] = useState('');
  const [editingId, setEditingId] = useState<Id<'todos'> | null>(null);
  const [editingText, setEditingText] = useState('');

  const handleAddTodo = async () => {
    if (!newTodoText.trim()) return;
    try {
      await addTodo({ text: newTodoText.trim() });
      setNewTodoText('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add todo');
    }
  };

  const handleToggleComplete = async (todo: { _id: Id<'todos'>, text: string, completed: boolean }) => {
    try {
      await updateTodo({
        id: todo._id,
        text: todo.text,
        completed: !todo.completed,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to update todo');
    }
  };

  const handleDelete = async (id: Id<'todos'>) => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTodo({ id });
            } catch (error) {
              Alert.alert('Error', 'Failed to delete todo');
            }
          },
        },
      ]
    );
  };

  const startEdit = (todo: { _id: Id<'todos'>, text: string, completed: boolean }) => {
    setEditingId(todo._id);
    setEditingText(todo.text);
  };

  const handleSaveEdit = async (id: Id<'todos'>, completed: boolean) => {
    if (!editingText.trim()) {
      setEditingId(null);
      return;
    }
    try {
      await updateTodo({
        id,
        text: editingText.trim(),
        completed,
      });
      setEditingId(null);
      setEditingText('');
    } catch (error) {
      Alert.alert('Error', 'Failed to update todo');
    }
  };

  if (todos === undefined) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading todos...</Text>
      </View>
    );
  }

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Customer Mobile App</Text>
      <Text style={styles.subtitle}>Todo Manager</Text>

      {/* Add Todo Form */}
      <View style={styles.addForm}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo..."
          value={newTodoText}
          onChangeText={setNewTodoText}
          onSubmitEditing={handleAddTodo}
        />
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={handleAddTodo}
          disabled={!newTodoText.trim()}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ListEmpty = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.emptyText}>No todos yet. Add one above!</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        contentContainerStyle={todos.length === 0 ? styles.emptyListContainer : styles.listContainer}
        renderItem={({ item }) => (
              <View style={[styles.todoItem, item.completed && styles.todoCompleted]}>
                {editingId === item._id ? (
                  <View style={styles.editContainer}>
                    <TextInput
                      style={styles.editInput}
                      value={editingText}
                      onChangeText={setEditingText}
                      autoFocus
                    />
                    <TouchableOpacity
                      style={[styles.button, styles.saveButton]}
                      onPress={() => handleSaveEdit(item._id, item.completed)}
                    >
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.cancelButton]}
                      onPress={() => {
                        setEditingId(null);
                        setEditingText('');
                      }}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.todoContent}>
                    <TouchableOpacity
                      style={styles.checkbox}
                      onPress={() => handleToggleComplete(item)}
                    >
                      <Text style={styles.checkboxText}>
                        {item.completed ? '☑' : '☐'}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.todoText,
                        item.completed && styles.todoTextCompleted,
                      ]}
                    >
                      {item.text}
                    </Text>
                    <View style={styles.todoActions}>
                      <TouchableOpacity
                        style={[styles.button, styles.editButton]}
                        onPress={() => startEdit(item)}
                      >
                        <Text style={styles.buttonText}>✏️</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={() => handleDelete(item._id)}
                      >
                        <Text style={styles.buttonText}>🗑️</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            )}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <TodoList />
    </ConvexProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  emptyListContainer: {
    flex: 1,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#42b983',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  addForm: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  addButton: {
    backgroundColor: '#42b983',
  },
  saveButton: {
    backgroundColor: '#2196f3',
  },
  cancelButton: {
    backgroundColor: '#757575',
  },
  editButton: {
    backgroundColor: '#2196f3',
    padding: 8,
    minWidth: 40,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 8,
    minWidth: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  todoItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  todoCompleted: {
    opacity: 0.7,
    backgroundColor: '#f9f9f9',
  },
  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxText: {
    fontSize: 20,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  todoActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
