import React, {Component} from "react";
import { View, Text, StyleSheet, Dimensions, AsyncStorage } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput, TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { AppLoading } from "expo"
import ControlTodo from "./ControlTodo"
import uuidv1 from "uuid/v1"

const windowWidth = Dimensions.get('window').width;

export default class Todo extends Component {
    state = {
        newToDo: "",
        loadedToDos: false,
        toDos: {}
    };
    componentDidMount = () => {
        this._loadToDos();
    }
    
    render() {
        const {newToDo, loadedToDos, toDos} = this.state;
        console.log(toDos);
        if(!loadedToDos){
            return <AppLoading/>
        }
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
                            onSubmitEditing={this._addToDo}
                        />
                        <TouchableOpacity style={styles.addButton} onPressOut={this._addToDo}>
                            <Text style={styles.addText}>추가</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={styles.toDos}>
                        {Object.values(toDos)
                        .sort((a, b) => {
                            const dateA = a.createdAt;
                            const dateB = b.createdAt;
                            return dateB - dateA;
                        })
                        .map(toDo => <ControlTodo key={toDo.id} {...toDo} uncompleteToDo={this._uncompleteToDo} completeToDo={this._completeToDo} deleteToDo={this._deleteToDo} updateToDo={this._updateToDo}/>)}
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

    _loadToDos = async () => {
        try{
            const toDos = await AsyncStorage.getItem("toDos");
            const parsedToDos = JSON.parse(toDos);
            console.log(toDos);
            this.setState({
                loadedToDos: true,
                toDos: parsedToDos
            });
        } catch(err){
            console.log(err);
        }
    };

    _addToDo = () => {
        const {newToDo} = this.state;
        if(newToDo !== ""){
            this.setState(prevState => {
                const ID = uuidv1();
                const newToDoObject = {
                    [ID]: {
                        id: ID,
                        isCompleted: false,
                        text: newToDo,
                        createdAt: Date.now()
                    }
                };
                const newState = {
                    ...prevState,
                    newToDo: "",
                    toDos: {
                        ...prevState.toDos,
                        ...newToDoObject
                    }
                }
                this._saveToDos(newState.toDos);
                return {...newState};
            })
        }
    };

    _deleteToDo = (id) => {
        this.setState(prevState => {
            const toDos = prevState.toDos;
            delete toDos[id];
            const newState = {
                ...prevState,
                ...toDos
            };
            this._saveToDos(newState.toDos);
            return {...newState};
        });
    };

    _uncompleteToDo = id => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                toDos: {
                    ...prevState.toDos,
                    [id]: {
                        ...prevState.toDos[id],
                        isCompleted: false
                    }
                }
            }
            this._saveToDos(newState.toDos);
            return {...newState};
        });
    };

    _completeToDo = id => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                toDos: {
                    ...prevState.toDos,
                    [id]: {
                        ...prevState.toDos[id],
                        isCompleted: true
                    }
                }
            }
            this._saveToDos(newState.toDos);
            return {...newState};
        });
    }

    _updateToDo = (id, text) => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                toDos: {
                    ...prevState.toDos,
                    [id]: {
                        ...prevState.toDos[id],
                        text: text
                    }
                }
            };
            this._saveToDos(newState.toDos);
            return {...newState};
        });
    }

    _saveToDos = newToDos => {
        //console.log(JSON.stringify(newToDos));
        const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));//(key, value)
    }
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
    },
    toDos: {
        alignItems: 'center'
    }
});