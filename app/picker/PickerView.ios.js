/**
 * This is extend from React native v0.13.0
 *
 * items = [[],[]]
 * titles=['','']
 * defaultIndex = [1,2]
 *
 * <Picker
 *  items={items} 传入值
 *  titles={titles}
 *  defaultIndex={defaultIndex}
 *  isShow={this.state.showPicker} 控制是否显示
 *  onChange={(firstIndex, secondIndex)=>{}}
 *  onConfirm={(firstIndex, secondIndex) => { 点击确认后的回调函数
 *      console.log("222222")
 *      console.log(firstIndex);
 *      console.log(secondIndex);
 *      console.log("222222")
 *  }}>
 * </Picker>
 */
'use strict';

var NativeMethodsMixin = require('NativeMethodsMixin');
var React = require('React');
var ReactChildren = require('ReactChildren');
var ReactNativeViewAttributes = require('ReactNativeViewAttributes');
var RCTPickerIOSConsts = require('NativeModules').UIManager.PickerView.Constants;
var StyleSheet = require('StyleSheet');
var View = require('View');
var Text = require('Text');
var TouchableWithoutFeedback = require('TouchableWithoutFeedback');
var PixelRatio = require('PixelRatio');
var Animated = require('Animated');

var requireNativeComponent = require('requireNativeComponent');
var merge = require('merge');

var PICKER = 'picker';

var PickerIOS = React.createClass({
    mixins: [NativeMethodsMixin],

    propTypes: {
        onChange: React.PropTypes.func,//call back fun when selected value changed
        onConfirm: React.PropTypes.func,// call back fun when clicked confirm button
        onCancel: React.PropTypes.func,// call back fun when clicked cancel button
        items: React.PropTypes.any, //picker's data
        titles: React.PropTypes.any, //picker's data title
        defaultIndex: React.PropTypes.number, //default selected index
        isShow: React.PropTypes.bool, //control showable of picker
    },

    getDefaultProps: function() {
        return {
            items: [],
            titles: [],
            defaultIndex: 0,
            isShow: true
        };
    },

    getInitialState: function() {
        if (this.props.defaultIndex) {
            var selectedIndex = this.props.defaultIndex[0] || 0;
            var childIndex = this.props.defaultIndex[1] || 0;
        }
        var top = new Animated.Value(RCTPickerIOSConsts.ScreenHeight);
        var titles = this.props.titles;
        var items = this.props.items;
        var isShow = this.props.isShow;

        return {selectedIndex, childIndex, top, titles, items, isShow};
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            selectedIndex: nextProps.defaultIndex ? (nextProps.defaultIndex[0] || 0) : 0,
            childIndex: nextProps.defaultIndex ? (nextProps.defaultIndex[1] || 0) : 0,
            items: nextProps.items
        });
        var isShow = nextProps.isShow;
        if (isShow) {
            this._showPicker();
        } else {
            this._hidePicker();
        }
    },

    _hidePicker: function() {
        if (this.state && this.state.top) {
            Animated.timing(
                this.state.top,
                {toValue: RCTPickerIOSConsts.ScreenHeight}
            ).start();
        }
    },
    _showPicker: function() {
        if (this.state && this.state.top) {
            var val = RCTPickerIOSConsts.ScreenHeight
                - (40 + RCTPickerIOSConsts.ComponentHeight)
                - 64;
            Animated.timing(
                this.state.top,
                {toValue: val}
            ).start();
        }
    },

    render: function() {
        var titleDiv = <View/>;
        if (this.state.titles && this.state.titles.length == 1) {
            titleDiv = (
                <View style={[styles.titleContainer]}>
                    <Text style={[styles.titleContainerTxt]}>{this.state.titles[0]}</Text>
                </View>
            );
        }
        if (this.state.titles && this.state.titles.length == 2) {
            titleDiv = (
                <View style={[styles.titleContainer]}>
                    <View style={[styles.allCenter, styles.flex1]}>
                        <Text style={[styles.titleContainerTxt]}>{this.state.titles[0]}</Text>
                    </View>
                    <View style={[styles.allCenter, styles.flex1]}>
                        <Text style={[styles.titleContainerTxt]}>{this.state.titles[1]}</Text>
                    </View>
                </View>
            );
        }
        return (
            <Animated.View style={{top:this.state.top,position:"absolute"}}>
                <View style={[styles.pickContainer, this.props.style]}>
                    <View style={[styles.operatorContainer]}>
                        <TouchableWithoutFeedback onPress={()=> {this._onCancel()}}>
                            <View style={[styles.pickBTN,{alignItems:"flex-start"}]}>
                                <Text style={[styles.operatorText]}>取消</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=> {this._onConfirm()}}>
                            <View style={[styles.pickBTN,{alignItems:"flex-end"}]}>
                                <Text style={[styles.operatorText]}>确定</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {titleDiv}
                    <MSPickerIOS
                        ref={PICKER}
                        style={styles.pickerIOS}
                        items={this.state.items}
                        selectedIndex={this.state.selectedIndex}
                        childIndex={this.state.childIndex}
                        componentSize={1}
                        onChange={this._onChange}
                        />
                </View>
            </Animated.View>
        );
    },

    _onChange: function(event) {
        this.setState({
            selectedIndex: event.nativeEvent.firstIndex,
            childIndex: event.nativeEvent.secondIndex,
        });
        if (this.props.onChange) {
            this.props.onChange(event.nativeEvent.firstIndex, event.nativeEvent.secondIndexs);
        }
    },
    _onConfirm: function() {
        if (this.props.onConfirm) {
            this.props.onConfirm(this.state.selectedIndex, this.state.childIndex);
        }
    },
    _onCancel: function() {
        this._hidePicker();
        this.props.onCancel && this.props.onCancel();
    }
});

var styles = StyleSheet.create({
    allCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    flex1: {
        flex: 1
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height:25
    },
    titleContainerTxt: {
        color: "#777",
        fontSize: 14
    },
    operatorContainer: {
        height:40,
        borderColor:"#DDD",
        borderTopWidth: 1/PixelRatio.get(),
        borderBottomWidth: 1/PixelRatio.get(),
        flexDirection: "row",
        backgroundColor: "#F5F5F5"
    },
    operatorText: {
        color: "#21af5e",
        fontSize: 14
    },
    pickerIOS: {
        // The picker will conform to whatever width is given, but we do
        // have to set the component's height explicitly on the
        // surrounding view to ensure it gets rendered.
        height: RCTPickerIOSConsts.ComponentHeight,
    },
    pickContainer: {
        borderTopWidth: 1/PixelRatio.get(),
        borderBottomWidth: 1/PixelRatio.get(),
        borderColor: "#ccc",
        backgroundColor: "#FFF",
        width: RCTPickerIOSConsts.ScreenWidth,
        height: RCTPickerIOSConsts.ComponentHeight + 40
    },
    pickBTN: {
        flex:1,
        justifyContent: 'center',
    }
});

var MSPickerIOS = requireNativeComponent('PickerView', PickerIOS, {
    nativeOnly: {
        items: true,
        onChange: true,
        selectedIndex: true,
        childIndex: true,
        isShow: true,
        componentSize: true,
    },
});

module.exports = PickerIOS;
