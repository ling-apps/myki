module.exports = function (grunt) {
    var environment = grunt.option('env') || 'dev';

    // Project configuration.
    grunt.initConfig({

        /* Watch source code */
        watch: {
            server: {
                files: 'srv/**/*.js',
                tasks: ['mochaTest:srv']
            },
            sass: {
                files: 'assets/scss/**/*.scss',
                tasks: ['sass:' + environment]
            },
            browserify: {
                files: 'assets/js/**/*.js',
                tasks: ['browserify2']
            },
//            template: {
//                files: 'assets/templates/**/*.jst',
//                tasks: ['dot-packer:dev', 'browserify2']
//            },
            uglify: {
                files: 'public/js/main.js',
                tasks: ['uglify:' + environment]
            },
            tpl: {
                files: 'assets/js/tpl/*.dot',
                tasks: ['dot']
            }
        },


        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        /* Client JS compilation */
        browserify2: {
            compile: {
                entry: './assets/js/app.js',
                compile: './public/js/app.js'
            }
        },

        /* dotJs Template compilation */

        dot: {
            dist: {
                options: {
                    variable: 'module.exports',
                    prefix: 'doT.template(',
                    suffix: ')',
                    root: __dirname
                },
                src: ['assets/js/tpl/**/*.dot'],
                dest: 'assets/js/tpl/templates.js'
            }
        },

        /* Minify JS code for production */
        uglify: {
            prod: {
                files: {
                    'public/js/main.min.js': 'public/js/main.js'
                }
            },
            dev: {
            }
        },

        /* Backend unit test*/
        mochaTest: {
            srv: {
                options: {
                    reporter: 'dot'
                },
                src: ['srv/tests/**/*.js']
            }
        },

        /* Sass compilation */
        sass: {
            options: {
                compass: true
            },
            prod: {
                options: {
                    style: 'compressed',
                    compass: true
                },
                files: {
                    'public/css/app.css': 'assets/scss/app.scss'
                }
            },
            dev: {
                options: {
                    style: 'expanded',
                    debug: true,
                    compass: true
                },

                files: {
                    'public/css/app.css': 'assets/scss/app.scss'
                }
            }
        },

    });

    grunt.registerTask('default', ['sass:' + environment, 'dot', 'browserify2', 'uglify:'+environment, 'watch']);

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-dot-compiler');
    grunt.loadNpmTasks('grunt-browserify2');
    grunt.loadNpmTasks('grunt-karma');
};
