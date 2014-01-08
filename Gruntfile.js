module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      all: ['test/test.js']
    },

    clean: {
      default: ['tmp'],
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      }
    },

    create_yui_module: {
      all: {
        files: {
          src: 'test/fixtures/helloworld.js',
          dest: 'tmp/all.js',
        },
        options: {
          moduleName: 'mail-core-compose-template',
          namespace: 'ui.Templates',
          version: '1.0.0',
          requires: ['module1', 'module2']
        }
      },

      no_requires: {
        files: {
          src: 'test/fixtures/helloworld.js',
          dest: 'tmp/no_requires.js',
        },
        options: {
          moduleName: 'mail-core-compose-template',
          namespace: 'ui.Templates',
          version: '1.0.0'
        }
      },

      no_version: {
        files: {
          src: 'test/fixtures/helloworld.js',
          dest: 'tmp/no_version.js',
        },
        options: {
          moduleName: 'mail-core-compose-template',
          namespace: 'ui.Templates',
          requires: ['module1', 'module2']
        }
      },

      no_namespace: {
        files: {
          src: 'test/fixtures/helloworld.js',
          dest: 'tmp/no_namespace.js',
        },
        options: {
          moduleName: 'mail-core-compose-template',
          version: '1.0.0',
          requires: ['module1', 'module2']
        }
      },

      recurse: {
        files: {
          src: 'test/fixtures/',
          dest: 'tmp/',
        },
        options: {
          moduleName: 'mail-core-compose-template'
        }
      },

      process: {
        files: {
          src: 'test/fixtures/helloworld.js',
          dest: 'tmp/process.js',
        },
        options: {
          moduleName: 'mail-core-compose-template',
          process: function(content) {
            content = content.replace("Hello", "Goodbye");
            return content;
          }
        }
      },

      ext: {
        files: {
          src: 'test/fixtures/ext/',
          dest: 'tmp/',
          ext: '.js'
        },
        options: {
          moduleName: 'mail-core-compose-template'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', ['clean', 'create_yui_module:all', 'create_yui_module:no_requires', 'create_yui_module:no_version', 'create_yui_module:no_namespace', 'create_yui_module:recurse', 'create_yui_module:process', 'create_yui_module:ext', 'test']);
  grunt.registerTask('test', ['nodeunit']);

};
