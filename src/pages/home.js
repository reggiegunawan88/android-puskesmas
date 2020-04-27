import React, {Component} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

export default class Home extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View styles={styles.topBar}>
          <Text style={styles.welcomeTxt}>Halo, Kader '...'</Text>
          <Text style={styles.welcomeTxt}>Selamat bertugas!</Text>
        </View>

        <TouchableOpacity
          style={styles.btnLayout}
          onPress={() => navigate('Laporan')}>
          <Text style={styles.btnText}>LAPORAN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnLayout}
          onPress={() => navigate('daftarLaporan')}>
          <Text style={styles.btnText}>DAFTAR LAPORAN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnLayout}
          onPress={() => navigate('Pengaturan')}>
          <Text style={styles.btnText}>PENGATURAN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#34d622',
    width: '80%',
  },
  btnLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34d622',
    justifyContent: 'center',
    width: '70%',
    height: 150,
    paddingLeft: 8,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
  },
  buttonHome: {
    width: '70%',
    backgroundColor: '#34d622',
    borderRadius: 10,
    height: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  insideBtn: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnText: {
    height: '20%',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  welcomeTxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
