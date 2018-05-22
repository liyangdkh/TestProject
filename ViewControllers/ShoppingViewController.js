import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

class ShoppingViewController extends Component {
    static navigationOptions = ({navigation}) => ({  //静态配置当前页面的导航头样式
        headerTitle:'购物',
        headerTitleStyle: {fontSize: 18, color: 'black'},
        headerStyle: {height: 44, backgroundColor: 'white'},
        headerTintColor:'red',
        // headerTruncatedBackTitle:'返回',
    });
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{flex:1}}>
                <Text>ShoppingViewController</Text>
            </View>
        );
    }
}
module.exports = ShoppingViewController;