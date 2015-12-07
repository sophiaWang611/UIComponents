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
} = React;

var Input = require("./app/input/Input");

var Components = React.createClass({
  render: function() {
    return (
      <View style={[styles.container]}>
        <Input size={"sm"} width={300} type={"number"}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 40
  }
});

AppRegistry.registerComponent('Components', () => Components);
