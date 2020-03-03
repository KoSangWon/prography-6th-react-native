import React from 'react';
import 'react-native-gesture-handler';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Todo from './components/Todo';
import Movie from './components/Movie';

const Stack = createStackNavigator()

const HomeScreen = ({navigation}) => (
  <LinearGradient colors={["#00C6FB", "#fff333"]} style={styles.container}>
    <View style={styles.home}>
      <StatusBar barStyle={"dark-content"}/>
      <TouchableOpacity style={styles.todoButton} onPress={() => navigation.navigate('ToDoList')}>
        <Text style={styles.todoText}>To Do List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.movieButton} onPress={() => navigation.navigate('Movie')}>
        <Text style={styles.movieText}>Movie</Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
)

const ToDoScreen = props => (
  <View style={styles.todo}>
    <Todo/>
  </View>
)

const MovieScreen = props => (
  <View style={styles.movie}>
    <Movie/>
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
  container:{
    flex: 1,
  },
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  todoButton:{
    width: 290,
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
    width: 290,
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
    alignItems: "center",
  },
  movie: {
    flex: 1,
  },
});

