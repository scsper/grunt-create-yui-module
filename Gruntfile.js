module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      all: ['test/test.js']
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
      files: {
        src: 'test/fixtures/helloworld.js',
        dest: 'test/expect/helloworld.js',
        options: {
          moduleName: 'mail-core-compose-template',
          namespace: 'ui.Templates',
          version: '1.0.0',
          requires: []
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', ['create_yui_module', 'test']);
  grunt.registerTask('test', ['nodeunit']);

};
