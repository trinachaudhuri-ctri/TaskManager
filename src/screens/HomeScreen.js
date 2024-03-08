import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TaskCard from "../components/TaskCard";
import Timer from "../components/Timer";
import useLoadPersistedObject from "../state";

const HomeScreen = ({ navigation }) => {
  const { persistedObject, deleteObjectById } =
    useLoadPersistedObject("persistedObjects");
  const handleDeleteTask = (taskId) => {
    deleteObjectById(taskId);
  };

  const renderItem = ({ item }) => {
    if (item.id === -1) {
      return null;
    }
    return (
      <TaskCard
        task={item}
        onDelete={() => handleDeleteTask(item.id)}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Timer />

        <FlatList
          data={persistedObject}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate("TaskCreation");
          }}
        >
          <Text style={styles.addButtonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4C2C2",
  },
  addButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
