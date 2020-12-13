import React, {Component} from 'react';
import GoogleMap from './../components/google_map';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  Image,
} from 'react-native';

export default class DetilLaporan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.getParam('item', 'null'),
    };
  }

  render() {
    console.log(this.state.item);
    const base64img = 'data:image/png;base64,' + this.state.item.gambar;
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>DETAIL LAPORAN</Text>
        <View style={styles.form_area}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* for text label section */}
            <View style={{marginBottom: 20}}>
              <Text style={styles.text_form}>Nama Laporan:</Text>
              <TextInput
                style={styles.text_input}
                value={this.state.item.nama_laporan}
                editable={false}
              />
              <Text style={styles.text_form}>Nama Pasien:</Text>
              <TextInput
                style={styles.text_input}
                value={this.state.item.nama_pasien}
                editable={false}
              />
              <Text style={styles.text_form}>Jenis Penyakit:</Text>
              <TextInput
                style={styles.text_input}
                value={this.state.item.nama_jenis_penyakit}
                editable={false}
              />
              <Text style={styles.text_form}>Deskripsi Laporan: </Text>
              <TextInput
                style={styles.text_area}
                numberOfLines={10}
                multiline={true}
                value={this.state.item.deskripsi}
                editable={false}
              />
              <Text style={styles.text_form}>Status:</Text>
              <TextInput
                style={styles.text_input}
                value={this.state.item.nama_status}
                editable={false}
              />
              <Text style={styles.text_form}>Tanggal dan Waktu:</Text>
              <TextInput
                style={styles.text_input}
                value={this.state.item.tanggal}
                editable={false}
              />
            </View>

            {/* for image section */}
            <Text style={styles.text_form}>Gambar TKP :</Text>
            <View style={styles.img_wrapper}>
              <Image style={styles.img} source={{uri: base64img}} />
            </View>

            {/* for google map section */}
            <Text style={styles.text_form}>Lokasi :</Text>
            <View style={styles.map_wrapper}>
              <GoogleMap item={this.state.item} />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
  },
  text_form: {
    fontSize: 20,
    margin: 10,
  },
  form_area: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    fontSize: 15,
    margin: 10,
  },
  text_input: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
    borderRadius: 5,
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  text_area: {
    height: 150,
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
    borderRadius: 5,
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    justifyContent: 'flex-start',
  },
  map_wrapper: {
    height: 200,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 50,
  },
  img_wrapper: {
    width: '100%',
    height: 500,
    marginBottom: 50,
  },
  img: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});
