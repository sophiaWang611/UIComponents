/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "PickerViewManager.h"

#import "RCTBridge.h"
#import "RCTConvert.h"
#import "PickerView.h"

@implementation PickerViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [PickerView new];
}

RCT_EXPORT_VIEW_PROPERTY(items, NSArray)
RCT_EXPORT_VIEW_PROPERTY(selectedIndex, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(childIndex, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(componentSize, NSInteger)

- (NSDictionary *)constantsToExport
{
  UIPickerView *view = [UIPickerView new];
  CGRect rect = [[UIScreen mainScreen] bounds];
  
  return @{
           @"ComponentHeight": @(view.intrinsicContentSize.height),
           @"ComponentWidth": @(view.intrinsicContentSize.width),
           @"ScreenHeight": @(rect.size.height),
           @"ScreenWidth": @(rect.size.width)
           };
}

@end
