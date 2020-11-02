import React, {Component} from 'react';
import GoogleMap from './../components/google_map';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

export default class DetilLaporan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.getParam('item', 'null'),
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textProps}>Halaman Detail Laporan</Text>
        <Text style={styles.textProps}>{this.state.item.nama_laporan}</Text>
        <Text style={styles.textProps}>Lokasi pada Map :</Text>
        <GoogleMap item={this.state.item} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  textProps: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
  },
});
