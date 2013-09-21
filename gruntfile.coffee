module.exports = (grunt) ->

  grunt.initConfig
    jshint:
      all: ["./src/underscore.affix.js"]
    concat:
      underscore_affix:
        src: [
          "./underscore/underscore.js",
          "./src/underscore.affix.js"
        ]
        dest: "./dist/underscore.affix.js"
      underscore_pack:
        src: [
          "./underscore/underscore.js",
          "./src/underscore.affix.js",
          "./reqwest/reqwest.js",
          "./when/when.js",
          "./src/export.js"
        ]
        dest: "./dist/underscore.pack.js"
      lodash_affix:
        src: [
          "./lodash/lodash.js",
          "./src/underscore.affix.js"
        ]
        dest: "./dist/lodash.affix.js"
      lodash_pack:
        src: [
          "./lodash/lodash.js",
          "./src/underscore.affix.js",
          "./reqwest/reqwest.js",
          "./when/when.js",
          "./src/export.js"
        ]
        dest: "./dist/lodash.pack.js"
    uglify:
      underscore_affix:
        files:
          "./dist/underscore.affix.min.js": ["./dist/underscore.affix.js"]
      underscore_pack:
        files:
          "./dist/underscore.pack.min.js": ["./dist/underscore.pack.js"]
      lodash_affix:
        files:
          "./dist/lodash.affix.min.js": ["./dist/lodash.affix.js"]
      lodash_pack:
        files:
          "./dist/lodash.pack.min.js": ["./dist/lodash.pack.js"]
    watch:
      files: ["./src/underscore.affix.js"]
      tasks: ["jshint", "concat", "uglify"]

  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-jshint"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-watch"

  grunt.registerTask "default", "watch"
  grunt.registerTask "build", ["concat", "uglify"]
