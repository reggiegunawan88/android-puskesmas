import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import axios from 'axios';
import ItemLaporan from '../components/item_daftarLaporan';

var radio_props = [
  {label: 'Laporan Saya', value: 0},
  {label: 'Laporan Dialihkan', value: 1},
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
    };
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
      'https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/laporan/kader?id=2',
    );
    axios.all([req1, req2]).then(
      axios.spread((response1, response2) => {
        this.setState({
          data_laporan: response1.data,
          data_kader: response1.data,
          data_assign: response2.data,
        });
      }),
    );
  }

  choose_radiobtn = value => {
    let copy_data_kader = this.state.data_kader;
    let copy_data_assign = this.state.data_assign;
    if (value == 0) {
      this.setState({data_laporan: copy_data_kader});
    } else {
      this.setState({data_laporan: copy_data_assign});
    }
  };

  //render per list item
  _renderItem = ({item}) => <ItemLaporan item={item} />;

  render() {
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
        <FlatList
          data={this.state.data_laporan}
          extraData={this.state}
          renderItem={this._renderItem}
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
});
