//
//  AppDelegate.h
//  TestProject
//
//  Created by liyang on 2018/5/7.
//  Copyright © 2018年 liyang. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;
@property (strong, nonatomic) UIViewController *controllerPresented;

+ (AppDelegate *)shareDelegate;

@end

