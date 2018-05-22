import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Button
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {NativeModules} from 'react-native';

class RootViewController extends React.Component {
    static navigationOptions = ({navigation}) => ({  //静态配置当前页面的导航头样式
        headerTitle:'RootViewController',
        headerTitleStyle: {fontSize: 18, color: 'purple'},
        headerStyle: {height: 44, backgroundColor: 'white'},
        headerTintColor:'red',
        headerTruncatedBackTitle:'返回',
        headerRight:<Button title={'按钮'}
                            color={'red'}
                            onPress={()=>{navigation.navigate('TestNav', {param: 'i am from root view controller'});}}/>,
        headerLeft:<Button title={'返回'}
                           color={'black'}
                           onPress={()=>{NativeModules.ViewController.returnToNative('哈哈哈哈哈哈');}}/>
    });
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <SafeAreaView style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{backgroundColor:'red'}} onPress={this.textClicked.bind(this)}>哈哈哈哈哈哈</Text>
            </SafeAreaView>
        );
    }
    textClicked() {
        this.props.navigation.navigate('TestNav', {param: 'i am from root view controller'});
    }
    rightBtnClicked() {
        alert('rightBtnClicked');
    }
}
module.exports = RootViewController;