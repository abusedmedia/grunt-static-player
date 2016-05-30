/*
 * grunt-json-templating
 * https://github.com/abused/grunt-json-templating
 *
 * Copyright (c) 2015 abusedmedia
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    json_generator: {

      partials_in_folder: {

        options: {
          data: {title:'HEY'},
          excludePartialNotation:false
        },

        files: [
          {
            expand: true,
            cwd: 'test/test_1',
            src: ['*.html', '*/*.html', '!partials/*.html'], 
            dest: 'dest/'
          }
        ]
      },

      partials_not_organized: {

        options: {
          data: {title:'HEY'},
          excludePartialNotation:true
        },

        files: [
          {
            expand: true,
            cwd: 'test/test_2',
            src: ['*.html', '*/*.html'], 
            dest: 'dest/'
          }
        ]
      }


    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.registerTask('a', ['json_generator:partials_in_folder']);
  grunt.registerTask('b', ['json_generator:partials_not_organized']);

};
