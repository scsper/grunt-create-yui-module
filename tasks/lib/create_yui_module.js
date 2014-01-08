/*jslint node:true, nomen:true, stupid:true, vars:true */
/*global grunt */

/*
 * grunt-create-yui-module
 */

'use strict';

var path = require('path');

exports.init = function (grunt) {
    return {
        run: function(source, options) {
            var YUI_ADD_OPEN = "YUI.add('",
                YUI_ADD_CLOSE = ");",
                YUI_FUNCTION_OPEN = "',function(Y){",
                YUI_FUNCTION_CLOSE = '}',
                YUI_NAMESPACE_OPEN = "Y.namespace('",
                YUI_NAMESPACE_CLOSE = "');",
                YUI_VERSION_OPEN = ", '",
                YUI_VERSION_CLOSE = "'",
                YUI_MODULE_CLOSE = ");";

            var namespace = options.namespace || '',
                requires = options.requires || [],
                moduleName = options.moduleName || '',
                version = options.version || '',
                process = options.process || null;

            var top, ns, content, bottom, template;

            if(!moduleName || typeof moduleName !== "string" || moduleName.length === 0) {
                grunt.fatal('Please provide a module name.');
            }

            function is_array(value) {
                return value &&
                    typeof value === 'object' &&
                    typeof value.length === 'number' &&
                    typeof value.splice === 'function' &&
                    !(value.propertyIsEnumerable('length'));
            }

            function buildStr(name, open, close) {
                var str = '',
                    openStr = open || '',
                    closeStr = close || '';

                if(typeof name === "string" && name.length > 0) {
                    str = openStr + name + closeStr;
                }

                return str;
            }

            function buildRequires(requires) {
                var close = "]",
                    requiresStr = ', [',
                    length, i;

                if(!is_array(requires)) {
                    return '';
                }

                length = requires.length;

                if(length === 0) {
                    return '';
                } else {
                    for(i = 0; i < length; i++) {
                        if(i > 0) requiresStr += ',';
                        requiresStr += "'" + requires[i] + "'";
                    }
                }

                requiresStr += close;
                return requiresStr;
            }

            top = buildStr(moduleName, YUI_ADD_OPEN) + YUI_FUNCTION_OPEN;
            ns = buildStr(namespace, YUI_NAMESPACE_OPEN, YUI_NAMESPACE_CLOSE);
            content = grunt.file.read(source);

            if(process) {
                content = process(content);
            }

            bottom = YUI_FUNCTION_CLOSE + buildStr(version, YUI_VERSION_OPEN, YUI_VERSION_CLOSE) + buildRequires(requires) + YUI_ADD_CLOSE;

            template = top + ns + content + bottom;

            return template;
        }
    };
};
