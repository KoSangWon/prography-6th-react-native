import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from "react-native"

const { width, height } = Dimensions.get("window");

export default class ControlTodo extends React.Component{
    state = {
        isEditing: false,
        isCompleted: false
    }
    render(){
        const {isCompleted, isEditing} = this.state;
        const {text} = this.props;
        return(
                <View style={styles.column}>
                    <TouchableOpacity style={styles.container} onPress={this._toggleComplete}>
                        <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>{text}</Text>
                        <View style={styles.column}>
                            {isEditing ? (
                                <TouchableOpacity style={styles.completeContainer} onPressOut={this._finishEditing}><Text style={styles.completeText}>완료</Text></TouchableOpacity>
                            ) : (
                                <View style={styles.column}>
                                    <TouchableOpacity style={styles.editContainer} onPressOut={this._startEditing}><Text style={styles.editText}>수정</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles.deleteContainer}><Text style={styles.deleteText}>삭제</Text></TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
     
        );
    }

    _toggleComplete = () => {
        this.setState(
            prevState => {//이전 상태
                return {
                    isCompleted: !prevState.isCompleted//누를때마다 값 전환
                };
        });
    }

    _startEditing = () => {
        this.setState({
            isEditing: true
        });
    };

    _finishEditing = () => {
        this.setState({
            isEditing: false
        });
    };
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
        fontWeight: "600",
        fontSize: 18,
        marginVertical: 20,
        paddingLeft: 20
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
})