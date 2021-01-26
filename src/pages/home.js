import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kader_name: this.props.navigation.getParam('name', 'null'),
      id: this.props.navigation.getParam('id', 'null'),
    };
    this.sendIDTo_buat_laporan = this.sendIDTo_buat_laporan.bind(this);
    this.sendIDTo_lihat_laporan = this.sendIDTo_lihat_laporan.bind(this);
    this.sendIDTo_pengaturan = this.sendIDTo_pengaturan.bind(this);
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

  sendIDTo_pengaturan = () => {
    this.props.navigation.navigate('Pengaturan', {
      id: this.state.id,
    });
  };

  render() {
    const {navigate} = this.props.navigation;
    const kader_name = this.capitalize_name(this.state.kader_name);

    const icon_buatLaporan = (
      <Ionicon
        name="paper-plane"
        size={25}
        style={styles.icon_style}
        color="#ffff"
      />
    );

    const icon_lihatLaporan = (
      <Ionicon
        name="newspaper"
        size={25}
        style={styles.icon_style}
        color="#ffff"
      />
    );

    const icon_setting = (
      <Ionicon
        name="settings"
        size={25}
        style={styles.icon_style}
        color="#ffff"
      />
    );

    const icon_user = (
      <FontAwesomeIcon
        name="user-circle-o"
        size={35}
        style={styles.user_icon}
        color="#000"
      />
    );

    return (
      <View style={styles.container}>
        <View styles={styles.topBar}>
          <Text style={styles.welcomeTxt}>Halo, Bapak {kader_name}</Text>
          <Text style={styles.welcomeTxt}>Selamat bertugas!</Text>
        </View>
        <View>{icon_user}</View>
        <TouchableOpacity
          style={styles.btnLayout}
          onPress={this.sendIDTo_buat_laporan}>
          {icon_buatLaporan}
          <Text style={styles.btnText}>BUAT LAPORAN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnLayout}
          onPress={this.sendIDTo_lihat_laporan}>
          {icon_lihatLaporan}
          <Text style={styles.btnText}>LIHAT LAPORAN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnLayout}
          onPress={this.sendIDTo_pengaturan}>
          {icon_setting}
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
    width: '100%',
  },
  btnLayout: {
    alignItems: 'center',
    backgroundColor: '#34d622',
    justifyContent: 'center',
    width: '70%',
    height: 150,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 5,
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
  icon_style: {
    margin: 5,
    padding: 5,
    height: '30%',
  },
  user_icon: {
    margin: 5,
    padding: 5,
    height: 50,
  },
});
