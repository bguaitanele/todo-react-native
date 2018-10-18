import {createStackNavigator, createBottomTabNavigator,createMaterialTopTabNavigator} from "react-navigation";
import {Login,Register, TodoTasks, DoneTasks, App, Task, Sair} from '../../screens/screens';
import {Platform} from 'react-native';

const tabs = {
    pageTodoTasks: { screen: TodoTasks, title: 'To Do'},
    pageDoneTasks: { screen: DoneTasks, title: 'Done' },
};

const taskListTabNavigator = Platform.select({
    ios: createBottomTabNavigator(tabs),
    android: createMaterialTopTabNavigator(tabs)

});

export default Routes = createStackNavigator(
    {
        pageApp: {screen: App},
        pageLogin: {screen: Login},
        pageRegister: { screen: Register },
        pageTaskList: {
            screen: taskListTabNavigator,
            navigationOptions:{
                ...Platform.select({
                    ios: {
                        title: 'Task List'
                    },
                    android: {
                        header: null
                    }
                })
            }
        },
        pageTask: { screen: Task }
    }, {
        headerMode: 'screen'
    }
)

