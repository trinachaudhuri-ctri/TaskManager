import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

const TaskCard = ({ task,  onDelete }) => {
  const [fadeAnim] = useState(new Animated.Value(1));
  const [checked,isChecked]=useState(false)

  const handlePress = () => {
    isChecked(!checked)
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Animated.View style={{ ...styles.cardContent, opacity: fadeAnim }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>
          <View>
            <Text style={styles.status}>
              {checked ? (
                <Icon
                  name="checkbox"
                  color={"green"}
                  size={30}
                />
              ) : (
                <Icon name="checkbox-outline" size={30}/>
              )}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor:"white",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 1,
    borderRadius: 20,
    padding: 16,
    margin: 8,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
  status: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TaskCard;
