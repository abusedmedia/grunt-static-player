# grunt-static-player [![npm version](https://badge.fury.io/js/grunt-static-player.svg)](https://badge.fury.io/js/grunt-static-player)

> Simply let you to generate static files based on json array.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-static-player --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-static-player’);
```

### To update the package on the registry

Tag with ```npm run tag``` then ```npm publish```

 

## The “static_player” task

### Overview
In your project's Gruntfile, add a section named `static_player` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  static_player: {
    options: {
      data: your_data_source_array, // the source array, yes you can load an external json file
      field_for_filename: 'filename', // the field key you want to use to name the generated files
      extension: 'html' // the file extension of the generated files
    },

    files: {
      'dest': 'test/template_1.html' // here you define the destination folder and the template file
    }
  },
});
```

