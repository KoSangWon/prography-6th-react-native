import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator()

const HomeScreen = ({navigation}) => (
  <View style={styles.home}>
    <StatusBar barStyle={"dark-content"}/>
    <TouchableOpacity style={styles.todoButton} onPress={() => navigation.navigate('ToDoList')}>
      <Text style={styles.todoText}>To Do List</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.movieButton} onPress={() => navigation.navigate('Movie')}>
      <Text style={styles.movieText}>Movie</Text>
    </TouchableOpacity>
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
  todoButton:{
    width: 280,
    height: 60,
    backgroundColor: "#ff005d",
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  todoText:{
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15
  },
  movieButton:{
    width: 280,
    height: 60,
    backgroundColor: "#ff005d",
    marginTop: 15,
    marginBottom: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30

  },
  movieText:{
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15
  },
  todo:{
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

