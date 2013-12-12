'use strict';

var grunt = require('grunt');
var create_yui_module = require('../tasks/lib/create_yui_module').init(grunt);


exports.nodeunit = {
  please_work: function(test) {
    test.expect(1);
    test.ok(true, 'this had better work.');
    test.done();
  },
};