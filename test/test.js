'use strict';

var grunt = require('grunt');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
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
    var actualExt = grunt.file.read('tmp/ext/helloext.pres');


    var expectedHello = grunt.file.read('test/expect/helloworld.js');
    var expectedRecurse = grunt.file.read('test/expect/hellorecurse.js');
    var expectedExt = grunt.file.read('test/expect/ext/helloext.pres');


    test.equal(expectedHello, actualHello, "expected hello javascript did not match the actual javascript");
    test.equal(expectedRecurse, actualRecurse, "expected recurse javascript did not match the actual javascript");
    test.equal(expectedExt, actualExt, "expected ext javascript did not match the actual javascript");


    test.done();
  },

  build_process: function(test) {
    var actual = grunt.file.read('tmp/process.js');
    var expected = grunt.file.read('test/expect/process.js');

    test.equal(expected, actual, "expected javascript did not match the actual javascript");
    test.done();
  },

  build_ext: function(test) {
    var actual = grunt.file.read('tmp/helloext.js');
    var expected = grunt.file.read('test/expect/helloext.js');

    test.equal(expected, actual, "expected javascript did not match the actual javascript");
    test.done();
  },

  exclude_files_with_a_specific_extension: function(test) {
    var filelist = fs.readdirSync('tmp'),
        has_file = _.contains(filelist, 'not_included_file.txt');

    test.equal(false, has_file, 'the file list should not include not_included_file.txt');
    test.done();
  }
};