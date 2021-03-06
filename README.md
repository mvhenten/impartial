# impartial

Slice arguments before they exists. e.g. makes your function "impartial" to some 
of the arguments.

Consider this a negation of "curry" in the sense that it allows you to slice
arguments passed to the function before they exist.

You could also see this as an inverse of `_.partial`, hence the name.
If you need something like this, maybe your api's don't fit well together.

### Install

`npm install impartial`

### Examples

```javascript
    var impartial = require("impartial");

    // in an async world, keep the "next" and ignore the rest:
    
    async.waterfall([
        function giveTwo(next){
            next(null, 1, 2 );
        },
        // block all except the last arg
        // so we can predict our async loop
        impartial(function(two, next){
            next(null, two+1);
        }, -1)
    ], done)

```

Or like the tests:

```javascript
    var impartial = require("impartial");

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
```

