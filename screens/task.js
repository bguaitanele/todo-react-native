
import React, {Component} from 'react';
import {View, TextInput, Switch, Text, Button, StyleSheet} from 'react-native';
import {writeTaskOnFirebaseAsync} from "../src/services/firebase-api";
import { ColorPicker } from 'react-native-color-picker'
import tinycolor from 'tinycolor2';

export default class Task extends Component{

    static navigationOptions = {
        title: 'Task'
    };

    state = {
        key: '',
        title: '',
        resume: '',
        priority: true,
        isDone: false,
        color: '#FF0000'
    };

    constructor(props){
        super(props);

        try{
            const task = this.props.navigation.state.params.task;
            this.state = {
                key: task.key,
                title: task.title,
                resume: task.resume,
                priority: task.priority,
                isDone: task.isDone,
                color: task.color
            };
        } catch (error){

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Title'
                    value={this.state.title}
                    onChangeText={(value)=> this.setState({title: value})}
                />

                <TextInput
                    style={[styles.textInput, styles.multilineInput]}
                    placeholder='Resume'
                    multiline={true}
                    numberOfLines={4}
                    value={this.state.resume}
                    onChangeText={(value)=> this.setState({resume: value})}
                />

                <View style={styles.switchContainer}>
                    <Switch
                        value={this.state.priority}
                        onValueChange={(value)=> this.setState({priority: value})}
                    />
                    <Text style={styles.switchText}>High Priority</Text>
                </View>

                <View style={styles.switchContainer}>
                    <Switch
                        value={this.state.isDone}
                        onValueChange={(value)=> this.setState({isDone: value})}
                    />
                    <Text style={styles.switchText}>Is Done?</Text>
                </View>

                <View style={styles.colorContainer}>
                    <Text>Cor da tarefa</Text>
                    <ColorPicker
                        defaultColor={this.state.color}
                        onColorChange={color => this.setState({color: tinycolor(color).toHex() })}
                        style={{flex: 1}}
                        hideSliders={true}
                    />
                </View>

                <Button
                    style={styles.button}
                    title='Save'
                    onPress={() => this._saveTaskAsync()}
                />

            </View>
        );
    }

    async _saveTaskAsync() {
        var task = {
            key: this.state.key,
            title: this.state.title,
            resume: this.state.resume,
            priority: this.state.priority,
            isDone: this.state.isDone,
            color: `#${this.state.color}`

        };

        try{
            await writeTaskOnFirebaseAsync(task);
            this.props.navigation.goBack();
        }catch(err){
            Alert.alert('Error saving',error.message);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
    },
    textInput: {
        marginBottom: 20,
        padding: 5
    },
    multilineInput: {
        height: 100
    },
    colorContainer:{
        height: 200
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20
    },
    switchText: {
        marginLeft: 10,
        color: 'black',
        fontSize: 18
    }
});