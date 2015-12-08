//
//  MSTableView.h
//  MishiBuyer
//
//  Created by sophia on 15/11/19.
//  Copyright © 2015年 Mishi Technology. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RNTableView.h"
#import "UIView+React.h"

@interface TableView : RNTableView

@property (nonatomic) BOOL showDelInEdit;
@property (nonatomic, copy) RCTBubblingEventBlock loadMore;

@end
