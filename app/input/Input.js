/**
 * Created by sophia on 15/12/4.
 */
'use strict';

var React = require('react-native');
var InputView = require('./InputView');

var {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    PropTypes,
    PixelRatio
    } = React;

const screenWidth = Dimensions.get("window").width;

var Input = React.createClass({
    propTypes: {
        /**
         * input container's with.
         * will be init with screen with
         */
        width: PropTypes.number,

        /**
         * size of input
         */
        size: PropTypes.oneOf(["sm", "md", "lg"]),

        /**
         * type of input.
         * will format input string when typing according this
         */
        type: PropTypes.oneOf([
            "phone",
            "car"
        ]),

        /**
         * format rule.
         * just like "### #### ####", should only contain "#" and " "(space)
         */
        mask: PropTypes.string,

        showClearButton: PropTypes.bool
    },

    getDefaultProps(){
        return {
            width: Dimensions.get("window").width,
            //extend from InputView
            placeholder: "请填写",
            showClearButton: true
        }
    },

    getInitialState: function () {
        return {
            value: this.props.value || ""
        };
    },

    render: function () {
        //get container's style, default is md
        var size = styles["input_" + (this.props.size || "md")];

        var mask = "";
        if (this.props.mask) {
            mask = this.props.mask;
        } else {
            if (this.props.type === "phone") {
                mask = "### #### ####";
            } else if (this.props.type === "car") {
                mask = "#### #### #### #### ####"
            }
        }

        return (
            <View style={[styles.container, {width:this.props.width}]}>
                <InputView
                    {...this.props}
                    placeholder={this.props.placeholder}
                    style={[size, styles.inputStyle, this.props.style]}
                    value={this.state.value}
                    onChangeText={this._onChangeText}
                    mask={mask}
                    />
            </View>
        );
    },

    _onChangeText: function(text) {
        this.setState({
            value: text
        });
        this.props.onChangeText && this.props.onChangeText(text.replace(/ /g, ""));
    }
});

var styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        flexDirection: "row",
        borderColor: "#DDD",
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get(),
    },

    input_sm: {
        height: 25,
        width: screenWidth / 3,
        fontSize: 14
    },
    input_md: {
        height: 30,
        width: screenWidth / 2,
        fontSize: 16
    },
    input_lg: {
        height: 40,
        width: screenWidth,
        fontSize: 18
    },
    inputStyle:{
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 1,
        marginBottom: 1,
        flex: 1,
    },
});

module.exports = Input;