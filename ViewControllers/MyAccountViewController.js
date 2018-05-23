import React, {PureComponent} from 'react';
import {
    Text,
    View,
    Dimensions,
    SectionList,
    Image,
    TouchableOpacity,
    Alert,
    Modal,
    DeviceEventEmitter,
    NativeModules
} from 'react-native';

var {width, height} = Dimensions.get('window');

var DataRequest = require('../DataRequest/DataRequest');


var LoadingView = require('../Views/LoadingView');

class MyAccountViewController extends PureComponent {
    static navigationOptions = ({navigation}) => ({  //静态配置当前页面的导航头样式
        headerTitle:'我的账户',
        headerTitleStyle: {fontSize: 18, color: 'black'},
        headerStyle: {height: 44, backgroundColor: 'white'},
        headerTintColor:'red',
        headerLeft:<TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Image source={{uri:'nav_back'}} style={{width:22, height:22, marginLeft:10}}/>
        </TouchableOpacity>
        // headerTruncatedBackTitle:'返回',
    });
    constructor(props) {
        super(props);
        this.state = {
            responseData: null,
            loadingShowed:true
        }
    }
    componentDidMount() {
        this.fetchMyAccountData();
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
                {loadingView}
                <SectionList style={{backgroundColor:'#f0f0f0'}}
                             ItemSeparatorComponent={this.renderItemSep.bind(this)}
                             renderSectionHeader={this.renderSectionHeader.bind(this)}
                             renderItem={this.renderItem.bind(this)}
                             ListFooterComponent={this.renderFooter.bind(this)}
                             keyExtractor={(item,index)=>("index"+index+item)}
                             sections={this.state.responseData}></SectionList>
            </View>
        }
        return view;
    }
    renderItem(info) {
        let avatarView = null;
        let detailView = null;
        if (info.item.title === '我的头像') {
            let avatarUrl = ImageHost + info.item.detail;
            avatarView = <Image source={{uri:avatarUrl}}
                                style={{height:40, width:40, borderRadius:20, marginTop:5, marginRight:10}}/>
        } else {
            if (typeof info.item.detail === 'string') {
                detailView = <View style={{justifyContent:'center', marginRight:10}}>
                    <Text style={{color:'gray'}}>{info.item.detail}</Text>
                </View>
            } else if (typeof info.item.detail === 'object') {
                var addressDic = info.item.detail;
                var province = addressDic['provinceName'] || '';
                var city = addressDic['cityName'] || '';
                var district = addressDic['districtName'] || '';
                var street = addressDic['street'] || '';
                var addressStr = province + city + district + street;
                detailView = <View style={{justifyContent:'center', marginRight:10}}>
                    <Text style={{color:'gray', maxWidth:width - 120}} numberOfLines={1}>{addressStr}</Text>
                </View>
            } else if (typeof  info.item.detail === 'number') {
                detailView = <View style={{justifyContent:'center', marginRight:10}}>
                    <Text style={{color:'red'}}>{info.item.detail}</Text>
                </View>
            }
        }

        return (
            <TouchableOpacity onPress={()=>console.log(info.item.title)} activeOpacity={0.8}>
                <View style={{flex:1, height:50, backgroundColor:'white', flexDirection:'row'}}>
                    <View style={{justifyContent:'center', flex:1}}>
                        <Text style={{fontSize: 15, marginLeft:10}}>{info.item.title}</Text>
                    </View>
                    {avatarView};
                    {detailView};
                    <Image source={{uri:'arrow'}} style={{height:14, width:8, marginTop:18, marginRight:10}}/>
                </View>
            </TouchableOpacity>
        );
    }
    renderFooter() {
        return(
            <View style={{height:100}}>
                <TouchableOpacity onPress={()=>{this.logoutAlert()}} activeOpacity={0.8}>
                    <View style={{backgroundColor:'white', marginTop:30, height:45,
                                   justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:'#ff4c48', fontSize:18}}>退出登录</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    renderItemSep() {
        return (<View style={{backgroundColor: '#f2f2f2', height:1}}></View>);
    }
    renderSectionHeader(section) {
        if (section.section.key === 'first') {
            return null;
        }
        return (<View style={{backgroundColor: '#f2f2f2', height:10}}></View>);
    }
    fetchMyAccountData() {
        DataRequest.get(mineUrl, null, (responseData)=>{
            this.fetchMyAddressData(responseData);
        }, (error)=>{
            this.setState({loadingShowed:false});
        });
    }
    fetchMyAddressData(lastResponseData) {
        let allData = lastResponseData.data;
        DataRequest.get(myAddress, null, (responseData)=> {
            allData.address = responseData.data[0];
            this.configureData(allData);
            this.setState({loadingShowed:false});
        }, (error)=> {
            this.setState({loadingShowed:false});
        });
    }
    configureData(data) {
        let datas = [];
        let firstSectionData=[];
        if (data['photoUrl']) {
            firstSectionData.push({'title': '我的头像', 'detail': data['photoUrl']});
        }
        if (data['nickName']) {
            firstSectionData.push({'title': '我的昵称', 'detail': data['nickName']});
        }
        if (data['address']) {
            firstSectionData.push({'title': '收货地址', 'detail': data['address']})
        }
        firstSectionData.push({'title': '我的实名认证', detail: ''});

        let secondSectionData=[];
        if (data['securityCellphone']) {
            secondSectionData.push({'title': '手机号码', 'detail': data['securityCellphone']});
        }
        if (data['loginPwdLevel']) {
            secondSectionData.push({'title':'登录密码', 'detail': data['loginPwdLevel']});
        }
        if (data['wechatBind']) {
            secondSectionData.push({'title': '微信绑定', 'detail': data['wechatBind']});
        }
        let section1 = {'data': firstSectionData, 'key': 'first'};
        let section2 = {'data': secondSectionData, 'key': 'second'};
        datas.push(section1, section2);
        this.setState({'responseData': datas});
    }
    logoutAlert() {
        Alert.alert('提示', '退出登录？',
            [
                {text: '取消'},
                {text: '确定', onPress: () =>  this.logout()},
            ],
            { cancelable: false });
    }
    logout() {
        this.setState({loadingShowed:true});
        DataRequest.get(logoutUrl, null, (responseData)=>{
            if (Boolean(responseData['success']) === true) {
                this.setState({loadingShowed:false});
                DeviceEventEmitter.emit('LoginSuccess');
                NativeModules.Utils.clearLoginInfo('退出登录');
                this.props.navigation.goBack();
            }
        }, (error)=>{
            this.setState({loadingShowed:false});
        });
    }
}
module.exports = MyAccountViewController;