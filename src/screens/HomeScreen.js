import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tasksState, usePersistedTasks } from '../state';
import Timer from '../components/Timer';
import TaskCard from '../components/TaskCard';

const HomeScreen = ({ navigation }) => {
  const tasks = useRecoilValue(tasksState) ?? [];
  const setTasks = useSetRecoilState(tasksState) ?? null;
  const persistTasks = usePersistedTasks();

  useEffect(() => {
    persistTasks(tasks);
  }, [tasks, persistTasks]);

  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const renderItem = ({ item }) => (
    <TaskCard
      task={item}
      onPress={() => handleToggleTask(item.id)}
      onDelete={() => handleDeleteTask(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <Timer />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('TaskCreation')}
      >
        <Text style={styles.addButtonText}>Create Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
