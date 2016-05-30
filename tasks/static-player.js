/*
 * grunt-json-templating
 * https://github.com/abused/grunt-json-templating
 *
 * Copyright (c) 2015 abusedmedia
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');
  var fs = require('fs');
  var _ = require('lodash');

  grunt.registerMultiTask('static_player', 'Bake partials with lodash templating', function() {
    
    var options = this.options({data: null, excludePartialNotation:false});

    var data = options.data;

    this.files.forEach(function(f) {
      var src = f.src[0];
      var isPartial = (options.excludePartialNotation && src.match(/\/_.*.htm/g))
      if(!isPartial){
        var file = grunt.file.read(src);
        var compiled = checkPartials(file, f.orig.cwd)  
        console.log(compiled)

        var processed = grunt.template.process(compiled, options);
        grunt.file.write(f.dest, processed);
      }    
    });


    function checkPartials(file, cwd){
      var newfile = file
      var tags = file.match(/<\w+\s+(process).*?>(.*?)<\/.*?>/g)
      console.log(tags)
      if(tags){
        tags.forEach(function(d, i){
            var tag = tags[i]
            var attr = tag.match(/process="([^"]+)"/g)
            //console.log(attr)
            if(attr){
              var val = attr[0].match(/([",'])(.+)([",'])/g)
              var clean_val = val[0].replace(/"/g, '').replace(/'/g, '')
              //console.log(clean_val)

              var filepart = grunt.file.read(cwd + '/' + clean_val);
              //console.log(filepart)

              file = file.replace(tag, filepart)

              var parttag = filepart.match(/<\w+\s+(process).*?>(.*?)<\/.*?>/g)
              if(parttag){
                file = checkPartials(file, cwd)
              }
            }
        })
      }
      return file;
    }





  });

};
