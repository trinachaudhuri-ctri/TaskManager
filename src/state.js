import { atom, selector } from 'recoil';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

import { AsyncStorage } from '@react-native-async-storage/async-storage';

export const taskIdsState = atom({
  key: 'taskIdsState',
  default: [],
});

export const tasksState = atom({
  key: 'tasksState',
  default: [],
});

export const tasksSelector = selector({
  key: 'tasksSelector',
  get: ({ get }) => {
    const taskIds = get(taskIdsState);
    const tasks = get(tasksState);

    return taskIds.map((taskId) => tasks.find((task) => task.id === taskId)).filter(Boolean);
  },
});

export const usePersistedTasks = () => {
  const [taskIds, setTaskIds] = useRecoilState(taskIdsState);
  const [tasks, setTasks] = useRecoilState(tasksState);

  useEffect(() => {
    persistTasksToAsyncStorage(tasks);
  }, [tasks]);

  const persistTasksToAsyncStorage = async (tasksToPersist) => {
    try {
      const newTaskIds = tasksToPersist.map((task) => task.id.toString());
      
      // Update task IDs atom
      setTaskIds((prevTaskIds) => [...new Set([...prevTaskIds, ...newTaskIds])]);

      // Update tasks atom
      setTasks(tasksToPersist);

      // Asynchronously persist tasks to AsyncStorage
      tasksToPersist.forEach(async (task) => {
        await AsyncStorage.setItem(task.id.toString(), JSON.stringify(task));
      });
    } catch (error) {
      console.error('Error persisting tasks:', error);
    }
  };

  const persistTasks = (newTasks) => {
    setTasks(newTasks);
  };

  return persistTasks;
};
