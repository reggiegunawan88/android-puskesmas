import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ListView,
} from 'react-native';

export default class daftarLaporan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrIdLaporan: ['1', '2', '3'],
      arrNamaLaporan: [],
      arrKeterangan: [],
      arrLatitude: [],
      arrLongtitude: [],
      arrLinkGambar: [],
      arrNamaJenis: [],
      arrJenisPenyakit: [],
      arrNamaPetugas: [],
      arrStatus: [],
      arrTanggal: [],
      arrTingkatBahaya: [],
    };
  }
  componentDidMount() {
    return fetch(
      'http://webistepuskesmas.000webhostapp.com/mysql-ci-restAPI/index.php/laporan',
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
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View>
        <Text>Halaman Daftar Laporan</Text>
        {/* <FlatList
          data={[
            {key: this.state.arrIdLaporan[0]},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        /> */}
      </View>
    );
  }
}
