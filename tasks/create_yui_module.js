/*jslint node:true, nomen:true, stupid:true, vars:true */
/*global grunt */

/*
 * grunt-create-yui-module
 */

'use strict';

var path = require('path');

module.exports = function (grunt) {

    var create_yui_module = require('./lib/create_yui_module').init(grunt);

    grunt.registerMultiTask('create_yui_module', 'Make a YUI module out of any Javascript file.', function () {
        var source = this.data.src || this.data.files.src || '';
        var destination = this.data.dest  || this.data.files.dest || '';
        var options = this.options() || {};
        var template;

        function validate(str) {
            if(!str || typeof str !== "string" || str.length === 0) {
                grunt.fatal(str + " is not a valid source or destination.");
            }
        }

        validate(source);
        validate(destination);

        template = create_yui_module.run(source, options);
        grunt.file.write(destination, template);
    });

};
