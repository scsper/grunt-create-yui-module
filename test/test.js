'use strict';

var grunt = require('grunt');
var path = require('path');
var create_yui_module = require('../tasks/lib/create_yui_module').init(grunt);


exports.nodeunit = {
  build_module_with_no_version: function(test) {
    test.expect(1);
    test.ok(true, 'this had better work.');
    test.done();
  },

  build_module_with_everything: function(test) {
    var filepath = 'tmp/module_with_everything.js';
    // var filepath = 'tmp/helloworld.js';
    var expected = grunt.file.read(filepath),
        source = 'fixtures/helloworld.js',
        options = {
          moduleName: 'mail-core-compose-template',
          namespace: 'ui.Templates',
          version: '1.0.0',
          requires: ['module1', 'module2']
        };

    var actual = create_yui_module.run(source, options);

    test.ok(expected === actual, "expected did not match the actual");
  }
};