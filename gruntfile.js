module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: ["./lodash.domextend.js"]
		},
		uglify: {
			js: {
				files: {
					"./lodash.domextend.min.js": ["./lodash.domextend.js"]
				}
			}
		},
		watch: {
			files: ["./lodash.domextend.js"],
			tasks: ["jshint", "uglify"]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask("default", "watch");
};
