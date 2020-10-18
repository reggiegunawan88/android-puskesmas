import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kader_name: this.props.navigation.getParam('name', 'null'),
      id: this.props.navigation.getParam('id', 'null'),
    };
    this.sendIDTo_buat_laporan = this.sendIDTo_buat_laporan.bind(this);
    this.sendIDTo_lihat_laporan = this.sendIDTo_lihat_laporan.bind(this);
  }

  capitalize_name(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  sendIDTo_buat_laporan = () => {
    this.props.navigation.navigate('BuatLaporan', {id: this.state.id});
  };
  sendIDTo_lihat_laporan = () => {
    this.props.navigation.navigate('LihatLaporan', {
      id: this.state.id,
      nama_kader: this.state.kader_name,
    });
  };

  render() {
    const {navigate} = this.props.navigation;
    const kader_name = this.capitalize_name(this.state.kader_name);

    return (
      <View style={styles.container}>
        <View styles={styles.topBar}>
          <Text style={styles.welcomeTxt}>Halo, Bapak {kader_name}</Text>
          <Text style={styles.welcomeTxt}>Selamat bertugas!</Text>
        </View>

        <TouchableOpacity
          style={styles.btnLayout}
          onPress={this.sendIDTo_buat_laporan}>
          <Text style={styles.btnText}>BUAT LAPORAN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnLayout}
          onPress={this.sendIDTo_lihat_laporan}>
          <Text style={styles.btnText}>LIHAT LAPORAN</Text>
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
    fontSize: 20,
  },
  icon_btn: {
    height: 20,
    width: 20,
  },
});
