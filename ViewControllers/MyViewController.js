import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    SectionList,
    Image,
    ImageBackground,
    TouchableOpacity,
    DeviceEventEmitter,
    NativeModules,
    Modal
} from 'react-native';

var {width, height} = Dimensions.get('window');
var itemWidth = (width - 20)/4;

var LoadingView = require('../Views/LoadingView');
var FooterView = require('../Views/RecommendView');

var DataRequest = require('../DataRequest/DataRequest');

class MyViewController extends PureComponent {
    static navigationOptions = ({navigation}) => ({  //静态配置当前页面的导航头样式
        headerTitle:'我的',
        headerTitleStyle: {fontSize: 18, color: 'black'},
        headerStyle: {height: 44, backgroundColor: 'white'},
        headerTintColor:'red',
        headerRight:<TouchableOpacity onPress={()=>{console.log('djfdfdff')}}>
            <Image source={{uri:'nav_msg'}} style={{width:22, height:22, marginRight:10}}/>
        </TouchableOpacity>,
        headerLeft:<TouchableOpacity onPress={()=>{ NativeModules.Utils.isLogin((data)=>{
            if (data === true) {
                navigation.navigate('MyAccount');
            } else {
                navigation.navigate('Login');
            }
        })}}>
            <Image source={{uri:'icon_setting'}} style={{width:22, height:22, marginLeft:10}}/>
        </TouchableOpacity>
        // headerTruncatedBackTitle:'返回',
    });
    constructor(props) {
        super(props);
        this.state = {
            responseData: null,
            headerData: null,
            footerData:null,
            loadingShowed: true
        }
    }
    componentDidMount() {
        this.LoginNotification = DeviceEventEmitter.addListener('LoginSuccess', ()=>{this.fetchMyViewData()});
        this.fetchMyViewData();
    }
    componentWillUnmount() {
        this.LoginNotification.remove();
    }
    fetchMyViewData() {
        NativeModules.Utils.fetchObject('token', (data)=>{
            let requestUrl = mineUrl + '?' + 'token=' + data;
            DataRequest.get(requestUrl, null, (responseData)=> {
                this.configureData(responseData.data);
            }, (error)=> {
                this.setState({loadingShowed: false});
            });
        });
    }
    render() {
        var loadingView =  <Modal animationType={'fade'} transparent={true} visible={this.state.loadingShowed}>
            <LoadingView></LoadingView>
        </Modal>
        let view = <View style={{flex:1}}>
            {loadingView}
        </View>;
        if (this.state.responseData && (this.state.responseData.length > 0)) {
            view = <View style={{flex:1, backgroundColor:'#f2f2f2'}}>
                <SectionList style={{backgroundColor:'#f2f2f2'}}
                    // SectionSeparatorComponent={}
                    // ItemSeparatorComponent={}
                    // contentContainerStyle={{flexDirection: 'row', alignItems: 'flex-start',
                    //     flexWrap: 'wrap'}}
                             renderItem={this.renderItem.bind(this)}
                             renderSectionHeader={this.renderSectionHeader}
                             keyExtractor={(item,index)=>("index"+index+item)}
                             sections={this.state.responseData}
                             ListHeaderComponent={this.renderHeader.bind(this)}
                             ListFooterComponent={this.renderFooter.bind(this)}
                             stickySectionHeadersEnabled={false}>  //section header是否悬浮属性
                </SectionList>
                {loadingView}
            </View>
        }
        return view;
    }
    renderItem(info) {
        let titleView = null;
        if (info.section.name === 'orderNav') {
            var orderTitle = info.section.allOrderData.title;
            var clickUrl = 'https:' + info.section.allOrderData.clickUrl;
            titleView = <View style={{height:30, flexDirection:'row'}}>
                <Text style={styles.itemBackTitleStyle}>我的订单</Text>
                <Text style={styles.allOrderTitleStyle} onPress={()=>alert(clickUrl)}>{orderTitle}></Text>
            </View>
        } else if (info.section.name === 'navigation') {
            titleView = <View style={{height:30}}><Text style={styles.itemBackTitleStyle}>常用工具</Text></View>
        }

        return (
            <View style={{flex:1, marginLeft:10, marginRight:10, borderRadius:5, backgroundColor: 'white'}}>
                {titleView}
                <View style={styles.itemBackgroundStyle}>
                    {
                        info.item.map((item, i) => {
                            let countView = null;
                            if (item.count) {
                                countView = <View style={styles.countViewStyle}>
                                    <Text style={styles.countTitleStyle}>{item.count}</Text>
                                </View>;
                            }
                            return (
                                <TouchableOpacity key={i} onPress={this.itemClicked.bind(this, item)}>
                                    <View style={{height:70, width:itemWidth}}>
                                        <ImageBackground style={styles.itemImageStyle}
                                               source={{uri:'https:' + item.imageUrl}}>
                                            {countView}
                                        </ImageBackground>
                                        <Text style={styles.itemTextStyle}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
            </View>
        );
    }
    renderHeader() {
        let imageUrl = this.state.headerData.data.imageUrl?'https:' + this.state.headerData.data.imageUrl:'my_header_logo';
        let cardNum = this.state.headerData.data.cardNum || '-';
        let couponNum = this.state.headerData.data.couponNum || '-';
        let pointNum = this.state.headerData.data.pointNum || '-';
        return (
            <View style={styles.headerStyle}>
                <View style={{height:60, flex:1, flexDirection:'row'}}>
                    <Image style={{width:50, height:50, borderRadius:25, marginTop:-10, marginLeft:10}}
                           source={{uri:imageUrl}}
                           defaultSource={{uri:'my_header_logo'}}/>
                    <Text style={{marginTop:10, fontSize:16, marginLeft:10}}
                          onPress={()=>{this.loginBtnClicked()}}
                    >{this.state.headerData.data.title}</Text>
                </View>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:1, alignItems:'center'}}>
                        <Text style={{fontSize:12, color:'gray', marginTop:5}}>会员卡</Text>
                        <Text style={{fontSize:12, marginTop:5}}>{cardNum}</Text>
                    </View>
                    <View style={{flex:1, alignItems:'center'}}>
                        <Text style={{fontSize:12, color:'gray', marginTop:5}}>优惠券</Text>
                        <Text style={{fontSize:12, marginTop:5}}>{couponNum}</Text>
                    </View>
                    <View style={{flex:1, alignItems:'center'}}>
                        <Text style={{fontSize:12, color:'gray', marginTop:5}}>签到积分</Text>
                        <Text style={{fontSize:12, marginTop:5}}>{pointNum}</Text>
                    </View>
                </View>
            </View>
        );
    }
    renderFooter() {
        let productData = [];
        if (this.state.footerData) {
            var products = this.state.footerData.data.items;
            for (var i = 0;i<products.length;i+=6) {
                var testDatas = products.slice(i, i+6);
                productData.push(testDatas);
            }
            return (
                <FooterView products={productData}></FooterView>
            );
        }
        return null;
    }
    loginBtnClicked() {
        if (this.state.headerData.key === 'logined') {

        } else {
            this.props.navigation.navigate('Login');
        }
    }
    renderSectionHeader(section) {
        return (
            <View style={{backgroundColor:'#f2f2f2', height:10, width:width}}/>
        );
    }

    itemClicked(item) {
        this.props.navigation.navigate('WebView', {webUrl: 'https:' + item.clickUrl});
    }
    configureData(data) {
        var datas=[];
        var hData = null;
        var fData = null;
        for (var i = 0; i<data.length; i++) {
            var testData = data[i];
            if ((testData['key'] === 'unlogined') || (testData['key'] === 'logined')) {
                hData = testData;
            } else if (testData['key'] === 'orderNav') {
                var items = testData.data.items;
                delete(testData.data.items);
                var allOrderData = testData.data;
                testData.data = [items];
                testData.allOrderData = allOrderData;
                datas.push(testData);
            } else if (testData['key'] === 'navigation') {
                testData.data = [testData.data.items];
                datas.push(testData);
            } else if (testData['key'] === 'editComponent') {
                let requestUrl = 'https:' + testData.data['url'];
                this.fetchComponentData(requestUrl);
            } else if (testData['key'] === 'products') {
                fData = testData;
            }
        }
        this.setState({responseData: datas, headerData: hData, footerData: fData, loadingShowed: false});
    }
    fetchComponentData(componentUrl) {
        DataRequest.get(componentUrl, null, (responseData)=>{
            this.configureComponentData(responseData.data);
        }, (error)=>{
            console.log(error);
        });
    }
    configureComponentData(data) {
        let responseData = this.state.responseData;
        let headerData = null;
        for (var i = 0; i<data.length; i++) {
            var testData = data[i];
            if ((testData['key'] === 'logined') || (testData['key'] === 'unlogined')) {
                headerData = testData;
            } else if (testData['key'] === 'orderNav') {
                for (var j = 0; j<responseData.length; j++) {
                    var data = responseData[j];
                    if (data['key'] === 'orderNav') {
                        data.data = [testData.data['items']];
                        break;
                    }
                }
            }
        }
        this.setState({responseData: responseData, headerData: headerData});
    }
}
module.exports = MyViewController;

const styles = StyleSheet.create({
    imageBackStyle: {
        height:50,
        width:width,
        flexDirection:'row'
    },
    unloginTextStyle: {
        fontSize:16,
        color:'black',
    },
    login_btn_Style: {
        fontSize:15,
        alignSelf:'center',
    },
    bottomLineStyle: {
        borderBottomWidth:0.5,
        borderBottomColor:'gray'
    },
    headerStyle: {
        marginTop:20,
        marginRight:10,
        marginLeft:10,
        backgroundColor:'white',
        height:90,
        borderRadius:5,
    },
    itemBackgroundStyle: {
        flexDirection:'row',
        alignItems:'flex-start',
        flexWrap: 'wrap'
    },
    itemImageStyle: {
        width:30,
        height:30,
        marginTop:10,
        marginLeft:(itemWidth - 30)/2
    },
    itemTextStyle: {
        marginTop:5,
        alignSelf:'flex-start',
        width:itemWidth,
        textAlign:'center',
        color:'gray',
        fontSize:12
    },
    itemBackTitleStyle: {
        fontSize:12,
        color:'#222222',
        marginLeft:10,
        marginTop:10
    },
    allOrderTitleStyle: {
        marginRight:10,
        marginTop:10,
        fontSize:12,
        color:'gray',
        textAlign:'right',
        flex:1
    },
    countViewStyle: {
        backgroundColor:'#ff4c48',
        marginLeft:20,
        marginTop:-5,
        width:16,
        height:16,
        borderRadius:8,
        borderWidth:1,
        borderColor:'white',
        alignItems:'center',
        justifyContent:'center',
    },
    countTitleStyle: {
        color:'white',
        fontSize:10,
        textAlign:'center'
    }
});