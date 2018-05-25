import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';

var {width, height} = Dimensions.get('window');

class RecommendView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageControlIndex:0,
        }
    }
    render() {
        return (
            <View style={{flex:1, backgroundColor:'white', marginTop:10, marginBottom:10}}>
                <Image style={{height:40}} source={{uri:'barcode_title'}}/>
                <ScrollView style={{flex:1}}
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={0}
                            // onScroll={()=>{this.onScroll()}}
                            onMomentumScrollEnd={(e)=>{this.onMomentumScrollEnd(e)}}
                            ref={'scrollView'}>
                    {
                        this.props.products.map((item, i)=>{
                            return (
                                <View style={{flexDirection:'row', alignItems:'flex-start', flexWrap: 'wrap',width:width}}
                                      key={i}>
                                    {
                                        item.map((data, j)=>{
                                            return (
                                                <TouchableOpacity key={j} activeOpacity={0.8}
                                                                  onPress={()=>{this.productClick(data)}}>
                                                    <View style={{width:width/3, backgroundColor:'white', height:width/3 + 50}}>
                                                        <Image style={[styles.recommendImageStyle]}
                                                               source={{uri:'https:'+ data.imageUrl}}
                                                               defaultSource={{uri:'default_200*200'}}/>
                                                        <View style={styles.recommendTitleBackStyle}>
                                                            <Text style={{fontSize:12, color:'#222222'}}
                                                                  numberOfLines={2}>
                                                                {data.title}
                                                            </Text>
                                                        </View>
                                                        <Text style={{fontSize:15, color:'#ff4c48', textAlign:'center'}}>
                                                            {'￥'+ data.priceString}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        })
                                    }
                                </View>
                            );
                        })
                    }
                </ScrollView>
                <View style={styles.pageControlBackStyle}>
                    {
                        this.props.products.map((item, i)=>{styles.pageControlNormalStyle
                            return (
                                <View key={i}
                                      style={(i===this.state.pageControlIndex)? styles.pageControlSelectStyle: styles.pageControlNormalStyle}/>
                            );
                        })
                    }
                </View>
            </View>
        );
    }

    onMomentumScrollEnd(e) {
        this.setState({pageControlIndex: e.nativeEvent.contentOffset.x/width});
    }
    productClick(product) {
        alert(product.title);
    }
}
module.exports = RecommendView;

const styles = StyleSheet.create({
    pageControlBackStyle: {
        height:20,
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'white',
        alignItems:'center'
    },
    pageControlNormalStyle: {
        backgroundColor:'gray',
        width:6,
        height:6,
        borderRadius:3,
        marginHorizontal:2
    },
    pageControlSelectStyle: {
        backgroundColor:'red',
        width:6,
        height:6,
        borderRadius:3,
        marginHorizontal:2
    },
    recommendImageStyle: {
        width: width/3 - 10,
        height: width/3 - 10,
        marginLeft:5
    },
    recommendTitleBackStyle: {
        width: width/3 - 10,
        height:30,
        marginLeft:5,
        marginTop:5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});