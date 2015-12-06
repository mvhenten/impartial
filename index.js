"use strict";

var slice = require("sliced");


module.exports = function(callee, start, end){
    return function(){
        return callee.apply(null, slice(arguments, start, end));
    };
};