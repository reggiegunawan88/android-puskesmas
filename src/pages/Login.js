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
import {get_loginData} from '../fetch_webservice';
import LoadingScreen from './../components/loading_animation';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
    };
  }

  showLoading_handler() {
    this.setState({loading: !this.state.loading});
  }

  hideLoading_handler() {
    this.setState({loading: false});
  }

  render() {
    return (
      <View style={styles.container}>
        <LoadingScreen isLoading={this.state.loading} />
        <Image
          style={styles.img_logo}
          source={require('../assets/logo-puskesmas.png')}
        />
        <Text style={styles.text_logo}>e-Puskesmas</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username..."
            placeholderTextColor="#b7c9ba"
            onChangeText={text => this.setState({username: text})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#b7c9ba"
            onChangeText={text => this.setState({password: text})}
          />
        </View>
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

      this.showLoading_handler();

      get_loginData(login_data)
        .then(result => {
          if (result == null) {
            this.hideLoading_handler();
            Alert.alert(
              'Gagal',
              'Server bermasalah, mohon coba beberapa saat lagi',
            );
          } else if (result.status === 200) {
            this.hideLoading_handler();
            Alert.alert('Selamat!', result.message);
            this.props.navigation.navigate('Home', {
              name: this.state.username,
              id: result.id,
            });
          } else {
            this.hideLoading_handler();
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
    backgroundColor: '#b1ccb5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_logo: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 40,
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
    width: '70%',
    backgroundColor: '#43b538',
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
