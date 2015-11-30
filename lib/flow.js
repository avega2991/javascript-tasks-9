'use strict';

module.exports.serial = function (funcArray, callback) {
    var idx = 0;
    var lastFuncIdx = funcArray.length - 1;

    if (idx == lastFuncIdx) {
        return;
    }

    var nextCallback = function (error, data) {
        if (error) {
            callback(error, data);
        };

        ++idx;
        if (idx < funcArray.length) {
            funcArray[idx](data, nextCallback);
        };
    };
    
    funcArray[0](nextCallback);
};

module.exports.parallel = function (funcArray, callback) {
    var result = [];
    var nextCallback = function (error, data) {
        result.push(data);
        if (error || result.length == funcArray.length) {
            callback(error, result);
        };
    };
    funcArray.forEach(function (func) {
        setTimeout(func, 0, nextCallback);
    });
};

module.exports.map = function (valueArray, func, callback) {
    var result = [];
    var nextCallback = function (error, data) {
        result.push(data);
        if (error || result.length == valueArray.length) {
            callback(error, result);
        };
    };
    valueArray.forEach(function (val) {
        setTimeout(func, 0, val, nextCallback);
    });
};
