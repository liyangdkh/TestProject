import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

class TestNavViewController extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle:'TestNavViewController',
        headerTitleStyle: {fontSize: 18, color: 'purple'},
        headerStyle: {height: 44, backgroundColor: 'white'},
        headerTintColor:'black',
        // headerRight:<Text style={{color: 'red', fontSize: 18}} onPress={this.rightBtnClicked.bind(this)}>编辑</Text>
    });
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{flex:1, backgroundColor:'blue'}}>
                <Text onPress={this.textClicked.bind(this)}>返回</Text>
            </View>
        );
    }
    textClicked() {
        this.props.navigation.goBack();
    }
}
module.exports = TestNavViewController;