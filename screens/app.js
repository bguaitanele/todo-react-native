import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {currentFirebaseUser} from "../src/services/firebase-api";

export default class App extends Component {

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.container} >
                <ActivityIndicator style={styles.loading}/>
            </View>
        )
    }

    async componentDidMount() {
        let resetNavigation = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'pageLogin'})]
        });

        try{
            const user = await currentFirebaseUser();
            console.log(user);
            if (user) {

                resetNavigation = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'pageTaskList'})]
                });
                // this.props.navigation.dispatch(resetNavigation);
            }
            this.props.navigation.dispatch(resetNavigation);
        }catch(error){
            this.props.navigation.dispatch(resetNavigation);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        width: 50,
        height: 50
    }
});


