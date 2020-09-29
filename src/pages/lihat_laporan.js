import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Button,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Modal from 'react-native-modal';
import ModalComponent from '../components/modal_laporan';
import ItemLaporan from '../components/item_daftarLaporan';
import {get_daftarLaporan} from '../fetch_webservice';

export default class daftarLaporan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.getParam('id', 'null'),
      data_laporan: [],
      modalVisible: false,
      selected_item: null,
    };
  }

  //langsung fetch data dari DB setelah load page
  componentDidMount() {
    get_daftarLaporan(this.state.id)
      .then(result => {
        console.log(this.state.id);
        console.log(result);
        this.setState({data_laporan: result});
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

  _onPressItem = item => {
    this._showModal(item);
  };

  _hideMyModal = () => {
    this.setState({isModalVisible: false});
  };

  _showModal = item =>
    this.setState({isModalVisible: true, selectedItem: item});

  _keyExtractor = (item, index) => item.id_laporan;

  //render per list item
  _renderItem = ({item}) => <ItemLaporan item={item} />;

  // //item per listview bisa diklik buat tampilin detil lebih lanjut nantinya
  // show_detail() {
  //   //blm perlu skrng
  //   // this.setState({expand_detail: !this.expand_detail});
  //   return (
  //     <Modal isVisible={true}>
  //       <View style={{alignItems: 'center'}}>
  //         <Text>I am the modal content!</Text>
  //       </View>
  //     </Modal>
  //   );
  // }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.textProps}>LIHAT LAPORAN</Text>
        <Text style={styles.textProps}>ID User: {this.state.id}</Text>
        <FlatList
          data={this.state.data_laporan}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={this._renderItem}
          keyExtractor={item => item.nama_jenis_penyakit}
        />
        <ModalComponent />
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
});
