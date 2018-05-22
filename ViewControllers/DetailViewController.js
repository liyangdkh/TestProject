import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';

class DetailViewController extends Component {
    static navigationOptions = ({navigation}) => ({  //静态配置当前页面的导航头样式
        headerTitle:'DetailViewController',
        headerLeft:<TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Image source={{uri:'nav_back'}} style={{width:25, height:25, marginLeft:10}}/>
        </TouchableOpacity>,
    });
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <View />
        );
    }
}
module.exports = DetailViewController;