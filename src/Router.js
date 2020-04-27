import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from './pages/login';
import Home from './pages/home';
import Laporan from './pages/laporan';
import daftarLaporan from './pages/daftarLaporan';
import Pengaturan from './pages/pengaturan';

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
  Laporan: {
    screen: Laporan,
    navigationOptions: {
      headerShown: false,
    },
  },
  daftarLaporan: {
    screen: daftarLaporan,
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
});

const navigation = createAppContainer(router);
export default navigation;
