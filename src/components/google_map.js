import React, {Component} from 'react';
navigator.geolocation = require('@react-native-community/geolocation'); //important!
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet} from 'react-native';

export default class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      where: {lat: 0, lng: 0},
      error: null,
    };
  }

  componentDidMount() {
    this.setState({
      where: {
        lat: parseFloat(this.props.item.latitude),
        lng: parseFloat(this.props.item.longitude),
      },
    });
  }

  render() {
    let myMap;
    return (
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
      </MapView>
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
  map: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
});
