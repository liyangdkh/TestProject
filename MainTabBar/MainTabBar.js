import React, {Component} from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

var TabBarItem = require('./TabBarItem/TabBarItem');

var GoViewController = require('../ViewControllers/GoViewController');
var DiscoverViewController = require('../ViewControllers/DiscoverViewController');
var ShoppingViewController = require('../ViewControllers/ShoppingViewController');
var GlobalViewController = require('../ViewControllers/GlobalViewController');
var MyViewController = require('../ViewControllers/MyViewController');

var DetailViewController = require('../ViewControllers/DetailViewController');
var LoginViewController = require('../ViewControllers/LoginViewController');
var RegisterViewController = require('../ViewControllers/RegisterViewController');
var FindPwdViewController = require('../ViewControllers/FindPwdViewController');
var WebViewController = require('../ViewControllers/WebViewController');
var MyAccountViewController = require('../ViewControllers/MyAccountViewController');

const GoStackNavigatorRoute = {
    Go: {
        screen: GoViewController
    },
};
const GoStackNavigatorOption = {
    initialRouteName: 'Go',
    navigationOptions: {
        headerStyle: {height: 44, backgroundColor: 'white'},
    }
};

const DisStackNavigatorRoute = {
    Dis: {
        screen: DiscoverViewController
    },
};
const DisStackNavigatorOption = {
    initialRouteName: 'Dis',
    navigationOptions: {
        headerStyle: {height: 44, backgroundColor: 'white'},
    }
};

const ShoppingStackNavigatorRoute = {
    Shop: {
        screen: ShoppingViewController
    },
};
const ShoppingStackNavigatorOption = {
    initialRouteName: 'Shop',
    navigationOptions: {
        headerStyle: {height: 44, backgroundColor: 'white'},
    }
};

const GlobalStackNavigatorRoute = {
    Global: {
        screen: GlobalViewController
    },
};
const GlobalStackNavigatorOption = {
    initialRouteName: 'Global',
    navigationOptions: {
        headerStyle: {height: 44, backgroundColor: 'white'},
    }
};

const MyStackNavigatorRoute = {
    My: {
        screen: MyViewController
    }
};
const MyStackNavigatorOption = {
    initialRouteName: 'My',
    navigationOptions: {
        headerStyle: {height: 44, backgroundColor: 'white'},
    },
};

const GoNav = createStackNavigator(GoStackNavigatorRoute, GoStackNavigatorOption);
const DisNav = createStackNavigator(DisStackNavigatorRoute, DisStackNavigatorOption);
const ShopNav = createStackNavigator(ShoppingStackNavigatorRoute, ShoppingStackNavigatorOption);
const GlobalNav = createStackNavigator(GlobalStackNavigatorRoute, GlobalStackNavigatorOption);
const MyNav = createStackNavigator(MyStackNavigatorRoute, MyStackNavigatorOption);

const TabRouteConfigs = {
    Go: {
        screen: GoNav,
        navigationOptions:({navigation})=>({
            tabBarLabel:'逛街',
            tabBarIcon:({focused,tintColor})=>(
                <TabBarItem focused={focused} normalImage={'store_normal'} selectedImage={'store_pressed'}/>
            )
        })
    },
    Dis: {
        screen: DisNav,
        navigationOptions:({navigation})=>({
            tabBarLabel:'发现',
            tabBarIcon:({focused, tintColor})=>(
                <TabBarItem focused={focused} normalImage={'discover_normal'} selectedImage={'discover_pressed'}/>
            )
        })
    },
    Shop: {
        screen: ShopNav,
        navigationOptions:({navigation})=>({
            tabBarLabel:'购物',
            tabBarIcon:({focused, tintColor})=>(
                <TabBarItem focused={focused} normalImage={'shopping_normal'} selectedImage={'shopping_pressed'}/>
            )
        })
    },
    Global: {
        screen: GlobalNav,
        navigationOptions:({navigation})=>({
            tabBarLabel:'全球购',
            tabBarIcon:({focused, tintColor})=>(
                <TabBarItem focused={focused} normalImage={'global_normal'} selectedImage={'global_pressed'}/>
            )
        })
    },
    My: {
        screen: MyNav,
        navigationOptions:({navigation})=>({
            tabBarLabel:'我的',
            tabBarIcon:({focused, tintColor})=>(
                <TabBarItem focused={focused} normalImage={'my_normal'} selectedImage={'my_pressed'}/>
            )
        })
    }
};
const TabNavigatorConfig = {
    initialRouteName:'Go',
    tabBarPosition:'bottom',
    lazy:true,
    tabBarOptions: {
        activeTintColor:'#ff4c48',
    }
};

const TabBar = createBottomTabNavigator(TabRouteConfigs, TabNavigatorConfig);

 const TabNavRouteConfig = {
     Tab: {
         screen: TabBar,
         navigationOptions: {
             header:null,
         }
     },
     Detail: {
         screen: DetailViewController,
     },
     Login: {
         screen: LoginViewController,
     },
     Reg: {
         screen: RegisterViewController,
     },
     FindPwd: {
         screen: FindPwdViewController,
     },
     WebView: {
         screen: WebViewController,
     },
     MyAccount: {
         screen: MyAccountViewController,
     }
 };
 const TabStackNavigatorOption = {
     initialRouteName: 'Tab',
     navigationOptions: {
         headerStyle: {height: 44, backgroundColor: 'white'},
     }
 };

const TabNav = createStackNavigator(TabNavRouteConfig, TabStackNavigatorOption);

class MainTabBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <TabNav/>
        );
    }
}
module.exports = MainTabBar;