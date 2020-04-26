import React from 'react';
import Login from './src/pages/login';
import Home from './src/pages/home';

// import {createStackNavigator} from 'react-navigation-stack';

// const Application = createStackNavigator({
//   Home: {screen: Login},
// });

export default class App extends React.Component {
  render() {
    return <Login />;
  }
}
