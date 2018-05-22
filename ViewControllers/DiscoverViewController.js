import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

class DiscoverViewController extends Component {
    static navigationOptions = ({navigation}) => ({  //静态配置当前页面的导航头样式
        headerTitle:'发现',
        headerTitleStyle: {fontSize: 18, color: 'black'},
        headerStyle: {height: 44, backgroundColor: 'white'},
        headerTintColor:'red',
        // headerTruncatedBackTitle:'返回',
    });
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <View style={{flex:1}}>
                <Text>DiscoverViewController</Text>
            </View>
        );
    }
}
module.exports = DiscoverViewController;