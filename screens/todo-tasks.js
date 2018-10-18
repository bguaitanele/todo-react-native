import React, {Component} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import { readTaskFromFirebaseAsync } from '../src/services/firebase-api';
import {TaskListView} from "../src/components/components";

const imgCheckList = require('../assets/checklist.png');
const imgPlus = require('../assets/plus.png');



export default class TodoTasks extends Component {

    state = {
        tasks: []
    };

    static navigationOptions = {
        tabBarLabel: 'To Do',
        tabBarIcon: ({tintColor}) => (
            <Image source={imgCheckList} style={[styles.icon, {tintColor}]}/>
        )
    }

    render () {
        return (
            <View style={styles.container}>
                <TaskListView
                    tasks={this.state.tasks}
                    navigation={this.props.navigation}
                />
                <TouchableOpacity
                    style={styles.floatButton}
                    onPress={ () => this._gotoTask() }
                >
                    <Image source={imgPlus} style={styles.img} />
                </TouchableOpacity>
            </View>
        );
    }

    componentDidMount() {
        readTaskFromFirebaseAsync(this._fetchTasks.bind(this));
    }

    _fetchTasks(tasks) {
        const taskTodo = tasks.filter( t => !t.isDone );
        this.setState({tasks: taskTodo });
    }



    _gotoTask () {
        this.props.navigation.navigate('pageTask');
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10
    },

    icon: {
        width: 26,
        height: 26
    },

    img: {
        width: 50,
        height: 50
    },

    floatButton: {
        position: 'absolute',
        right: 20,
        bottom: 20
    }

});