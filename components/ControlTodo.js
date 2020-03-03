import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from "react-native";
import propTypes from "prop-types";

const { width } = Dimensions.get("window");

export default class ControlTodo extends React.Component{
    constructor(props){
        super(props);
        this.state = { isEditing: false, toDoValue: props.text }
    }
    static propTypes = {
        text: propTypes.string.isRequired,
        isCompleted: propTypes.bool.isRequired,
        deleteToDo: propTypes.func.isRequired,
        id: propTypes.string.isRequired,
        uncompleteToDo: propTypes.func.isRequired,
        completeToDo: propTypes.func.isRequired,
        updateToDo: propTypes.func.isRequired
    }
    
    render(){
        const {isEditing, toDoValue} = this.state;
        const {text, id, deleteToDo, isCompleted} = this.props;
        return(
                <View style={styles.column}>
                    <TouchableOpacity style={styles.container} onPress={this._toggleComplete}>
                        {isEditing ? (
                            <TextInput style={[styles.atext, styles.input, isCompleted ? styles.completedText : styles.uncompletedText]} value={toDoValue} multiline={true} onChangeText={this._controlInput} returnKeyType={"done"} onBlur={this._finishEditing}/>
                        ) : (
                            <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>{text}</Text>
                        )}
                        <View style={styles.column}>
                            {isEditing ? (
                                <TouchableOpacity style={styles.completeContainer} onPressOut={this._finishEditing}><Text style={styles.completeText}>완료</Text></TouchableOpacity>
                            ) : (
                                <View style={styles.column}>
                                    <TouchableOpacity style={styles.editContainer} onPressOut={this._startEditing}><Text style={styles.editText}>수정</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles.deleteContainer} onPressOut={() => deleteToDo(id)}><Text style={styles.deleteText}>삭제</Text></TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
        );
    }

    _toggleComplete = () => {
        const {isCompleted, uncompleteToDo, completeToDo, id} = this.props;
        if(isCompleted){
            uncompleteToDo(id)
        } else {
            completeToDo(id)
        }
    }

    _startEditing = () => {
        this.setState({
            isEditing: true
        });
    };

    _finishEditing = () => {
        const {toDoValue} = this.state;
        const {id, updateToDo} = this.props;
        updateToDo(id, toDoValue);
        this.setState({
            isEditing: false
        });
    };

    _controlInput = text => {
        this.setState({toDoValue : text})
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: 0.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fcb8d1"
    },
    text: {
        fontWeight: "500",
        fontSize: 18,
        marginVertical: 20,
        paddingLeft: 20
    },
    atext:{
        fontWeight: "700",
        color: "#333333",
        fontSize: 22,
        marginVertical: 20,
        paddingLeft: 20,
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through",
        textDecorationColor: "#000000",
    },
    uncompletedText: {
        color: "#333333"
    },
    column:{
        flexDirection: "row",
        height: 60
    },
    completeText: {
        fontWeight: "600",
        fontSize: 18,
        marginVertical: 20,
        paddingRight: 15,
        paddingLeft: 20,
        color: "#333333"
    },
    editText: {
        fontWeight: "600",
        fontSize: 18,
        marginVertical: 20,
        paddingRight: 15,
        paddingLeft: 15,
        color: "#0091ff"
    },
    deleteText: {
        fontWeight: "600",
        fontSize: 18,
        marginVertical: 20,
        paddingLeft: 15,
        paddingRight: 20,
        color: "red"
    },
    input: {
        marginVertical: 15,
        width: width / 2,
        paddingBottom: 5
    }
})