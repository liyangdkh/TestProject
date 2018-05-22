import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    WebView
} from 'react-native';

var {width, height} = Dimensions.get('window');

class WebViewController extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <View style={{flex:1}}>
                <WebView bounces={false}
                         scalesPageToFit={true}
                         source={{uri:this.props.navigation.state.params.webUrl}}
                         style={{width:width, height:height}}>
                </WebView>
            </View>
        );
    }
}
module.exports = WebViewController;