import React, {Component} from 'react';
import RNRestart from 'react-native-restart';
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {update_kader_profile} from '../fetch_webservice';

export default class Pengaturan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.getParam('id', 'null'),
      username: '',
      password: '',

      // loading screen indicator
      spinner: false,
    };
  }

  loading_screen() {
    this.setState({
      spinner: !this.state.spinner,
    });
  }

  update_data = () => {
    console.log(this.state.id);
    if (this.state.username == '') {
      Alert.alert('Perhatian', 'Username belum diisi');
    } else if (this.state.password == '') {
      Alert.alert('Perhatian', 'Password belum diisi');
    } else {
      let post_body = {
        id: this.state.id,
        username: this.state.username,
        password: this.state.password,
      };

      //encode
      var formBody = [];
      for (var property in post_body) {
        var encodeKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(post_body[property]);
        formBody.push(encodeKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      this.loading_screen();
      update_kader_profile(formBody)
        .then(status_code => {
          if (status_code == 200) {
            Alert.alert(
              'Pemberitahuan',
              'Data kader berhasil diubah, silahkan login kembali',
            );
            this.setState({spinner: false});
            RNRestart.Restart();
          } else {
            this.setState({spinner: false});
            Alert.alert('Pemberitahuan', 'Data kader gagal diubah');
          }
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
          animation="slide"
          color="lightgreen"
          cancelable={true}
        />
        <Text style={styles.pageTitle}>PENGATURAN</Text>
        <Text>Anda dapat mengubah data diri dengan dibawah ini :</Text>
        <View style={{margin: 50, width: '100%', alignItems: 'center'}}>
          <Text style={styles.text_form}>Username :</Text>
          <TextInput
            style={styles.text_input}
            onChangeText={text => this.setState({username: text})}
          />
          <Text style={styles.text_form}>Password :</Text>
          <TextInput
            style={styles.text_input}
            secureTextEntry
            onChangeText={text => this.setState({password: text})}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.btn_update}
            title="Update Data"
            onPress={this.update_data}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>OK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_cancel} title="Cancel">
            <Text style={{color: 'white', fontWeight: 'bold'}}>BATAL</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textProps: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
  },
  topBar: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_input: {
    width: '50%',
    height: 'auto',
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
    borderRadius: 5,
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
  },
  text_form: {
    fontSize: 20,
    margin: 10,
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 30,
  },
  btn_update: {
    width: '30%',
    backgroundColor: 'green',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  btn_cancel: {
    width: '30%',
    backgroundColor: 'red',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
});
