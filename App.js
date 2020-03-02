import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator()

const HomeScreen = ({navigation}) => (
  <View style={styles.home}>
    <StatusBar barStyle={"dark-content"}/>
    <Button 
      title="To Do List"
      onPress={() => navigation.navigate('ToDoList')}
    />
    <Button 
      title="Movie"
      onPress={() => navigation.navigate('Movie')}
    />
  </View>
)

const ToDoScreen = props => (
  <View style={styles.todo}>
    <Text>todo화면</Text>
  </View>
)

const MovieScreen = props => (
  <View style={styles.movie}>
    <Text>movie화면</Text>
  </View>
)

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Movie" component={MovieScreen}/>
        <Stack.Screen name="ToDoList" component={ToDoScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  movie: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

