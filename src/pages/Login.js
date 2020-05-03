import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  // _loadInitialState = async () => {
  //   var value = await AsyncStorage.getItem('user');
  //   if (value !== null) {
  //     alert('Anda sudah login');
  //   }
  // };

  // componentDidMount() {
  //   this._loadInitialState().done();
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>e-Puskesmas</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({username: text})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password: text})}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Lupa password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.login}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }

  login = () => {
    if (this.state.username == '') {
      Alert.alert('Perhatian', 'Tolong isi username anda');
    } else if (this.state.password == '') {
      Alert.alert('Perhatian', 'Tolong isi password anda');
    } else {
      const reqBody =
        '?username=' + this.state.username + '&password=' + this.state.password;
      return fetch(
        'http://webistepuskesmas.000webhostapp.com/mysql-ci-restAPI/index.php/login' +
          reqBody,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json, text/plain, */*', // It can be used to overcome cors errors
            'Content-Type': 'application/json',
          },
          body: '',
        },
      )
        .then(response => response.json())
        .then(data => {
          if (data.status === 200) {
            Alert.alert('Selamat!', data.message);
            this.props.navigation.navigate('Home', {
              name: this.state.username,
              id: data.id,
            });
          } else {
            Alert.alert('Perhatian', data.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#44c503',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 50,
    color: 'white',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  forgot: {
    color: 'white',
    fontSize: 15,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
