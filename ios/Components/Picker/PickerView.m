/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "PickerView.h"

#import "RCTUtils.h"
#import "UIView+React.h"

@interface PickerView() <UIPickerViewDataSource, UIPickerViewDelegate>

@property (nonatomic, copy) NSArray *items;
@property (nonatomic, assign) NSInteger selectedIndex;
@property (nonatomic, assign) NSInteger childIndex;
@property (nonatomic, copy) RCTBubblingEventBlock onChange;
@property (nonatomic, assign) NSInteger componentSize;

@property (strong, nonatomic) NSArray *firstArray;
@property (strong, nonatomic) NSArray *secondArray;

@end

@implementation PickerView

- (instancetype)initWithFrame:(CGRect)frame
{
  frame = CGRectMake(0, 0, [[UIScreen mainScreen] bounds].size.width, [UIPickerView new].intrinsicContentSize.height);
  if ((self = [super initWithFrame:frame])) {
    _selectedIndex = NSNotFound;
    self.delegate = self;
  }
  return self;
}


RCT_NOT_IMPLEMENTED(- (instancetype)initWithCoder:(NSCoder *)aDecoder)

- (void)setItems:(NSDictionary *)items
{
  _items = [items copy];
  _componentSize = _items.count;
  
  self.firstArray = [self.items objectAtIndex:0];

  if (_componentSize > 1) {
    self.secondArray = [self.items objectAtIndex:1];
  }
  [self setNeedsLayout];
}

- (void)setSelectedIndex:(NSInteger)selectedIndex
{
  if (_selectedIndex != selectedIndex) {
    BOOL animated = _selectedIndex != NSNotFound; // Don't animate the initial value
    _selectedIndex = selectedIndex;
    dispatch_async(dispatch_get_main_queue(), ^{
      [self selectRow:selectedIndex inComponent:0 animated:animated];
      if (_componentSize == 2) {
        [self selectRow:self.childIndex inComponent:1 animated:animated];
      }
    });
  }
}

#pragma mark - UIPickerViewDataSource protocol

- (NSInteger)numberOfComponentsInPickerView:(__unused UIPickerView *)pickerView
{
  return self.componentSize;
}

- (NSInteger)pickerView:(__unused UIPickerView *)pickerView
numberOfRowsInComponent:(__unused NSInteger)component
{
  if (component == 0) {
    return self.firstArray.count;
  } else {
    return self.secondArray.count;
  }
}

#pragma mark - UIPickerViewDelegate methods

- (NSDictionary *)itemForRow:(NSInteger)row component:(__unused NSInteger)component
{
  if (component == 0) {
    return self.firstArray[row];
  } else {
    return self.secondArray[row];
  }
}

- (NSString *)pickerView:(__unused UIPickerView *)pickerView
             titleForRow:(NSInteger)row forComponent:(__unused NSInteger)component
{
  if (component == 0) {
    NSString *stringFloat = [NSString stringWithFormat:@"%@", [self.firstArray objectAtIndex:row]];
    return stringFloat;
  } else {
    NSString *stringFloat = [NSString stringWithFormat:@"%@", [self.secondArray objectAtIndex:row]];
    return stringFloat;
  }
}

- (void)pickerView:(__unused UIPickerView *)pickerView
      didSelectRow:(NSInteger)row inComponent:(__unused NSInteger)component
{
  if (component == 0) {
    _selectedIndex = row;
  } else {
    _childIndex = row;
  }
  
  if (_onChange){
    _onChange(@{
                @"firstIndex": @(_selectedIndex),
                @"secondIndex": @(_childIndex)
                });
  }
  
}

@end
