module.exports = (grunt) ->

  grunt.initConfig
    jshint:
      all: ["./src/underscore.affix.js"]
    uglify:
      js:
        files:
          "./dist/underscore.affix.min.js": ["./src/underscore.affix.js"]
    watch:
      files: ["./src/underscore.affix.js"]
      tasks: ["jshint", "uglify"]

  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask "default", "watch"
  grunt.registerTask "build", "uglify"
