import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {get_loginData} from './../server';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.img_logo}
          source={require('../assets/logo-puskesmas.png')}
        />
        <Text style={styles.text_logo}>e-Puskesmas</Text>
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
        <TouchableOpacity style={styles.loginBtn} onPress={this.submit_login}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }

  submit_login = () => {
    if (this.state.username == '') {
      Alert.alert('Perhatian', 'Tolong isi username anda');
    } else if (this.state.password == '') {
      Alert.alert('Perhatian', 'Tolong isi password anda');
    } else {
      const login_data =
        'username=' + this.state.username + '&password=' + this.state.password;
      get_loginData(login_data)
        .then(result => {
          if (result.status === 200) {
            Alert.alert('Selamat!', result.message);
            this.props.navigation.navigate('Home', {
              name: this.state.username,
              id: result.id,
            });
          } else {
            Alert.alert('Perhatian', result.message);
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
  text_logo: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 50,
    color: 'white',
    marginBottom: 50,
  },
  img_logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    margin: 10,
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
