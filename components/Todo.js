import React, {Component} from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput, TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import ControlTodo from "./ControlTodo"

const windowWidth = Dimensions.get('window').width;

export default class Todo extends Component {
    state = {
        newToDo: ""
    }
    render() {
        const {newToDo} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.column}>
                        <TextInput 
                            style={styles.input} 
                            placeholder={"메모를 적어보세요"} 
                            value={newToDo} 
                            onChangeText={this._controlNewToDo} 
                            placeholderTextColor={"#999"}
                            returnKeyType={"done"}
                            autoCorrect={false}
                        />
                        <TouchableOpacity style={styles.addButton}>
                            <Text style={styles.addText}>추가</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <ControlTodo/>
                    </ScrollView>
                </View>
            </View>
        );
    }

    _controlNewToDo = text => {
        this.setState({
            newToDo: text
        });
    };
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#00C6FB'
    },
    card: {
        marginTop: 40,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 40,
        backgroundColor: '#fffff9',
        flex: 1,
        width: windowWidth - 50,
    }, 
    input: {
        flex:1,
        padding: 20,
        borderBottomColor: "#bbb",
        borderBottomWidth: 1,
        fontSize: 18
    },
    column: {
        flexDirection: 'row'
    },
    addButton: {
        flex: 1,
        backgroundColor: '#ff005d',
        alignContent: 'center',
        justifyContent: 'center',
        width: 80
    },
    addText: {
        fontSize: 18,
        alignSelf: 'center',
        color: 'white'
    }
});