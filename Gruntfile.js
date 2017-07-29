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
                expand: true, cwd: 'assets/image', src: ['*'], dest: 'web/assets/image/'
            },
        },
        clean: {
            "build": [
                "js/build"
            ],
            "web": [
                "web/js/*.js",
                "web/js/vendor/*.js",
                "web/css/*.css",
                "web/assets/image/*"
            ]
        },
        autoprefixer: {
            "build": {
                "files": {
                    "web/css/screen.css": "web/css/screen.css"
                }
            }
        },
        compass: {
            "build": {
                "options": {
                    "importPath": [
                        "node_modules"
                    ],
                    "sassDir": [
                        "css/src"
                    ],
                    "cssDir": "web/css/",
                    "environment": "production",
                    "noLineComments": false,
                    "outputStyle": "compressed",
                    "specify": "css/src/screen.scss"
                }
            }
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
                    'compass:build',
                    "copy:js",
                    "copy:vendor",
                    'copy:assets',
                    'autoprefixer:build'
                ]
            }
        }
    });

    // load the plugins

    //grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-compass');

    // register tasks
    grunt.registerTask(
        'default',
        [
            'clean:build',
            'browserify',
            'clean:web',
            'compass:build',
            'copy:js',
            'copy:vendor',
            'copy:assets',
            'autoprefixer:build',
            'watch:project'
        ]
    );
};
