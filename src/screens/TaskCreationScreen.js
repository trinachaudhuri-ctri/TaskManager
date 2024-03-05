import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { tasksState } from '../state';

const TaskCreationScreen = ({ navigation }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const setTasks = useSetRecoilState(tasksState);

  const handleSave = () => {
    if (taskTitle.trim() === '') {
      alert('Please enter a task title.');
      return;
    }

    const newTask = {
      id: new Date().getTime(), 
      title: taskTitle,
      description: taskDescription,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={taskTitle}
        onChangeText={(text) => setTaskTitle(text)}
      />

      <Text style={styles.label}>Task Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task description"
        value={taskDescription}
        onChangeText={(text) => setTaskDescription(text)}
        multiline
      />

      <Button title="Save" onPress={handleSave} />
    </View>
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

export default TaskCreationScreen;
