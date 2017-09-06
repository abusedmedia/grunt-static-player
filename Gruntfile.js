/*
 * grunt-json-templating
 * https://github.com/abused/grunt-json-templating
 *
 * Copyright (c) 2015 abusedmedia
 * Licensed under the MIT license.
 */

'use strict'

module.exports = function (grunt) {
  grunt.initConfig({

    static_player: {

      test: {
        files: [
          {
            expand: true,
            cwd: 'examples/10_svg_big',
            src: ['*.html'],
            dest: 'dest/'
          }
        ]
      },

      examples: {

        options: {
          data: {data: {title: 'Title', items: [{name: 'A'}, {name: 'B'}], html: '<ul><li>Item</li></ul>'} },
          excludePartialNotation: true
        },

        files: [
          {
            expand: true,
            cwd: 'examples',
            src: ['*/*.html'],
            dest: 'dest/'
          }
        ]
      },

      partials_in_folder: {

        options: {
          data: {title: 'HEY'},
          excludePartialNotation: false
        },

        files: [
          {
            expand: true,
            cwd: 'test/test_1',
            src: ['*.html', '*/*.html', '!partials/*.html'],
            dest: 'dest/test_1'
          }
        ]
      },

      partials_not_organized: {

        options: {
          data: {title: 'HEY'},
          excludePartialNotation: true
        },

        files: [
          {
            expand: true,
            cwd: 'test/test_2',
            src: ['*.html', '*/*.html'],
            dest: 'dest/test_2'
          }
        ]
      }

    }

  })

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks')

  grunt.registerTask('examples', ['static_player:examples'])
  grunt.registerTask('t', ['static_player:test'])
  grunt.registerTask('a', ['static_player:partials_in_folder'])
  grunt.registerTask('b', ['static_player:partials_not_organized'])
  grunt.registerTask('all', ['examples', 'a', 'b'])
}
