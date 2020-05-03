import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation');

export default class Laporan extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      where: {lat: null, lng: null},
      error: null,
    };
    this.get_location = this.get_location.bind(this);
  }
  geoSuccess = position => {
    this.setState({
      ready: true,
      where: {lat: position.coords.latitude, lng: position.coords.longitude},
    });
    this.setState({ready: true});
  };
  geoFailure = err => {
    this.setState({error: err.message});
  };

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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textProps}>Halaman Laporan</Text>
        <View style={styles.topBar}>
          <Text style={styles.textProps}>GPS Location</Text>
          <Button title="Get Position" onPress={this.get_location} />
          <Text style={styles.textProps}>Latitude: {this.state.where.lat}</Text>
          <Text style={styles.textProps}>
            Longitude: {this.state.where.lng}
          </Text>
        </View>

        {/* {!this.state.ready && <Text style={styles.big}>GPS LAT-LGN</Text>}

        {this.state.error && <Text style={styles.big}>{this.state.error}</Text>} */}

        {/* {this.state.ready && <Text style={styles.big}/>} */}
      </View>
    );
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
  topBar: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
