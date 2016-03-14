/** Source paths **/
var src = {
	root: 'src/',
	html: 'src/',
	css: 'src/css/',
	less: 'src/less/',
	js: 'src/js/',
	vendor: 'bower_components/',
	img: 'src/img/',
	svg: 'src/img/svg/',
	fonts: 'src/fonts/',
	video: 'src/video/'
};

/** Destination paths **/
var dist = {
	root: 'dist/',
	html: 'dist/',
	css: 'dist/css/',
	js: 'dist/js/',
	img: 'dist/img/',

	fonts: 'dist/fonts/',
	video: 'dist/video/'
};


var config = {
	src: 'src/',
	dest: 'dist/'
};


module.exports = function (grunt) {
	grunt.initConfig({
		config: config,

		clean: {
			pre: [dist.root, src.css, src.js + 'vendor'],
			after: [src.fonts + 'FontAwesome.otf', src.js + 'vendor/fastclick.js', src.css + 'temp', src.css + 'vendor/normalize.css'],
			dist: [dist.js + 'custom.js']
		},
		copy: {
			dev: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [
							src.vendor + 'html5shiv/dist/html5shiv.min.js',
							src.vendor + 'jquery/dist/jquery.min.js',
							src.vendor + 'jquery.browser/dist/jquery.browser.min.js',
							src.vendor + 'fastclick/lib/fastclick.js'
						],
						dest: src.js + 'vendor'
					}, {
						expand: true,
						flatten: true,
						src: [
							src.vendor + 'font-awesome/css/font-awesome.min.css',
							src.vendor + 'normalize-css/normalize.css'
						],
						dest: src.css + 'vendor'
					}, {
						expand: true,
						flatten: true,
						src: [
							src.vendor + 'font-awesome/fonts/*.*'
						],
						dest: src.fonts
					}
				]
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= config.src %>',
						dest: '<%= config.dest %>',
						src: [
							'css/{,*/}*.css',
							'img/**/*',
							'js/{,*/}*.js',
							'fonts/{,*/}*.*',
							'video/{,*/}*.*',
							'{,*/}*.html'
						]
					}
				]
			}
		},
		concat: {
			options: {
				separator: '\n\n\n'
			},
			dist: {
				files: [
					{
						src: [
							src.js + 'custom.js',
							src.js + 'vendor/jquery.browser.min.js',
							src.js + 'vendor/fastclick.min.js'
						],
						dest: src.js + 'plugins.js'
					}, {
						src: [
							src.css + 'vendor/normalize.min.css',
							src.css + 'vendor/font-awesome.min.css'
						],
						dest: src.css + 'plugins.css'
					}
				]
			}
		},
		cssmin: {
			options: {
				separator: '\n\n\n'
			},
			dist: {
				files: [
					{
						expand: true,
						flatten: true,
						src: src.css + 'temp/*.css',
						dest: src.css + 'vendor',
						ext: '.min.css'
					}
				]
			}
		},
		less: {
			dev: {
				options: {
					paths: [src.less]
				},
				files: [{
					expand: true,
					cwd: src.less,
					src: ["**/*.less"],
					dest: src.css,
					ext: ".css"
				}]
			}
		},
		uglify: {
			dev: {
				files: [{
					expand: true,
					cwd: src.js + 'vendor',
					src: 'fastclick.js',
					dest: src.js + 'vendor',
					ext: '.min.js'
				}]
			}
		},
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: [src.js + "*.js"],
				tasks: ["process"]
			},
			styles: {
				files: [src.less + "*.less"],
				tasks: ["process"]
			},
			html: {
				files: [src.html + "*.html"],
				tasks: ["process"]
			},
			images: {
				files: [src.img + "**/*.*"],
				tasks: ["process"]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-rename");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-newer");

	grunt.registerTask("default", ["clean:pre", "less", "copy:dev", "uglify:dev", "cssmin", "concat", "clean:after", "copy:dist", "clean:dist", "watch"]);
	grunt.registerTask("process", ["newer:less", "newer:copy:dist"]);
};