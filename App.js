/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {DeviceEventEmitter, YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader', 'Class RCTCxxModule was not exported.', 'Warning: componentWillReceiveProps is deprecated']);

import {
  StyleSheet,
  Text,
  View,
    NativeModules
} from 'react-native';
// var screenWidth = Dimensions.get('window').width;
var RootViewController = require('./RootViewController/RootViewController');
var TestNavViewController = require('./TestNavViewController/TestNavViewController');

const rootRoute = {
    RootVC: {
        screen: RootViewController
    },
    TestNav: {
        screen: TestNavViewController
    }
};
const StackNavigatorConfig = {
    initialRouteName: 'RootVC',
    initialRouteParams: {initPara: '初始页面参数'},
    navigationOptions: {
        title: '首页',
        headerTitleStyle: {fontSize: 18, color: 'red'},
        headerStyle: {height: 44, backgroundColor: 'white'},
        headerTintColor:'red',
        // headerLeft:<Text style={{color: 'red', fontSize: 18}} onPress={this.leftBtnClicked.bind(this)}>返回</Text>,
        // headerRight:<Text style={{color: 'red', fontSize: 18}} onPress={this.rightBtnClicked.bind(this)}>编辑</Text>
    },
    mode: 'card',
    headerMode: 'screen',
    cardStyle: {backgroundColor: "#ffffff"},
    onTransitionStart: (() => {
        console.log('页面跳转动画开始');
    }),
    onTransitionEnd: (() => {
        console.log('页面跳转动画结束');
    }),
};
const RootStack = createStackNavigator(rootRoute, StackNavigatorConfig);

var MainTabBar = require('./MainTabBar/MainTabBar');

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
    componentDidMount() {
        NativeModules.Utils.setCookie('cookies!!!');
    }
  render() {
    return (
        //<RootViewController/>
        //<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            //<Text style={{backgroundColor:'red'}}>哈哈哈哈哈啊哈哈哈哈</Text>
        //</View>
        //<View style={{flex:1, flexDirection:'row'}}>
            //<View style={{flex:1, backgroundColor:'red'}}/>
            //<View style={{flex:2, backgroundColor:'blue'}}/>
        //</View>
        <MainTabBar/>
        //<RootStack/>
        /*<NavigatorIOS style={{flex:1}}
                      barTintColor={'white'}
                      titleTextColor={'black'}
                      tintColor={'black'}
                      initialRoute={
                          {
                              title:'首页',
                              component:RootViewController,
                              leftButtonTitle:'返回',
                              onLeftButtonPress:this.leftBtnPress.bind(this)
                          }
                      }/>*/
    );
  }

  leftBtnPress() {
      NativeModules.ViewController.returnToNative('哈哈哈哈哈哈');
  }

  leftBtnClicked() {
      alert('leftBtnClicked');
  }
  rightBtnClicked() {
      alert('rightBtnClicked');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  navStyle: {
    flex:1
  }
});
