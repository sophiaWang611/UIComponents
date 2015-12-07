/**
 * Created by sophia on 15/12/7.
 */
'use strict';

var React = require('react-native');
var InputView = require('../Input/Input');

var {
    StyleSheet,
    Text,
    View,
    Image,
    PixelRatio,
    TouchableOpacity,
    } = React;


var TextArea = React.createClass({
    getInitialState:function(){
        return {
            value:this.props.value || '',
            besides:0
        }
    },
    getDefaultProps(){
        return {
            maxLength: null,
            autoFocus: false
        }
    },
    componentWillMount:function(){
        this._updateBesides();
    },
    _updateBesides:function(){
        var len = this.state.value.length;
        if(this.props.maxLength){
            var besides = this.props.maxLength - len;
            this.setState({besides});
        }
    },
    _onChangeText:function(value){
        this.setState({value:value});
        setTimeout(() => {
            this._updateBesides();
        },2);

        if (typeof this.props.onChangeText === 'function'){
            this.props.onChangeText(value);
        }
    },
    componentWillReceiveProps:function(nextProps){
        this.setState({value:nextProps.value});
    },
    render:function(){
        var besides = this.props.maxLength ?
            <Text style={styles.besides}>{this.state.besides}</Text> : null;
        return (
            <View>
                <InputView
                    autoFocus={this.props.autoFocus}
                    maxLength={this.props.maxLength}
                    placeholder={this.props.placeholder}
                    returnKeyType={'next'}
                    clearButtonMode={'while-editing'}
                    style={[styles.textarea]}
                    onChangeText={this._onChangeText}
                    multiline={true}
                    value={this.state.value}

                    />
                {besides}
            </View>
        )
    }
});

var styles = StyleSheet.create({
    textarea:{
        fontSize:14,
        color:'#444',
        height:98,
        backgroundColor:'#fff',
    },
    besides:{
        position:'absolute',
        right:10,
        bottom:10,
        color:'#999',
        backgroundColor:'rgba(0,0,0,0)',
        fontSize:12
    },
});

module.exports = TextArea;