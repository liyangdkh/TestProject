import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    AlertIOS,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';

var screenWidth = Dimensions.get('window').width;

class FindPwdViewController extends Component {
    static navigationOptions = ({navigation}) => ({  //静态配置当前页面的导航头样式
        headerTitle:'找回密码',
        headerLeft:<TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Image source={{uri:'nav_back'}} style={{width:25, height:25, marginLeft:10}}/>
        </TouchableOpacity>,
    });
    constructor(props) {
        super(props);
        this.state={
            findBtnDisable: true,
            codeBtnEnable: false,
            cellPhone: '',
            pwd: '',
            confirmPwd: '',
            smsCode: ''
        };
    }
    render() {
        return(
            <ScrollView style={{flex:1, backgroundColor:'white'}}>
                <View style={styles.backStyle}>
                    <Image style={styles.imgStyle} source={{uri:'tel_icon'}}/>
                    <TextInput style={styles.inputTextStyle}
                               autoCapitalize={'none'}
                               autoCorrect={false}
                               autoFocus={false}
                               placeholder={'请输入11位手机号码'}
                               clearButtonMode={'while-editing'}
                               maxLength={11}
                               onChangeText={this.cellPhoneTextChanged.bind(this)}/>
                </View>

                <View style={styles.backStyle}>
                    <Image style={styles.imgStyle} source={{uri:'comfirm_pwd_icon'}}/>
                    <TextInput style={styles.inputTextStyle}
                               autoCapitalize={'none'}
                               autoCorrect={false}
                               autoFocus={false}
                               placeholder={'请输入6-16字母数字组合密码'}
                               clearButtonMode={'while-editing'}
                               maxLength={16}
                               secureTextEntry={true}
                               onChangeText={this.pwdTextChanged.bind(this)}/>
                </View>

                <View style={styles.backStyle}>
                    <Image style={styles.imgStyle} source={{uri:'comfirm_pwd_icon'}}/>
                    <TextInput style={styles.inputTextStyle}
                               autoCapitalize={'none'}
                               autoCorrect={false}
                               autoFocus={false}
                               placeholder={'请输入6-16字母数字组合密码'}
                               clearButtonMode={'while-editing'}
                               maxLength={16}
                               secureTextEntry={true}
                               onChangeText={this.pwdConfirmTextChanged.bind(this)}/>
                </View>

                <View style={styles.backStyle}>
                    <Image style={styles.imgStyle} source={{uri:'random_icon'}}/>
                    <TextInput style={[styles.inputTextStyle, {width: screenWidth - 50 - 10 - 80}]}
                               autoCapitalize={'none'}
                               autoCorrect={false}
                               autoFocus={false}
                               placeholder={'请输入短信验证码'}
                               clearButtonMode={'while-editing'}
                               onChangeText={this.smsCodeTextChanged.bind(this)}/>

                    <Text style={[styles.codeDisableStyle, this.state.codeBtnEnable&&styles.codeEnableColor]}
                          onPress={this.sendSmsCode.bind(this)}>发送验证码</Text>
                </View>

                <TouchableOpacity disable={this.state.findBtnDisable}
                                  activeOpacity={this.state.findBtnDisable?1.0:0.8}
                                  onPress={this.findPwd.bind(this)}>
                    <View style={[styles.btnBackStyle, this.state.findBtnDisable&&styles.btnDisableStyle]}>
                        <Text style={styles.btnTitleStyle}>找回密码</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }
    cellPhoneTextChanged(text) {
        this.setState({cellPhone: text});
        this.checkSmsBtnStatue(text);
        this.checkFindBtnStatus(text, this.state.pwd, this.state.confirmPwd, this.state.smsCode);
    }
    pwdTextChanged(text) {
        this.setState({pwd: text});
        this.checkFindBtnStatus(this.state.cellPhone, text, this.state.confirmPwd, this.state.smsCode);
    }
    pwdConfirmTextChanged(text) {
        this.setState({confirmPwd: text});
        this.checkFindBtnStatus(this.state.cellPhone, this.state.pwd, text, this.state.smsCode);
    }
    smsCodeTextChanged(text) {
        this.setState({smsCode: text});
        this.checkFindBtnStatus(this.state.cellPhone, this.state.pwd, this.state.confirmPwd, text);
    }
    sendSmsCode() {

    }
    checkSmsBtnStatue(text) {
        if (text.length == 11) {
            this.setState({codeBtnEnable: true});
        } else {
            this.setState({codeBtnEnable: false});
        }
    }
    checkFindBtnStatus(phone, pwd, confirm, smsCode) {
        if ((phone.length == 11) && (pwd.length > 0) && (confirm.length > 0) && (smsCode.length > 0)) {
            this.setState({findBtnDisable: false});
        } else {
            this.setState({findBtnDisable: true});
        }
    }
    findPwd() {
        if (!this.state.findBtnDisable) {
            console.log('找回密码');
        }
    }
}
module.exports = FindPwdViewController;

const styles = StyleSheet.create({
    backStyle: {
        backgroundColor:'white',
        height:50,
        flexDirection:'row',
        borderBottomWidth:0.5,
        borderBottomColor:'#eeeeee'
    },
    imgStyle: {
        marginTop:15,
        marginLeft:15,
        width:20,
        height:20,
    },
    btnBackStyle: {
        backgroundColor:'#ff4c48',
        marginTop:20,
        marginLeft:10,
        height:40,
        width:screenWidth - 20,
        justifyContent:'center',
        borderRadius:8
    },
    btnTitleStyle: {
        fontSize:20,
        color:'white',
        fontWeight:'bold',
        alignSelf:'center'
    },
    btnDisableStyle: {
        backgroundColor:'#e2e2e2',
    },
    inputTextStyle: {
        marginTop:10,
        marginLeft:10,
        fontSize:15,
        height:30,
        width:screenWidth - 50 - 10
    },
    codeDisableStyle: {
        fontSize:13,
        color:'gray',
        alignSelf:'center',
        marginLeft:15
    },
    codeEnableColor: {
        color:'#ff4c48'
    }
});