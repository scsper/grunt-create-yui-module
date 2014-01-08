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
        var destinationRoot = this.data.dest  || this.data.files.dest || '';
        var options = this.options() || {};
        var template;

        function validate(str) {
            if(!str || typeof str !== "string" || str.length === 0) {
                grunt.fatal(str + " is not a valid source or destination.");
            }
        }

        function is_folder() {
            var sourcePath = source.split('.');
            var destPath = destinationRoot.split('.');


            if(sourcePath.length === 1) { // if the source path has a dot
                if(destPath.length !== 1) {
                    grunt.fatal("Both the source and the destination must be folders or files.");
                }
                return true;
            } else {
                if(destPath.length === 1) {
                    grunt.fatal("Both the source and the destination must be folders or files.");
                }
                return false;
            }
        }

        function run(source, destPath) {
            validate(source);
            validate(destinationRoot);

            template = create_yui_module.run(source, options);
            grunt.file.write(destinationRoot + destPath, template);
        }

        if(is_folder()) {
            grunt.file.recurse(source, function cb(abspath, rootdir, subdir, filename) {
                var destPath = "";

                if(subdir) {
                    destPath = subdir;
                }

                destPath += filename;

                run(abspath, destPath);
            });
        } else {
            run(source, "");
        }

    });

};
