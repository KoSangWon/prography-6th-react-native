import React, {Component} from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native-gesture-handler";

const windowWidth = Dimensions.get('window').width;

export default class Todo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <TextInput style={styles.input} placeholder={"메모를 적어보세요"} />
                </View>
            </View>
        );
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
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        ...Platform.select({
            ios: {
                shadowColor: "rgb(30, 30, 30)",
                shadowOpacity: 0.6,
                shadowRadius: 6,
                shadowOffset: {
                    height: -1,
                    width: 0
                }
            },
            android: {
                elevation: 3
            }
        })
    }
});