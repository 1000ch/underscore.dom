module.exports = (grunt) ->

  grunt.initConfig
    jshint:
      all: ['./src/underscore.dom.js']
    concat:
      underscore_dom:
        src: [
          './underscore/underscore.js',
          './src/underscore.dom.js'
        ]
        dest: './dist/underscore.dom.js'
      underscore_pack:
        src: [
          './underscore/underscore.js',
          './src/underscore.dom.js',
          './reqwest/reqwest.js',
          './when/when.js',
          './src/export.js'
        ]
        dest: './dist/underscore.pack.js'
      lodash_dom:
        src: [
          './lodash/lodash.js',
          './src/underscore.dom.js'
        ]
        dest: './dist/lodash.dom.js'
      lodash_pack:
        src: [
          './lodash/lodash.js',
          './src/underscore.dom.js',
          './reqwest/reqwest.js',
          './when/when.js',
          './src/export.js'
        ]
        dest: './dist/lodash.pack.js'
    uglify:
      underscore_dom:
        files:
          './dist/underscore.dom.min.js': ['./dist/underscore.dom.js']
      underscore_pack:
        files:
          './dist/underscore.pack.min.js': ['./dist/underscore.pack.js']
      lodash_dom:
        files:
          './dist/lodash.dom.min.js': ['./dist/lodash.dom.js']
      lodash_pack:
        files:
          './dist/lodash.pack.min.js': ['./dist/lodash.pack.js']

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.registerTask 'default', 'watch'
  grunt.registerTask 'build', ['concat', 'uglify']
