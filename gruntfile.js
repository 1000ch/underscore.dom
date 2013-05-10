module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: ["./_.domextend.js"]
		},
		uglify: {
			js: {
				files: {
					"./_.domextend.min.js": ["./_.domextend.js"]
				}
			}
		},
		watch: {
			files: ["./_.domextend.js"],
			tasks: ["jshint", "uglify"]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask("default", "watch");
};
