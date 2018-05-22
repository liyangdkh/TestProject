import React,{Component} from 'react';
import {Image} from 'react-native';

class TabBarItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image style={{width:22, height:22, tintColor:this.props.tintColor}}
                   source={{uri: this.props.focused? this.props.selectedImage: this.props.normalImage}}/>
        );
    }
}

module.exports = TabBarItem;