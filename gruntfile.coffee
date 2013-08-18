module.exports = (grunt) ->

  grunt.initConfig
    jshint:
      all: ["./src/_.domextend.js"]
    uglify:
      js:
        files:
          "./dist/_.domextend.min.js": ["./src/_.domextend.js"]
    watch:
      files: ["./src/_.domextend.js"]
      tasks: ["jshint", "uglify"]

  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask "default", "watch"
