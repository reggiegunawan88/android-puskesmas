import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class Login extends Component {
  login() {
    var {dispatch, navigate} = this.props.navigation;
    const reset = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({routeName: 'StackOverTabs'})],
    });
    dispatch(reset);
  }
  render() {
    return (
      <View behavior="padding" style={styles.Wrapper}>
        <TextInput
          placeholder="email"
          underlineColorAndroid="white"
          placeholderTextColor="white"
          keyboardType="email-address"
          style={styles.inputField}
        />
        <TextInput
          placeholder="password"
          underlineColorAndroid="white"
          placeholderTextColor="white"
          secureTextEntry={true}
          style={styles.inputField}
        />
        <TouchableOpacity onPress={this.login.bind(this)}>
          <Text style={{color: 'white', marginTop: 10}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('signup')}>
          <Text style={{color: 'white', marginTop: 10}}>SignUp</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputField: {
    width: 280,
    color: 'white',
    borderColor: 'white',
    marginTop: 5,
  },
  Wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F3A93',
  },
  text: {
    color: 'blue',
    fontSize: 23,
  },
});
