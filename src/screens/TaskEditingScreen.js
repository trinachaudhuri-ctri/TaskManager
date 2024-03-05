import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import { useRecoilState } from 'recoil';
import { tasksState } from '../state';

const TaskEditingScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [editedTask, setEditedTask] = useState({});

  useEffect(() => {
    const selectedTask = tasks.find((t) => t.id === taskId);
    setEditedTask(selectedTask);
  }, [taskId, tasks]);

  const handleSave = () => {
    if (editedTask.title.trim() === '') {
      alert('Please enter a task title.');
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, ...editedTask } : t))
    );

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={editedTask.title}
        onChangeText={(text) => setEditedTask((prev) => ({ ...prev, title: text }))}
      />

      <Text style={styles.label}>Task Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task description"
        value={editedTask.description}
        onChangeText={(text) => setEditedTask((prev) => ({ ...prev, description: text }))}
        multiline
      />

      <Button title="Save" onPress={handleSave} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default TaskEditingScreen;
