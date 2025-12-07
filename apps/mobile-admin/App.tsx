import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ConvexProvider, useQuery, useMutation, ConvexReactClient } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL || '');

function AdminDashboard() {
  const todos = useQuery(api.todos.getTodos);
  const updateTodo = useMutation(api.todos.updateTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

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

  if (todos === undefined) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading todos...</Text>
      </View>
    );
  }

  const completedCount = todos.filter(t => t.completed).length;
  const pendingCount = todos.filter(t => !t.completed).length;

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Admin Mobile Dashboard</Text>
      <Text style={styles.subtitle}>Manage all todos</Text>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{todos.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{completedCount}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{pendingCount}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>
    </View>
  );

  const ListEmpty = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.emptyText}>No todos found.</Text>
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
                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => handleDelete(item._id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
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
      <AdminDashboard />
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
    color: '#1e3c72',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1e3c72',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
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
  button: {
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
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
