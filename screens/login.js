import {
    Alert,
    Button,
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import React, {Component} from "react";
import {createUserOnFirebaseAsync, signInOnFirebaseAsync} from "../src/services/firebase-api";
import { StackActions, NavigationActions } from 'react-navigation';

const img = require('../assets/Saw.png');

export default class Login extends Component{

    state = {
      email: this.props.email,
      password: ''
    };

    static navigationOptions = {
        header: null
    };

    render() {
        return ( <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView style={styles.container} behavior='padding'>

                <View style={styles.topView}>
                    <Image source={img} style={styles.img}/>
                </View>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        value={this.props.email}
                        onChangeText={(text) => this.setState({email: text})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder='Senha'
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({password: text})}
                    />
                    <Button
                        title='Sign in'
                        style={styles.signIn}
                        onPress={() => this._signInAsync() }
                    ></Button>
                    <View style={styles.register}>
                        <Text>Not a member? Let's </Text>
                        <Text
                            style={styles.textRegister}
                            onPress={()=>{
                                const { navigate } = this.props.navigation;
                                navigate('pageRegister');
                            }} >Register</Text>
                    </View>

                </View>



            </KeyboardAvoidingView>
        </SafeAreaView> );
    }

    async _signInAsync() {
        try{
            const user = await signInOnFirebaseAsync(this.state.email, this.state.password);
            const resetNavigation = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'pageTaskList'})]
            });
            this.props.navigation.dispatch(resetNavigation);
            // this.props.navigation.replace('pageTaskList');


        } catch ( error ){
            Alert.alert('Login inváldio', error.message );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFF',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft:20,
        paddingRight: 20
    },
    topView:{
        padding:50,
        alignItems: 'center'
    },
    input: {
        marginBottom: 20,
    },
    img: {
        width: 100,
        height: 100,
    },
    register:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop:20
    },
    textRegister: {
        color: 'blue'

    }
});

