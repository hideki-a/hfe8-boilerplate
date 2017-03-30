'use strict';

Array.from(document.querySelectorAll('.js-test-01'), function (elem) {
    console.log(elem.tagName);
});

var a = { foo: 1 };
var b = { bar: 2 };
var c = Object.assign(a, b);
