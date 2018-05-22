import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
} from 'react-native';

var screenWidth = Dimensions.get('window').width;

class RegisterViewController extends Component {
    static navigationOptions = ({navigation}) => ({  //静态配置当前页面的导航头样式
        headerTitle:'注册',
        headerLeft:<TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Image source={{uri:'nav_back'}} style={{width:25, height:25, marginLeft:10}}/>
        </TouchableOpacity>,
    });
    constructor(props) {
        super(props);
        this.state={
            regBtnDisable: true,
            secureEntry: true,
            codeBtnEnable: false,
            cellPhone: '',
            pwd: '',
            smsCode: ''
        };
    }
    render() {
        return(
            <ScrollView style={{flex:1, backgroundColor:'white'}}>
                <View style={styles.phoneStyle}>
                    <Image style={styles.imgStyle} source={{uri:'tel_icon'}}/>
                    <TextInput style={styles.inputTextStyle}
                               autoCapitalize={'none'}
                               autoCorrect={false}
                               autoFocus={false}
                               placeholder={'请输入11位手机号码'}
                               clearButtonMode={'while-editing'}
                               maxLength={11}
                               onChangeText={this.phoneTextChanged.bind(this)}/>
                </View>

                <View style={styles.pwdStyle}>
                    <Image style={styles.imgStyle} source={{uri:'comfirm_pwd_icon'}}/>
                    <TextInput style={[styles.inputTextStyle, {width: screenWidth - 50 - 10 - 22}]}
                               autoCapitalize={'none'}
                               autoCorrect={false}
                               autoFocus={false}
                               placeholder={'请输入6-16字母数字组合密码'}
                               clearButtonMode={'while-editing'}
                               maxLength={16}
                               secureTextEntry={this.state.secureEntry}
                               onChangeText={this.pwdTextChanged.bind(this)}/>

                    <TouchableOpacity onPress={this.eyeImgClicked.bind(this)}>
                        <Image style={styles.eyeStyle}
                               source={this.state.secureEntry?{uri:'eye_not_select'}:{uri:'eye_select'}}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.confirmStyle}>
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

                <Text style={styles.readTextStyle}>我已阅读并同意
                    <Text style={styles.blackTextStyle}>《使用条款》</Text>
                    <Text style={styles.readTextStyle}>和</Text>
                    <Text style={styles.blackTextStyle}>《隐私保护政策》</Text>
                </Text>

                <TouchableOpacity disable={this.state.regBtnDisable}
                                  activeOpacity={this.state.regBtnDisable?1.0:0.8}
                                  onPress={this.regAccount.bind(this)}>
                    <View style={[styles.btnBackStyle, this.state.regBtnDisable&&styles.btnDisableStyle]}>
                        <Text style={styles.btnTitleStyle}>注册</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }
    phoneTextChanged(text) {
        this.setState({cellPhone: text});
        this.checkSmsCodeBtnStatus(text);
        this.checkRegBtnStatus(text, this.state.pwd, this.state.smsCode);
    }
    pwdTextChanged(text) {
        this.setState({pwd: text});
        this.checkRegBtnStatus(this.state.cellPhone, text, this.state.smsCode);
    }
    smsCodeTextChanged(text) {
        this.setState({smsCode: text});
        this.checkRegBtnStatus(this.state.cellPhone, this.state.pwd, text);
    }
    checkRegBtnStatus(phone, pwd, smsCode) {
        if ((phone.length == 11) && (pwd.length > 0) && (smsCode.length > 0)) {
            this.setState({regBtnDisable: false});
        } else {
            this.setState({regBtnDisable: true});
        }
    }
    sendSmsCode() {
        if (this.state.codeBtnEnable) {
            console.log('发送短信验证码');
        }
    }
    eyeImgClicked() {
        this.setState({
            secureEntry: !this.state.secureEntry
        });
    }
    regAccount() {
        if (!this.state.regBtnDisable) {
            console.log('注册');
        }
    }
    checkSmsCodeBtnStatus(text) {
        if (text.length == 11) {
            this.setState({codeBtnEnable: true});
        } else {
            this.setState({codeBtnEnable: false});
        }
    }
}
module.exports = RegisterViewController;

const styles = StyleSheet.create({
    phoneStyle: {
        backgroundColor:'white',
        height:50,
        flexDirection:'row',
        borderBottomWidth:0.5,
        borderBottomColor:'#eeeeee'
    },
    pwdStyle: {
        backgroundColor:'white',
        height:50,
        flexDirection:'row',
        borderBottomWidth:0.5,
        borderBottomColor:'#eeeeee'
    },
    confirmStyle: {
        backgroundColor:'white',
        height:50,
        flexDirection:'row',
        borderBottomWidth:0.5,
        borderBottomColor:'#eeeeee'
    },
    readTextStyle: {
        marginLeft:10,
        marginTop:10,
        fontSize:10,
        color:'gray',
    },
    blackTextStyle: {
        marginTop:10,
        fontSize:10,
        color:'black'
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
    imgStyle: {
        marginTop:15,
        marginLeft:15,
        width:20,
        height:20,
    },
    inputTextStyle: {
        marginTop:10,
        marginLeft:10,
        fontSize:15,
        height:30,
        width:screenWidth - 50 - 10
    },
    eyeStyle: {
        width:22,
        height:13,
        marginTop:18,
        marginLeft:5
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