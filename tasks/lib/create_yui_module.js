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
                version = options.version || '';

            var top, ns, content, bottom;

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

                if(typeof name === "string") {
                    str = openStr + name + closeStr;
                }

                return str;
            }

            function buildRequires(requires) {
                var YUI_REQUIRES_CLOSE = "]",
                    requiresStr = ', [', length;

                if(!is_array(requires)) {
                    return '';
                }

                length = requires.length;

                if(length === 0) {
                    return '';
                } else {
                    for(var i = 0; i < length; i++) {
                        requiresStr += requires[i];
                    }
                }

                requiresStr += YUI_REQUIRES_CLOSE;
                return requiresStr;
            }

            top = buildStr(moduleName, YUI_ADD_OPEN) + YUI_FUNCTION_OPEN;
            ns = buildStr(namespace, YUI_NAMESPACE_OPEN, YUI_NAMESPACE_CLOSE);
            content = grunt.file.read(source);
            bottom = YUI_FUNCTION_CLOSE + buildStr(version, YUI_VERSION_OPEN, YUI_VERSION_CLOSE) + buildRequires(requires) + YUI_ADD_CLOSE;

            console.log(top + ns + content + bottom);
        }
    };
};
