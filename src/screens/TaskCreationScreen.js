import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useSetRecoilState } from "recoil";
import { tasksState } from "../state";

const TaskCreationScreen = ({ navigation }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const setTasks = useSetRecoilState(tasksState);

  const handleSave = () => {
    if (taskTitle.trim() === "") {
      alert("Please enter a task title.");
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
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* <Text style={styles.label}>Title</Text> */}
        <View style={styles.textarea}>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={taskTitle}
          onChangeText={(text) => setTaskTitle(text)}
        />

        {/* <Text style={styles.label}>Description</Text> */}
        <TextInput
          style={styles.input}
          placeholder="Enter task description"
          value={taskDescription}
          onChangeText={(text) => setTaskDescription(text)}
          multiline
        />
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F4C2C2",
    padding:20
  },
  textarea:{
    padding:50,
    backgroundColor:'#fff',
    justifyContent:"center",
    borderRadius:10,
    elevation:8,
    zIndex:8
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskCreationScreen;
