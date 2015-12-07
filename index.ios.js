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

var Input = require("./app/input/Input");
var Picker = require("./app/picker/PickerView.ios");

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
      </View>
    );
  },

  _renderInput: function() {
    return (
        <View>
          <Text>输入框控件</Text>
          <Input size={"sm"} width={300}/>
        </View>
    );
  },

  _renderPicker: function() {
    var items = [["A", "B", "C"]];

    return (
        <View style={styles.mt40}>
          <TouchableOpacity onPress={()=>{this.setState({isShowPicker:true})}}>
            <Text>Show picker</Text>
          </TouchableOpacity>
          <Picker items={items}
                  isShow={this.state.isShowPicker}/>
        </View>
    );
  }
});

var styles = StyleSheet.create({
  mt40: {
    marginTop: 40
  }
});

AppRegistry.registerComponent('Components', () => Components);
