import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import FooterTab from './FooterTab';
import Hal1 from './pages/Halaman1';
import Hal2 from './pages/Halaman2';
import Hal3 from './pages/Halaman3';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';

export const TabNavigate = TabNavigator(
  {
    Halaman1: {screen: Hal1},
    Halaman2: {screen: Hal2},
    Halaman3: {screen: Hal3},
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarComponent: props => {
      return <FooterTab navigation={props.navigation} />;
    },
  },
);

export const StackOverTabs = StackNavigator({
  Root: {screen: TabNavigate},
  GotoAbout: {screen: About},
});
export const SignedOut = StackNavigator({
  Login: {screen: Login, navigationOptions: {header: null}},
  Signup: {screen: Signup, navigationOptions: {header: null}},
});
