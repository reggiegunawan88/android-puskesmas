import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Card, CardTitle} from 'react-native-material-cards';

export default class item_daftarLaporan extends Component {
  constructor(props) {
    super(props);
  }

  sendProps_To_detil_laporan = () => {
    this.props.navigation.navigate('DetilLaporan', {item: this.props.item});
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('DetilLaporan')}>
        <Card style={styles.card_style}>
          <CardTitle
            style={styles.title_text}
            title={this.props.item.nama_laporan}
          />
          <View style={styles.item}>
            <Text style={styles.title}>
              Nama Penyakit: {this.props.item.nama_jenis_penyakit}
            </Text>
            <Text style={styles.email}>
              Nama Petugas: {this.props.item.nama_petugas}
            </Text>
            <Text style={styles.email}>
              Tanggal Lapor: {this.props.item.tanggal}
            </Text>
            <Text style={styles.email}>
              Tingkat Bahaya: {this.props.item.tingkat_bahaya}
            </Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Image
                source={{
                  uri:
                    'https://upload.wikimedia.org/wikipedia/id/3/36/Naruto_Uzumaki.png',
                }}
                style={styles.img_laporan}
              />
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexWrap: 'wrap',
    padding: 5,
    margin: 5,
    fontSize: 20,
    height: 150,
  },
  img_laporan: {
    margin: 15,
    height: 70,
    width: 50,
    resizeMode: 'stretch',
    borderWidth: 1,
    borderColor: 'black',
  },
  card_style: {
    elevation: 5,
    borderRadius: 5,
    backgroundColor: '#31eb63',
    fontWeight: 'bold',
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
