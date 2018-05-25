//
//  Utils.m
//  TestProject
//
//  Created by liyang on 2018/5/17.
//  Copyright © 2018年 liyang. All rights reserved.
//

#import "Utils.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTConvert.h>

@interface Utils ()<RCTBridgeModule>

@end

@implementation Utils

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

RCT_EXPORT_METHOD(fetchObject:(NSString *)key callback:(RCTResponseSenderBlock)callBack) {
    NSString *token = [[NSUserDefaults standardUserDefaults] objectForKey:key];
    if (token) {
        callBack(@[token]);
    } else {
        callBack(@[@""]);
    }
}

RCT_EXPORT_METHOD(saveLoginInfo:(NSDictionary *)loginInfo) {
    [[NSUserDefaults standardUserDefaults] setObject:@(YES) forKey:@"isLogin"];
    [[NSUserDefaults standardUserDefaults] setObject:loginInfo[@"cellPhone"] forKey:@"cellPhone"];
    [[NSUserDefaults standardUserDefaults] setObject:loginInfo[@"nickName"] forKey:@"nickName"];
    [[NSUserDefaults standardUserDefaults] setObject:loginInfo[@"socialProfile"][@"photoUrl"] forKey:@"photoUrl"];
    [[NSUserDefaults standardUserDefaults] setObject:loginInfo[@"token"] forKey:@"token"];
    [[NSUserDefaults standardUserDefaults] setObject:loginInfo[@"alias"] forKey:@"alias"];
    [[NSUserDefaults standardUserDefaults] setObject:loginInfo[@"id"] forKey:@"memberId"];
    [[NSUserDefaults standardUserDefaults] setObject:loginInfo[@"key"] forKey:@"key"];
    [[NSUserDefaults standardUserDefaults] setObject:loginInfo[@"loginPwdLevel"] forKey:@"loginPwdLevel"];
    [[NSUserDefaults standardUserDefaults] setObject:loginInfo[@"validate"] forKey:@"validate"];
    [[NSUserDefaults standardUserDefaults] setObject:loginInfo[@"wechatBind"] forKey:@"wechatBind"];
    [[NSUserDefaults standardUserDefaults] synchronize];
}

RCT_EXPORT_METHOD(clearLoginInfo:(NSString *)text) {
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"isLogin"];
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"cellPhone"];
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"nickName"];
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"photoUrl"];
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"token"];
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"alias"];
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"memberId"];
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"key"];
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"loginPwdLevel"];
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"validate"];
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"wechatBind"];
    [[NSUserDefaults standardUserDefaults] synchronize];
    [self setCookie:@"cookie"];
}

RCT_EXPORT_METHOD(isLogin:(RCTResponseSenderBlock)callBack) {
    NSNumber *isLogin = [[NSUserDefaults standardUserDefaults] objectForKey:@"isLogin"];
    NSNumber *result = isLogin? isLogin : @(NO);
    callBack(@[result]);
}

+ (NSDictionary *)generateCookies {
    NSNumber *isLogin = [[NSUserDefaults standardUserDefaults] valueForKey:@"isLogin"];
    NSString *token = [[NSUserDefaults standardUserDefaults] valueForKey:@"token"];
    NSNumber *validate = [[NSUserDefaults standardUserDefaults] valueForKey:@"validate"];
    NSNumber *memberId = [[NSUserDefaults standardUserDefaults] valueForKey:@"memberId"];
    NSString *cellPhone = [[NSUserDefaults standardUserDefaults] valueForKey:@"cellPhone"];
    NSString *nickName = [[NSUserDefaults standardUserDefaults] valueForKey:@"nickName"];

    NSMutableDictionary *cookieDict = [NSMutableDictionary dictionaryWithObjectsAndKeys:@"ios", @"global", @"true", @"hybrid", @"true", @"isGPS", @"true", @"isCheck", nil];
    [cookieDict setObject:@"19" forKey:@"hybridVersion"];
    

    if(isLogin)
    {
        [cookieDict setObject:isLogin forKey:@"isLogin"];
    }
    else
    {
        [[self class] removeCookieWithKey:@"isLogin"];
    }

    if(validate)
    {
        NSString *value = [NSString stringWithFormat:@"%@", validate];
        [cookieDict setObject:value forKey:@"validate"];
    }
    else
    {
        [[self class] removeCookieWithKey:@"validate"];
    }

    if(memberId)
    {
        NSString *value = [NSString stringWithFormat:@"%@", memberId];
        [cookieDict setObject:value forKey:@"memberId"];
    }
    else
    {
        [[self class] removeCookieWithKey:@"memberId"];
    }

    if(cellPhone)
    {
        [cookieDict setObject:cellPhone forKey:@"cellPhone"];
    }
    else
    {
        [[self class] removeCookieWithKey:@"cellPhone"];
    }

    if(nickName)
    {
        [cookieDict setObject:nickName forKey:@"username"];
    }
    else
    {
        [[self class] removeCookieWithKey:@"username"];
    }

    if(token)
    {
        [cookieDict setObject:token forKey:@"token"];
    }
    else
    {
        [[self class] removeCookieWithKey:@"token"];
    }
    return cookieDict;
}

RCT_EXPORT_METHOD(setCookie:(NSString *)text) {
    NSDictionary *dic = [[self class] generateCookies];
    [[self class] setCookie:dic withUrl:@"m.test.66buy.com.cn"];
}

+ (void)setCookie:(NSDictionary *)dict withUrl:(NSString *)url {
    if([url rangeOfString:@"51tiangou.com"].location == NSNotFound && [url rangeOfString:@"66buy.com.cn"].location == NSNotFound)
    {
        return;
    }
    
    NSString *cookieDomain = [self getDomain:url];
    for(NSString *key in dict) {
        NSString *obj = [dict objectForKey:key];
        if(![obj isKindOfClass:[NSString class]])
        {
            obj = [NSString stringWithFormat:@"%@", obj];
        }
        
        NSHTTPCookie *cookie = [NSHTTPCookie cookieWithProperties:
                                [NSDictionary dictionaryWithObjectsAndKeys:
                                 cookieDomain, NSHTTPCookieDomain,
                                 @"/", NSHTTPCookiePath,
                                 key, NSHTTPCookieName,
                                 obj, NSHTTPCookieValue,
                                 nil]];
        
        [[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookie:cookie];
    }
}

+ (NSString *)getDomain:(NSString *)url
{
    NSURL *cookieHost = [NSURL URLWithString:url];
    NSString *cookieDomain = cookieHost.host;
    if([url rangeOfString:@".51tiangou.com"].location != NSNotFound) {
        cookieDomain = @".51tiangou.com";
    } else if([url rangeOfString:@".pre.66buy.com.cn"].location != NSNotFound) {
        cookieDomain = @".pre.66buy.com.cn";
    } else if([url rangeOfString:@".test.66buy.com.cn"].location != NSNotFound) {
        cookieDomain = @".test.66buy.com.cn";
    } else if([url rangeOfString:@".dev.66buy.com.cn"].location != NSNotFound) {
        cookieDomain = @".dev.66buy.com.cn";
    }
    return cookieDomain;
}

+ (void)removeCookieWithKey:(NSString *)key {
    NSHTTPCookie *cookie;
    NSHTTPCookieStorage *storage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    for(cookie in [storage cookies])
    {
        if([cookie.name isEqualToString:key])
        {
            [storage deleteCookie:cookie];
        }
    }
}

@end
