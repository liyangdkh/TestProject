import React, { Component } from 'react';

class DataRequest extends Component {

     static get(url, params, successCallback, failCallback) {
        var option = {
            method:'GET',
            header: {
                'Content-Type': 'application/json; charset=utf-8',
                'tgVersion': '@tiangou/ios/20180522/',
                'mid_global': '9',
                'mid_global': 'ios'
            },
            // timeout:10
        };
        fetch(url, option)
            .then((response)=>{
                if (response.status === 200) {
                    response.json().then((jsonData)=>{
                        successCallback(jsonData);
                    });
                } else {
                    console.log('请求失败！！！！！');
                }
            })
            .catch((error)=>{
                failCallback(error);
            })
            .done();
    }
    static post(url, params, successCallback, failCallback) {
        var option = {
            method: 'POST',
            header: {
                'tgVersion': '@tiangou/ios/20180424/1526541435053'
            },
            body: params,
            // timeout:10
        };
        fetch(url, option)
            .then((response)=>{
                if (response.status === 200) {
                    response.json().then((jsonData)=>{
                        successCallback(jsonData);
                    });
                } else {
                    console.log('请求失败！！！！！');
                }
            })
            .catch((error)=>{
                failCallback(error);
                console.log(error);
            })
            .done();
    }

}

module.exports = DataRequest;