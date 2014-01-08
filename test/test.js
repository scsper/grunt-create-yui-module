'use strict';

var grunt = require('grunt');
var path = require('path');
var create_yui_module = require('../tasks/lib/create_yui_module').init(grunt);


exports.nodeunit = {
  build_all: function(test) {
    var actual = grunt.file.read('tmp/all.js');
    var expected = grunt.file.read('test/expect/all.js');

    test.equal(expected, actual, "expected javascript did not match the actual javascript");
    test.done();
  },

  build_no_version: function(test) {
    var actual = grunt.file.read('tmp/no_version.js');
    var expected = grunt.file.read('test/expect/no_version.js');

    test.equal(expected, actual, "expected javascript did not match the actual javascript");
    test.done();
  },

  build_no_namespace: function(test) {
    var actual = grunt.file.read('tmp/no_namespace.js');
    var expected = grunt.file.read('test/expect/no_namespace.js');

    test.equal(expected, actual, "expected javascript did not match the actual javascript");
    test.done();
  },

  build_no_requires: function(test) {
    var actual = grunt.file.read('tmp/no_requires.js');
    var expected = grunt.file.read('test/expect/no_requires.js');

    test.equal(expected, actual, "expected javascript did not match the actual javascript");
    test.done();
  },

  build_recursion: function(test) {
    var actualHello = grunt.file.read('tmp/helloworld.js');
    var actualRecurse = grunt.file.read('tmp/hellorecurse.js');

    var expectedHello = grunt.file.read('test/expect/helloworld.js');
    var expectedRecurse = grunt.file.read('test/expect/hellorecurse.js');

    test.equal(expectedHello, actualHello, "expected hello javascript did not match the actual javascript");
    test.equal(expectedRecurse, actualRecurse, "expected recurse javascript did not match the actual javascript");

    test.done();
  }
};