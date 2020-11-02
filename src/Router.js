import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from './pages/login';
import Home from './pages/home';
import BuatLaporan from './pages/buat_laporan';
import LihatLaporan from './pages/lihat_laporan';
import DetilLaporan from './pages/detil_laporan';
import Pengaturan from './pages/pengaturan';
import ImagePicker from './components/image_picker';

const router = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  BuatLaporan: {
    screen: BuatLaporan,
    navigationOptions: {
      headerShown: false,
    },
  },
  LihatLaporan: {
    screen: LihatLaporan,
    navigationOptions: {
      headerShown: false,
    },
  },
  DetilLaporan: {
    screen: DetilLaporan,
    navigationOptions: {
      headerShown: false,
    },
  },
  Pengaturan: {
    screen: Pengaturan,
    navigationOptions: {
      headerShown: false,
    },
  },
  ImagePicker: {
    screen: ImagePicker,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const navigation = createAppContainer(router);
export default navigation;
