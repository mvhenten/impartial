"use strict";

var test = require("tape");
var impartial = require("../index");
var slice = require("sliced");


test("impartial", function(assert) {
    var dummy = function() {
        return slice(arguments);
    };

    var cases = [
        {
            label: "Slices the last given argument and no more",
            args: [-1],
            expect: [5]
        },
        {
            label: "Does not slice beyond argument boundary",
            args: [7],
            expect: []
        },
        {
            label: "Grab exactly two args",
            args: [2, 4],
            expect: [3,4]
        },
        {
            label: "Slice with start 2 and no end",
            args: [2],
            expect: [3, 4, 5]
        },
        {
            label: "Slice exactly one argument",
            args: [2,3],
            expect: [3]
        },
        {
            label: "Slice the last two arguments",
            args: [-2],
            expect: [4,5]
        }
    ];

    cases.forEach(function(testCase) {
        var fn = impartial.apply(null, [].concat(dummy, testCase.args));
        assert.deepEqual(fn(1,2,3,4,5), testCase.expect, testCase.label);
    });

    assert.end();
});