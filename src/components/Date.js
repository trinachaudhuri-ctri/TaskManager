import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Dates = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const intervalRef = useRef(null);

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(new Date());
    };

    updateCurrentTime();

    if (!intervalRef.current) {
      intervalRef.current = setInterval(updateCurrentTime, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const formatTime = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    return `${day}:${month}:${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(currentTime)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dates;
