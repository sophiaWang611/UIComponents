/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ListView,
  ActivityIndicatorIOS,
  Image
} = React;

var {
    Input,
    Picker,
    TextArea,
    RefreshableListView,
} = require("./app/index");

var ScrollableTabView = require('react-native-scrollable-tab-view');
var Convert = require("./app/utils/convertor");

const deviceWidth = Dimensions.get('window').width;

var Components = React.createClass({

  render: function() {
    return (
        <ScrollableTabView initialPage={0}>
          <InputExample tabLabel={"Input"}/>
          <PickerExample tabLabel={"Picker"}/>
          <TextAreaExample tabLabel={"TextArea"}/>
          <ListViewExample tabLabel={"ListView"}/>
        </ScrollableTabView>
    );
  },


});

var InputExample = React.createClass({
  render: function() {
    return (
        <View style={styles.container}>
          <Text>输入框控件</Text>
          <View style={styles.mt10}><Input size={"sm"} width={300}/></View>
        </View>
    );
  }
});

var PickerExample = React.createClass({
  getInitialState: function() {
    return {
      isShowPicker: true
    };
  },

  render: function() {
    var items = [["A", "B", "C"]];

    return (
        <View style={[styles.container]}>
          <TouchableOpacity onPress={()=>{this.setState({isShowPicker:true})}}>
            <Text>点击显示选择器控件</Text>
          </TouchableOpacity>
          <View style={styles.mt10}>
            <Picker items={items}
                    isShow={this.state.isShowPicker}/>
          </View>
        </View>
    );
  }
});

var TextAreaExample = React.createClass({
  render: function() {
    return (
        <View style={[styles.container]}>
          <Text>输入框计字数控件</Text>
          <View style={styles.mt10}>
            <TextArea maxLength={100}/>
          </View>
        </View>
    );
  }
});

var ListViewExample = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      item: [],
      refreshTime: Convert.getCurrentTime(),
      isLoading: true,
      currentPage: 1,
      totalPage: 2
    };
  },

  componentWillMount: function() {
    this._getData();
  },

  render: function() {
    return (
        <RefreshableListView
            style={{width: deviceWidth}}
            onEndReachedThreshold={20}
            dataSource={this.state.dataSource}
            renderRow={this._renderItem}
            loadData={()=>{this._getData()}}
            refreshPrompt=""
            refreshTime={this.state.refreshTime}
            pageSize={this.state.pageSize}
            onEndReached={this._onEndReached}
            isRefreshing={this.state.isLoading}
            renderFooter={this._renderFooter}/>
    );
  },

  _renderItem: function(item) {
    return (
        <View>
          <Text style={styles.mt10}>{item.name}</Text>
        </View>
    );
  },

  _getData: function() {
    var items = this.state.item;
    for (var i = 0; i < 5*this.state.currentPage; i++) {
      items.push({
        name: "Image " + i
      });
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items),
      items: items,
      refreshTime:  Convert.getCurrentTime(),
      isLoading: false
    });
  },

  _onEndReached: function() {
    var currentPage = this.state.currentPage;
    if (currentPage >= this.state.totalPage) {
      return;
    }
    currentPage += 1;
    this._getData();
    this.setState({
      currentPage: currentPage
    });
  },

  _renderFooter: function () {
    if (this.state.currentPage < this.state.totalPage) {
      return <ActivityIndicatorIOS style={[styles.activity]} />;
    }
  },

});

var styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    marginTop: 20
  },
  mt10: {
    marginTop: 10
  },
  activity: {
    marginVertical: 20,
    alignSelf: 'center'
  }
});

AppRegistry.registerComponent('Components', () => Components);
