 module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';\n'
			},
			assets:{
				src: ['app/assets/js/bootstrap.js', 'app/assets/js/pages/dashboard.js', 'app/assets/js/app.js' ],
				dest: 'app/dist/vendor.js'
			},
			angular:{
				src: [
					  'app/bower_components/angular/angular.js',
					  'app/bower_components/angular-bootstrap/ui-bootstrap.js', 'app/bower_components/angular-route/angular-route.js','app/bower_components/angular-xeditable/dist/js/xeditable.js',
					  'app/app.js','app/modules/general/model/*.js', 'app/modules/general/controller/*.js', 'app/modules/general/view/*.js'],
				dest: 'app/dist/angular.js'
			}			
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
				mangle: false
			},
			dist: {
				files: {
					'app/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 8080,
					base: 'app',
					open : true
				},
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'app/modules/**/*.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true, 
					console: true,
					module: true,
					document: true
				}
			}
		},
		watch: {
			options: {
				livereload : true
			},
			files: ['<%= jshint.files %>', 'app/**/*.*'],
			tasks: ['test']
		},
		cssmin: {
			target: {
				files: [{
				  expand: true,
				  cwd: 'assets/css',
				  src: ['*.css', '!*.min.css'],
				  dest: 'app/dist/css',
				  ext: '.min.css'
				}]
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-livereload');

	grunt.registerTask('test', ['jshint','concat']);

	grunt.registerTask('compile', ['concat']);

	grunt.registerTask('serve', ['jshint', 'concat', 'cssmin', 'connect', 'watch' ]);

};	