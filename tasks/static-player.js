/*
 * grunt-json-templating
 * https://github.com/abused/grunt-json-templating
 *
 * Copyright (c) 2015 abusedmedia
 * Licensed under the MIT license.
 */

'use strict'

module.exports = function (grunt) {
  var path = require('path')
  var fs = require('fs')
  var _ = require('lodash')

  grunt.registerMultiTask('static_player', 'Bake partials with lodash templating', function () {
    var options = this.options({data: null, excludePartialNotation: false, basepath: null})

    var data = options.data

    this.files.forEach(function (f) {
      var src = f.src[0]
      var isPartial = (options.excludePartialNotation && src.match(/\/_.*.htm/g))
      if (!isPartial) {
        // console.log(src)
        var file = grunt.file.read(src)
        var compiled = checkPartials(file, path.dirname(src))
        var processed = grunt.template.process(compiled, options.data)
        grunt.file.write(f.dest, processed)
      }
    })

    function checkPartials (file, base) {
      var newfile = file
      /* prev
      /<.+.(process).*?>(.*?)<\/.*?>/g
      */

      /* works?
      /<{1}([\s\w"'-=\/\.]+process=(".*").*?>(\s*)<\/\w+>)/g
      */
      var tags = file.match(/<{1}([\s\w"'-=\/\.]+process=(".*").*?>(\s*)<\/\w+>)/g)
      // console.log(tags)
      if (tags) {
        tags.forEach(function (d, i) {
          var tag = tags[i]
          var attr = tag.match(/process="([^"]+)"/g)
          var keep = tag.match(/process-keep/g)

          if (attr) {
            var val = attr[0].match(/([",'])(.+)([",'])/g)
            var clean_val = val[0].replace(/"/g, '').replace(/'/g, '')

            var npath = ''
            if (options.basepath) {
              npath = path.join(options.basepath, clean_val)
            } else {
              npath = path.join(base, clean_val)
            }

            var ext = path.extname(clean_val).toLowerCase()

            var filepart = grunt.file.read(npath)
            filepart = filepart.replace(/<!--[\s\S]*?-->/gm, '')  // remove commented html chunks

            if (keep) {
              var kept = tag.replace(/process=/g, 'procesd=')
              kept = kept.replace(/process-keep/g, 'procesd-keep')
              kept = kept.replace(/>.*<\//g, '>' + filepart + '</')
              file = file.replace(tag, kept)
            } else {
              file = file.replace(tag, filepart)
            }

            if (ext !== '.svg') {
              var parttag = filepart.match(/<.+.+(process).*?>(.*?)<\/.*?>/g)

              if (parttag) {
                file = checkPartials(file, base)
              }
            }
          }
        })
      }
      return file
    }
  })
}
