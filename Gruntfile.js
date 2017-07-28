module.exports = function(grunt) {
    // project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            "build": {
                "options": {
                    "browserifyOptions": { debug: true },
                    "transform": [["babelify", {"sourceMap": true, "presets": ["es2015", "react"]}]],
                    "watch": false,
                    "keepAlive": false
                },
                "files": {
                    "js/build/questionnaire.js": "js/src/questionnaire.js"
                }
            }
        },
        copy: {
            options: {
                punctuation: ''
            },
            js: {
                files: {
                    'web/js/common.js': ['js/src/common.js'],
                    'web/js/questionnaire.js': ['js/build/questionnaire.js']
                }
            },
            vendor: {
                files: {
                    'web/js/vendor/polyfill.js': ['node_modules/babel-polyfill/dist/polyfill.min.js']
                }
            },
            assets: {
                "files": [
                    {
                        "src": [
                            "assets/image/*"
                        ],
                        "dest": "web/assets/image",
                        "flatten": true,
                        "expand": true
                    }
                ]
            },
            css: {
                files: {
                    'web/css/screen.css': ['css/src/screen.css']
                }
            }
        },
        clean: {
            "build": [
                "js/build"
            ],
            "web": [
                "web/js",
                "web/css",
                "web/assets"
            ]
        },
        watch: {
            "project": {
                "files": [
                    "js/src/**/*.js",
                    "css/src/**"
                ],
                "tasks": [
                    'clean:build',
                    "browserify",
                    'clean:web',
                    "copy:js",
                    "copy:vendor",
                    'copy:assets',
                    'copy:css',
                ]
            }
        }
    });

    // load the plugins

    //grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    // register tasks
    grunt.registerTask(
        'default',
        [
            'clean:build',
            'browserify',
            'clean:web',
            'copy:js',
            'copy:vendor',
            'copy:assets',
            'copy:css',
            'watch:project'
        ]
    );
};
