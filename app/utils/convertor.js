/**
 * Created by sophia on 15/11/10.
 */
'use strict';

var React = require('react-native');

var Convertor = {

    convertMoney: function(num) {
        return parseFloat((num * 0.01).toFixed(2));
    },
    convertDate: function(date) {
        var data = null;

        if (Object.prototype.toString.apply(date) === '[object Date]') {
            data = date;
        }
        if (Object.prototype.toString.apply(date) === '[object Number]') {
            data = new Date(date);
        }
        if (data != null) {
            return data.getFullYear() + "-" + (data.getMonth() + 1) + "-"
                + data.getDate() + " " + data.getHours() + ":" + data.getMinutes();
        }

        console.log("数据格式不匹配：" + date);
        return "";
    },
    getCurrentTime: function() {
        var date = new Date();
        return date.getHours() + ":" + date.getMinutes();
    }
};

module.exports = Convertor;