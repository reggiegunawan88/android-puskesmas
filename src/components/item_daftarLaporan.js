import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default class item_daftarLaporan extends Component {
  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };
  render() {
    return (
      <TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.name}>Nama Laporan: {this.props.item.nama_laporan}</Text>
          <Text style={styles.name}>
            Nama Penyakit: {this.props.item.nama_jenis_penyakit}
          </Text>
          <Text style={styles.email}>Nama Petugas: {this.props.item.nama_petugas}</Text>
          <Text style={styles.email}>Tanggal Lapor: {this.props.item.tanggal}</Text>
          <Text style={styles.email}>
            Tingkat Bahaya: {this.props.item.tingkat_bahaya}
          </Text>
          <Image source={{uri: this.props.item.link_gambar}} style={styles.img_laporan} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    margin: 15,
    fontSize: 25,
    height: 150,
  },
  img_laporan: {
    margin: 10,
    height: 50,
    width: 50,
    resizeMode: 'stretch',
  },
});

