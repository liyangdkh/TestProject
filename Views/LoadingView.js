import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ActivityIndicator
} from 'react-native';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

class LoadingView extends Component {
    constructor(props) {
        super(props);
        this.state={
            animating: true
        }
    }
    render() {
        return (
            <View style={styles.backStyle}>
                <ActivityIndicator animating={this.state.animating}
                                   size={'large'}
                                   hidesWhenStopped={true}
                                   color={'white'}
                                   style={{height:60, width:60, marginTop:(120-60)/2 - 10, marginLeft:(120-60)/2}}
                ></ActivityIndicator>
                <Text style={{alignSelf:'center', fontSize:16, color:'white'}}>正在加载...</Text>
            </View>
        );
    }
    componentWillUnmount() {
        this.setState({animating: false});
    }
}
module.exports = LoadingView;

const styles = StyleSheet.create({
    backStyle: {
        backgroundColor:'rgba(0, 0, 0, 0.6)',
        width:120,
        height:120,
        marginTop:(screenHeight - 120)/2,
        marginLeft:(screenWidth - 120)/2,
        borderRadius:10
    }
});