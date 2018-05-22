//
//  ViewController.m
//  TestProject
//
//  Created by liyang on 2018/5/7.
//  Copyright © 2018年 liyang. All rights reserved.
//

#import "ViewController.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "AppDelegate.h"

@interface ViewController ()<RCTBridgeModule>

@end

@implementation ViewController

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(returnToNative:(NSString *)text) {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSLog(@"%@", text);
        UIViewController *presentVC = [[AppDelegate shareDelegate] controllerPresented];
        if(presentVC) //rn页面为present
        {
            [presentVC dismissViewControllerAnimated:YES completion:nil];
            [AppDelegate shareDelegate].controllerPresented = nil;
        }
        else   //rn页面为push
        {
            UINavigationController *nav = (UINavigationController *)[AppDelegate shareDelegate].window.rootViewController;
            [nav popViewControllerAnimated:YES];
        }
    });
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationItem.title = @"Native APP";
    self.view.backgroundColor = [UIColor whiteColor];
    UIButton *btn = [UIButton buttonWithType:UIButtonTypeSystem];
    [btn setFrame:CGRectMake(40, 100, 100, 50)];
    [btn setTitle:@"Push to RN" forState:UIControlStateNormal];
    [btn addTarget:self action:@selector(btnSel) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:btn];
    
    UIButton *presentBtn = [UIButton buttonWithType:UIButtonTypeSystem];
    [presentBtn setFrame:CGRectMake(40, 150, 100, 50)];
    [presentBtn setTitle:@"Present RN" forState:UIControlStateNormal];
    [presentBtn addTarget:self action:@selector(presentBtnSelector) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:presentBtn];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    self.navigationController.navigationBar.hidden = NO;
}

- (void)btnSel {
    NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"TestProject" initialProperties:nil launchOptions:nil];
    UIViewController *vc = [[UIViewController alloc] init];
    vc.view = rootView;
    [self.navigationController pushViewController:vc animated:YES];
    self.navigationController.navigationBar.hidden = YES;
}

- (void)presentBtnSelector {
    NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"TestProject" initialProperties:nil launchOptions:nil];
    UIViewController *vc = [[UIViewController alloc] init];
    vc.view = rootView;
    AppDelegate *delegate = [AppDelegate shareDelegate];
    delegate.controllerPresented = vc;
    [self presentViewController:vc animated:YES completion:nil];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
