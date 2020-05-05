import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {get_daftarLaporan} from '../server';

export default class daftarLaporan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.getParam('id', 'null'),
      data_laporan: [],
    };
  }

  //langsung fetch data dari DB setelah load page
  componentDidMount() {
    get_daftarLaporan(this.state.id)
      .then(result => {
        this.setState({data_laporan: result});
        console.log(this.state.data_laporan);
      })
      .catch(error => {
        console.error(error);
      });
  }

  //tambah garis antar item di flatview
  FlatListItemSeparator = () => {
    return (
      <View style={{height: 1, width: '100%', backgroundColor: 'black'}} />
    );
  };

  //item per listview bisa diklik buat tampilin detil lebih lanjut nantinya
  GetItem(item) {
    //blm perlu skrng
    Alert.alert(item);
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.textProps}>Halaman Daftar Laporan</Text>
        <Text style={styles.textProps}>ID User: {this.state.id}</Text>
        <FlatList
          data={this.state.data_laporan}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.name}>
                Nama penyakit: {item.nama_jenis_penyakit}
              </Text>
              <Text style={styles.email}>
                Nama petugas: {item.nama_petugas}
              </Text>
              <Text style={styles.email}>Tanggal lapor: {item.tanggal}</Text>
              <Text style={styles.email}>
                Tingkat bahaya: {item.tingkat_bahaya}
              </Text>
              <Image
                source={{uri: item.link_gambar}}
                style={styles.img_laporan}
              />
            </View>
          )}
          keyExtractor={item => item.nama_jenis_penyakit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
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
  item: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    margin: 5,
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
