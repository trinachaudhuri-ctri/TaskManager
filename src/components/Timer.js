import React, { useState, useEffect } from 'react';
import { Text,StyleSheet } from 'react-native';

const Timer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = (date) =>
    `${padWithZero(date.getHours())}:${padWithZero(date.getMinutes())}:${padWithZero(date.getSeconds())}`;

  const padWithZero = (number) => (number < 10 ? `0${number}` : `${number}`);

  return (
    <Text style={styles.time}>
      {formattedTime(currentTime)}
    </Text>
  );
};

export default Timer;
const styles=StyleSheet.create({
  time: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
