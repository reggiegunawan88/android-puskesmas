import React, {Component} from 'react';
import ImageUpload from '../components/image_picker';
navigator.geolocation = require('@react-native-community/geolocation'); //important!
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {send_laporanData} from '../fetch_webservice';
import {get_jenisPenyakit} from '../fetch_webservice';
import ModalDropdown from 'react-native-modal-dropdown';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export default class Laporan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.navigation.getParam('id', 'null'),
      nama_laporan: '',
      nama_pasien: '',
      deskripsi: '',
      jenis_penyakit: '',
      gambar: 1,
      dropdown_data: [],
      ready: false,
      where: {lat: 0, lng: 0},
      error: null,
      refreshScreen: Date(Date.now()).toString(),
    };
    this.get_location = this.get_location.bind(this);
    this.send_dataLaporan = this.send_dataLaporan.bind(this);
  }

  componentDidMount() {
    this.fetch_jenisPenyakit();
  }

  //fungsi utk mengambil data jenis penyakit dari webservice
  fetch_jenisPenyakit() {
    get_jenisPenyakit().then(result => {
      this.setState({dropdown_data: result});
    });
  }

  //fungsi untuk mengambil posisi koordinat dari GPS
  geoSuccess = position => {
    this.setState({
      ready: true,
      where: {lat: position.coords.latitude, lng: position.coords.longitude},
    });
    this.setState({ready: true});
  };

  //fungsi utk menampilkan pesan jika terjadi error
  geoFailure = err => {
    this.setState({error: err.message});
  };

  //fungsi utk mengambil posisi dari GPS
  get_location() {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24,
    };
    this.setState({ready: false, error: null});
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      this.geoOptions,
    );
  }

  //render per baris item di dropdown
  _renderRow(rowData, rowID, highlighted) {
    return (
      <View
        style={{
          width: 'auto',
          backgroundColor: 'lightgreen',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 15, margin: 5}}>
          {`${rowData.nama_jenis_penyakit}`}
        </Text>
      </View>
    );
  }

  _renderButtonText(rowData) {
    this.state.dropdown_data = rowData;
    return `${rowData.nama_jenis_penyakit}`;
  }

  //fungsi untuk mengambil value ID dari dropdown jenis penyakit
  get_dropdown_ID(value) {
    var x = parseInt(value) + 1;
    this.state.jenis_penyakit = x;
  }

  //fungsi untuk reset page ketika selesai mengirim laporan
  reloadPage = () => {
    this.componentDidMount();
  };

  render() {
    let myMap;
    return (
      <View style={styles.container}>
        <Text style={styles.textProps}>BUAT LAPORAN</Text>
        <View style={styles.form_area}>
          <ScrollView>
            <Text style={styles.text_form}>Nama Laporan: </Text>
            <TextInput
              style={styles.text_input}
              onChangeText={text => this.setState({nama_laporan: text})}
              placeholder="Ketik disini"
            />
            <Text style={styles.text_form}>Nama Pasien: </Text>
            <TextInput
              style={styles.text_input}
              onChangeText={text => this.setState({nama_pasien: text})}
              placeholder="Ketik disini"
            />
            <Text style={styles.text_form}>Deskripsi Laporan: </Text>
            <TextInput
              style={styles.text_area}
              onChangeText={text => this.setState({deskripsi: text})}
              placeholder="Ketik disini"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
            />
            <Text style={styles.text_form}>Jenis Penyakit: </Text>
            <View style={{alignItems: 'center'}}>
              <ModalDropdown
                style={styles.dropdown}
                enableEmptySections
                textStyle={{fontSize: 15, paddingTop: 8, paddingBottom: 8}}
                defaultValue="Silahkan pilih..."
                dropdownStyle={{
                  width: '30%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                dropdownTextStyle={{fontSize: 15}}
                dropdownTextHighlightStyle={{color: 'blue'}}
                options={this.state.dropdown_data}
                renderButtonText={rowData => this._renderButtonText(rowData)}
                renderRow={this._renderRow.bind(this)}
                onSelect={value => this.get_dropdown_ID(value)}
              />
            </View>
            <Text style={styles.text_form}>Tambahkan Gambar</Text>
            <ImageUpload />
            <Text style={styles.text_form}>Tambahkan lokasi: </Text>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.btn_gps}
                title="Fetch GPS"
                onPress={this.get_location}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>GPS</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.text_form}>
              Latitude: {this.state.where.lat}
            </Text>
            <Text style={styles.text_form}>
              Longitude: {this.state.where.lng}
            </Text>
            <View style={{alignItems: 'center'}}>
              <MapView
                ref={ref => (myMap = ref)}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                showsUserLocation
                loadingEnabled
                style={styles.map}
                region={{
                  latitude: this.state.where.lat,
                  longitude: this.state.where.lng,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}>
                <Marker
                  coordinate={{
                    latitude: this.state.where.lat,
                    longitude: this.state.where.lng,
                  }}
                  title={''}
                  description={''}
                  onPress={() => {
                    myMap.fitToCoordinates(
                      [
                        {
                          latitude: this.state.where.lat,
                          longitude: this.state.where.lng,
                        },
                      ],
                      {
                        animated: true,
                        edgePadding: {top: 10, bottom: 10, left: 10, right: 10},
                      },
                    );
                  }}
                />
                <MapView.Circle
                  center={{
                    latitude: this.state.where.lat,
                    longitude: this.state.where.lng,
                  }}
                  radius={200}
                  strokeWidth={1}
                  strokeColor="#3399ff"
                  fillColor="rgba(102,204,153,0.2)"
                />
              </MapView>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.btn_submit}
                title="Kirim Laporan"
                onPress={this.send_dataLaporan}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Kirim Laporan
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  //fungsi utk mengirim data laporan ke web service
  send_dataLaporan() {
    if (this.state.nama_laporan == '') {
      Alert.alert('Perhatian', 'Tolong isi nama laporan');
    } else if (this.state.nama_pasien == '') {
      Alert.alert('Perhatian', 'Tolong isi nama pasien');
    } else if (this.state.deskripsi == '') {
      Alert.alert('Perhatian', 'Tolong isi deskripsi laporan');
    } else if (this.state.jenis_penyakit == '') {
      Alert.alert('Perhatian', 'Tolong pilih jenis penyakit');
    } else if (this.state.where.lat == null) {
      Alert.alert('Perhatian', 'Lokasi anda belum diketahui');
    } else {
      var detail = {
        id_user: this.state.user_id,
        nama_laporan: this.state.nama_laporan,
        nama_pasien: this.state.nama_pasien,
        deskripsi: this.state.deskripsi,
        id_jenis_penyakit: this.state.jenis_penyakit,
        gambar: this.state.gambar,
        latitude: this.state.where.lat,
        longitude: this.state.where.lng,
      };
      console.log(detail);

      var formBody = [];
      for (var property in detail) {
        var encodeKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(detail[property]);
        formBody.push(encodeKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      send_laporanData(formBody)
        .then(status_code => {
          if (status_code == 200) {
            Alert.alert('Pemberitahuan', 'Data laporan berhasil dimasukkan');
          } else {
            Alert.alert('Pemberitahuan', 'Data laporan gagal dimasukkan');
          }
        })
        .catch(error => console.log(error));
    }
    this.componentDidMount;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textProps: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
  },
  text_form: {
    fontSize: 20,
    margin: 10,
  },
  topBar: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form_area: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
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
    width: 'auto',
  },
  text_area: {
    height: 150,
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
    justifyContent: 'flex-start',
  },
  dropdown: {
    flex: 1,
    margin: 5,
    width: '50%',
    height: 40,
    backgroundColor: 'lightblue',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    fontSize: 29,
  },
  btn_gps: {
    width: '30%',
    backgroundColor: 'green',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  btn_submit: {
    width: '50%',
    backgroundColor: 'blue',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  btn_img: {
    width: '50%',
    backgroundColor: 'green',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  map: {
    position: 'relative',
    height: 200,
    width: '100%',
  },
});
