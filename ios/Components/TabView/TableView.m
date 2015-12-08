//
//  MSTableView.m
//  MishiBuyer
//
//  Created by sophia on 15/11/19.
//  Copyright © 2015年 Mishi Technology. All rights reserved.
//

#import "TableView.h"

@implementation TableView : RNTableView

//在edit状态取消delete按钮需要实现下面两个回调
-(UITableViewCellEditingStyle)tableView:(UITableView *)tableView editingStyleForRowAtIndexPath:(NSIndexPath *)indexPath
{
  if (_showDelInEdit) {
    return UITableViewCellEditingStyleDelete;
  }
  
  return UITableViewCellEditingStyleNone;
}

-(BOOL)tableView:(UITableView *)tableView shouldIndentWhileEditingRowAtIndexPath:(NSIndexPath *)indexPath
{
  return _showDelInEdit;
}

//去掉默认的分割线
-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
  [tableView setSeparatorStyle:UITableViewCellSeparatorStyleNone];
  return [super.sections count];
}

//下拉到底部时回调
- (void)scrollViewDidScroll:(UIScrollView *)scrollView1
{
  CGPoint offset = scrollView1.contentOffset;
  
  CGRect bounds = scrollView1.bounds;
  CGSize size = scrollView1.contentSize;
  UIEdgeInsets inset = scrollView1.contentInset;
  CGFloat currentOffset = offset.y + bounds.size.height - inset.bottom;
  CGFloat maximumOffset = size.height;
  
  //当currentOffset与maximumOffset的值相等时，说明scrollview已经滑到底部了。也可以根据这两个值的差来让他做点其他的什么事情
  if(currentOffset == maximumOffset)
  {
    if (_loadMore) {
      _loadMore(@{@"isEnd": @(TRUE)});
    }
    
  }
  
}

@end
