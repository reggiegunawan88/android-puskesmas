import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
import axios from 'axios';
import {Card, CardTitle} from 'react-native-material-cards';
import LoadingScreen from './../components/loading_animation';

var radio_props = [
  {label: 'Laporan Saya', value: 0},
  {label: 'Laporan Dilimpahkan', value: 1},
];

export default class daftarLaporan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.getParam('id', 'null'),
      nama_kader: this.props.navigation.getParam('nama_kader', 'null'),
      data_laporan: [],
      data_kader: [],
      data_assign: [],
      value_radio: 0,
      search_txt: '',
    };
    this.arr_dataKader = [];
    this.arr_dataAssign = [];
  }

  //langsung fetch data dari DB setelah load page
  componentDidMount() {
    this.get_dataLaporan();
  }

  capitalize_name(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  get_dataLaporan() {
    const req1 = axios.get(
      'https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/laporan/kader?id=' +
        this.state.id,
    );
    const req2 = axios.get(
      'https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/laporan/petugas?id=' +
        this.state.id,
    );
    axios.all([req1, req2]).then(
      axios.spread((response1, response2) => {
        this.setState({
          data_laporan: response1.data,
          data_kader: response1.data,
          data_assign: response2.data,
        });
        this.arr_dataKader = response1.data;
        this.arr_dataAssign = response2.data;
      }),
    );
  }

  choose_radiobtn = value => {
    let copy_data_kader = this.state.data_kader;
    let copy_data_assign = this.state.data_assign;
    if (value == 0) {
      this.setState({value_radio: value, data_laporan: copy_data_kader});
    } else {
      this.setState({value_radio: value, data_laporan: copy_data_assign});
    }
  };

  //* fungsi untuk melakukan search pada flatlist
  searchFilter_function = text => {
    this.setState({search_txt: text});
    if (this.state.value_radio == 0) {
      const newData = this.arr_dataKader.filter(item => {
        const itemData = `${item.nama_laporan.toUpperCase()}`;
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      this.setState({data_laporan: newData});
    } else {
      const newData = this.arr_dataAssign.filter(item => {
        const itemData = `${item.nama_laporan.toUpperCase()}`;
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      this.setState({data_laporan: newData});
    }
  };

  //render per list item
  _renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate('DetilLaporan', {item: item})
      }
      style={styles.button_card}>
      <Card style={styles.card_style}>
        <CardTitle style={styles.title_text} title={item.nama_laporan} />
        <View style={styles.item}>
          <Text style={styles.title}>
            Nama Penyakit: {item.nama_jenis_penyakit}
          </Text>
          <Text style={styles.email}>Nama Petugas: {item.nama_petugas}</Text>
          <Text style={styles.email}>Tanggal Lapor: {item.tanggal}</Text>
          <Text style={styles.email}>
            Tingkat Bahaya: {item.tingkat_bahaya}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  render() {
    const searchBar = (
      <SearchBar
        placeholder="Cari laporan..."
        value={this.state.search_txt}
        lightTheme
        round
        onChangeText={text => this.searchFilter_function(text)}
        autoCorrect={false}
        containerStyle={{
          backgroundColor: 'transparent',
        }}
      />
    );

    return (
      <View style={styles.container}>
        <Text style={styles.textProps}>LIHAT LAPORAN</Text>
        <Text style={styles.textProps}>
          KADER : {this.capitalize_name(this.state.nama_kader)}
        </Text>
        <View style={styles.container_radiobtn}>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            formHorizontal={true}
            labelHorizontal={false}
            onPress={value => this.choose_radiobtn(value)}
          />
        </View>
        {this.state.data_laporan.length > 0 ? (
          searchBar
        ) : (
          <LoadingScreen isLoading={true} />
        )}
        <FlatList
          legacyImplementation={true}
          data={this.state.data_laporan}
          extraData={this.state}
          renderItem={this._renderItem}
          keyExtractor={item => item.id_laporan}
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
    marginTop: 10,
  },
  textProps: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  topBar: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_radiobtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
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
  button_card: {
    borderRadius: 5,
  },
});
