import { useEffect, useState,useRef } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const useLoadPersistedObject = (key) => {
  const [persistedObject, setPersistedObject] = useState([]);

  const loadPersistedObject = async () => {

    try {
      const persistedObjectJSON = await AsyncStorage.getItem(key);
      setPersistedObject(JSON.parse(persistedObjectJSON))
    } catch (error) {
      console.error(
        `Error loading object from AsyncStorage (key: ${key}):`,
        error
      );
    }
  };
  const deleteObjectById = async (id) => {
    try {
      const updatedObject = persistedObject.filter((obj) => obj.id !== id);

      setPersistedObject(updatedObject);

      await AsyncStorage.setItem(key, JSON.stringify(updatedObject));
    } catch (error) {
      console.error(
        `Error deleting object from AsyncStorage (key: ${key}):`,
        error
      );
    }
  };

  useEffect(() => {
    loadPersistedObject();
  }, []);
  return {
    persistedObject,
    deleteObjectById,
  };
};

export default useLoadPersistedObject;
