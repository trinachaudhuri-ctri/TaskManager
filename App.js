import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RecoilRoot } from 'recoil';
import HomeScreen from './src/screens/HomeScreen';
import TaskCreationScreen from './src/screens/TaskCreationScreen';
import TaskEditingScreen from './src/screens/TaskEditingScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <RecoilRoot>
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="TaskCreation" component={TaskCreationScreen} options={{headerShown:false}}/>
        <Stack.Screen name="TaskEditing" component={TaskEditingScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
