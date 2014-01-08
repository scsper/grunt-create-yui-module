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
        var exclude_extension = options.exclude || false;
        var template;

        function validate(str) {
            if(!str || typeof str !== "string" || str.length === 0) {
                grunt.fatal(str + " is not a valid source or destination.");
            }
        }

        function is_folder() {
            var source_extension = path.extname(source);
            var dest_extension = path.extname(destinationRoot);

            if(source_extension !== "" || dest_extension !== "") { // if the source path has a dot
                return false;
            }
            return true;
        }

        function run(source, destPath) {
            validate(source);
            validate(destinationRoot);

            template = create_yui_module.run(source, options);
            grunt.file.write(destinationRoot + destPath, template);
        }

        if(is_folder()) {
            grunt.file.recurse(source, function cb(abspath, rootdir, subdir, filename) {

                if(exclude_extension && path.extname(abspath) === exclude_extension) {
                    return;
                }

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
