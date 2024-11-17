#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LocationPermissionModule, NSObject)

RCT_EXTERN_METHOD(requestLocationPermission:(RCTPromiseResolveBlock)resolve
                                     rejecter:(RCTPromiseRejectBlock)reject)

@end
