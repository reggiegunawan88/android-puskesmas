import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const options_btn = {
  title: 'Upload Gambar Pasien',
  takePhotoButtonTitle: 'Ambil foto dari kamera',
  chooseFromLibraryButtonTitle: 'Pilih dari galeri',
};

export default class UploadImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
    };
  }

  upload_img = () => {
    ImagePicker.showImagePicker(options_btn, response => {
      if (response.didCancel) {
        alert('Batal upload gambar');
      } else if (response.error) {
        console.log(response);
        alert('Error');
      } else {
        let source = {uri: response.uri};
        this.props.receivedProps(response.data);
        this.setState({avatar: source});
      }
    });
  };

  send_base64;

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.img_area}>
          <Image source={this.state.avatar} style={styles.img_size} />
        </View>

        <TouchableOpacity style={styles.btn_upload} onPress={this.upload_img}>
          <Text style={styles.upload_text}>Upload Gambar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img_area: {
    backgroundColor: 'lightgrey',
    width: '100%',
    height: 200,
    alignItems: 'center',
    margin: 10,
  },
  img_size: {
    width: '100%',
    height: '100%',
  },
  btn_upload: {
    width: '40%',
    backgroundColor: 'green',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  upload_text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
