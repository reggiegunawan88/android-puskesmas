import React, {Component} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {View} from 'react-native';

export default class LoadingAnimation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Spinner
          visible={this.props.isLoading}
          animation="fade"
          color="lightgreen"
          cancelable={true}
        />
      </View>
    );
  }
}
