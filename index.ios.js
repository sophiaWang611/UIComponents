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
  TouchableOpacity
} = React;

var {
    Input,
    Picker,
    TextArea,
    ListView
} = require("./app/index");

var Components = React.createClass({
  getInitialState: function() {
    return {
      isShowPicker: true
    };
  },

  render: function() {
    return (
      <View style={[styles.mt40]}>
        {this._renderInput()}
        {this._renderPicker()}
        {this._renderTextArea()}
      </View>
    );
  },

  _renderInput: function() {
    return (
        <View>
          <Text>输入框控件</Text>
          <View style={styles.mt10}><Input size={"sm"} width={300}/></View>
        </View>
    );
  },

  _renderPicker: function() {
    var items = [["A", "B", "C"]];

    return (
        <View style={styles.mt40}>
          <TouchableOpacity onPress={()=>{this.setState({isShowPicker:true})}}>
            <Text>点击显示选择器控件</Text>
          </TouchableOpacity>
          <View style={styles.mt10}>
            <Picker items={items}
                    isShow={this.state.isShowPicker}/>
          </View>
        </View>
    );
  },

  _renderTextArea: function() {
    return (
        <View style={styles.mt40}>
          <Text>输入框计字数控件</Text>
          <View style={styles.mt10}>
            <TextArea maxLength={100}/>
          </View>
        </View>
    );
  }
});

var styles = StyleSheet.create({
  mt10: {
    marginTop: 10
  },
  mt40: {
    marginTop: 40
  }
});

AppRegistry.registerComponent('Components', () => Components);
