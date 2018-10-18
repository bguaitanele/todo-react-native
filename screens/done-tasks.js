import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TaskListView} from "../src/components/components";
import { readTaskFromFirebaseAsync } from '../src/services/firebase-api';

const imgCheckList = require('../assets/checklist.png');

export default class DoneTasks extends Component {

    state = {
        tasks: []
    };

    static navigationOptions = {
        tabBarLabel: 'Done',
        tabBarIcon: ({tintColor}) => (
            <Image source={imgCheckList} style={[styles.icon, {tintColor}]}/>
        )
    }

    render () {
        return (
            <View style={styles.container} >
                <TaskListView
                    tasks={this.state.tasks}
                    navigation={this.props.navigation}
                />
            </View>
        );
    }

    componentDidMount() {
        readTaskFromFirebaseAsync(this._fetchTasks.bind(this));
    }

    _fetchTasks(tasks) {
        const taskTodo = tasks.filter( t => t.isDone );
        this.setState({tasks: taskTodo });
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
    }
});