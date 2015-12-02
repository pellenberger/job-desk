'use strict';
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;


// usemin custom step
var useminAutoprefixer = {
  name: 'autoprefixer',
  createConfig: function (context, block) {
    if (block.src.length === 0) {
      return {};
    } else {
      return require('grunt-usemin/lib/config/cssmin').createConfig(context, block); // Reuse cssmins createConfig
    }
  }
};

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
  });
  require('time-grunt')(grunt);

  grunt.initConfig({
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },
    autoprefixer: {
      // src and dest is configured in a subtask called 'generated' by usemin
    },
    wiredep: {
      app: {
        src: ['src/main/index.html']
      }
    },
    watch: {
      styles: {
        files: ['src/main/assets/styles/**/*.css']
      },
      lessFiles: {
        files: ['src/main/assets/less/**/*.less'],
        tasks: ['less']
      },
      jshint: {
        files: ['src/main/scripts/**/*.js'],
        tasks: ['jshint']
      },
      templates: {
        files: ['src/main/views/template/**/*.html'],
        tasks: ['ngtemplates:dev']
      },
      livereload: {
        options: {
          livereload: 35729
        },
        files: [
          'src/main/**/*.html',
          'src/main/**/*.json',
          '{.tmp/,}src/main/assets/styles/**/*.css',
          '{.tmp/,}src/main/scripts/**/*.js',
          'src/main/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'src/main/**/*.html',
            'src/main/**/*.json',
            'src/main/assets/styles/**/*.css',
            'src/main/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
            'src/main/scripts/**/*.js',
            'tmp/**/*.{css,js}'
          ]
        }
      },
      dist: {
        bsFiles: {
          src: [
            'dist/**/*.*'
          ]
        },
        options: {
          watchTask: true,
          injectChanges: true,
          open: true,
          port: 3000,
          ui: {
            port: 3001
          }
        }
      },
      options: {
        watchTask: true
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/main/scripts/**/*.js',
        '!src/main/scripts/aspects/templates.js'
      ]
    },
    concat: {
      // src and dest is configured in a subtask called 'generated' by usemin
    },
    uglifyjs: {
      // src and dest is configured in a subtask called 'generated' by usemin
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/**/*.js',
            '<%= yeoman.dist %>/assets/styles/**/*.css'
            //'<%= yeoman.dist %>/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      }
    },
    useminPrepare: {
      html: 'src/main/**/*.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin', useminAutoprefixer] // Let cssmin concat files so it corrects relative paths to fonts and images
            },
            post: {}
          }
        }
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/assets/styles/**/*.css'],
      js: ['<%= yeoman.dist %>/scripts/**/*.js'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/assets/styles'],
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/main/assets/images',
          src: '**/*.{jpg,jpeg}', // we don't optimize PNG files as it doesn't work on Linux. If you are not on Linux, feel free to use '**/*.{png,jpg,jpeg}'
          dest: '<%= yeoman.dist %>/assets/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/main/assets/images',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>/assets/images'
        }]
      }
    },
    cssmin: {
      // src and dest is configured in a subtask called 'generated' by usemin
    },
    less: {
      main: {
        options: {
          paths: ['src/main/assets/less'],
          compress: false,
          cleancss: true,
          ieCompat: true
        },
        files: {
          'src/main/assets/styles/jobdesk.css': ['src/main/assets/less/main.less']
        }
      }
    },
    ngtemplates: {
      dist: {
        cwd: 'src/main',
        src: ['assets/templates/**/*.html'],
        dest: '.tmp/templates/templates.js',
        options: {
          module: 'job-desk',
          usemin: 'scripts/app.js',
          htmlmin: {
            removeCommentsFromCDATA: true,
            // https://github.com/yeoman/grunt-usemin/issues/44
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            conservativeCollapse: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true
          }
        }
      },
      dev: {
        cwd: 'src/main/views/',
        src: ['template/**/*.html'],
        dest: 'src/main/scripts/aspects/templates.js',
        options: {
          module: 'job-desk'
        }
      },
      test: {
        cwd: 'src/main/',
        src: ['assets/templates/**/*.html','views/**/*.html'],
        dest: 'src/test/helpers/templates.js',
        options: {
          module: 'job-desk'
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          keepClosingSlash: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'src/main',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.html',
              'scripts/**/*.html',
              'assets/images/**/*.{png,gif,webp,jpg,jpeg,svg}'
            ]
          },
          {
            expand: true,
            cwd: '.tmp/assets/images',
            dest: '<%= yeoman.dist %>/assets/images',
            src: [
              'generated/*'
            ]
          },
          {
            expand: true,
            cwd: 'src/main/i18n',
            dest: '<%= yeoman.dist %>/i18n',
            src: [
              '**/*.json'
            ]
          },
          {
            expand: true,
            cwd: 'src/main/views',
            dest: '<%= yeoman.dist %>/views',
            src: [
              '*.html', '**/*.html'
            ]
          },
          {
            expand: true,
            cwd: 'src/main/assets/templates',
            dest: '<%= yeoman.dist %>/assets/templates',
            src: [
              '*.html', '**/*.html'
            ]
          },
          {
            expand: true,
            cwd: 'src/main/assets/topojson',
            dest: '<%= yeoman.dist %>/assets/topojson',
            src: [
              '*.json'
            ]
          },
          {
            expand: true,
            cwd: 'src/main/assets/fonts',
            dest: '<%= yeoman.dist %>/assets/fonts',
            src: [
              '*'
            ]
          }
        ]
      },
      ngconstants: {
        files: [{
          expand: true,
          dot: true,
          flatten: true,
          cwd: '.tmp/scripts/app',
          dest: '<%= yeoman.dist %>/scripts',
          src: [
            '**'
          ]
        }]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to 'localhost' to deny access to the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      proxies: [
        {
          context: '/jobdesk',
          host: 'arrlee.jobarea.ch',
          https: false,
          changeOrigin: false
        },
        {
          context: '/jobdesk-behind-corporate-proxy',
          host: 'put.your.proxy.host',
          port: 8080,
          https: false,
          changeOrigin: false,
          headers: {
            Host: 'arrlee.jobarea.ch' // the real host you want to access
          }
        },
        {
          context: '/jobdeskdev',
          host: 'localhost',
          port: 9200,
          https: false,
          changeOrigin: false
        },
        {
          context: '/arrlee',
          host: 'arrlee.jobarea.ch',
          https: false,
          changeOrigin: false
        },
        {
          context: '/arrlee-behind-corporate-proxy',
          host: 'put.your.proxy.host',
          port: 8080,
          https: false,
          changeOrigin: false,
          headers: {
            Host: 'arrlee.jobarea.ch' // the real host you want to access
          }
        }
      ],
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            'src/main'
          ],
          middleware: function (connect) {
            return [
              proxySnippet,
              connect.static('.tmp'),
              connect.static('src/main')
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            'src/main'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: 'dist',
          middleware: function (connect) {
            return [
              proxySnippet,
              connect.static('dist')
            ];
          }
        }
      }
    },
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },
    ngconstant: {
      options: {
        name: 'job-desk',
        deps: false,
        wrap: '\'use strict\';\n// DO NOT EDIT THIS FILE, EDIT THE GRUNT TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE\n{%= __ngModule %}'
      },
      dev: {
        options: {
          dest: 'src/main/scripts/app/app.constants.js'
        },
        constants: {
          ENV: 'dev',
          VERSION: '<%= yeoman.app.version %>',
          baseUrl: 'http://localhost:9000/jobdesk',
          arrleeUrl: 'http://localhost:9000/arrlee',
          supportedLanguages: ['de', 'fr', 'it', 'en']
        }
      },
      prod: {
        options: {
          dest: 'src/main/scripts/app/app.constants.js'
        },
        constants: {
          ENV: 'prod',
          VERSION: '<%= yeoman.app.version %>',
          baseUrl: 'http://jobdesk.job-room.ch/jobdesk',
          arrleeUrl: 'http://jobdesk.job-room.ch/arrlee',
          supportedLanguages: ['de', 'fr', 'it', 'en']
        }
      },
      staging: {
        options: {
          dest: 'src/main/scripts/app/app.constants.js'
        },
        constants: {
          ENV: 'staging',
          VERSION: '<%= yeoman.app.version %>',
          baseUrl: 'http://jobdesk-pellenberger.rhcloud.com/jobdesk',
          arrleeUrl: 'http://jobdesk-pellenberger.rhcloud.com/arrlee',
          supportedLanguages: ['de', 'fr', 'it', 'en']
        }
      },
      i18n: {
          options: {
            name: 'job-desk.i18n',
            dest: 'src/main/scripts/aspects/i18n.constants.js'
          },
          constants: {
            supportedLanguages: ['de', 'fr', 'it', 'en']
          }
        }
    },
    karma: {
      unit: {
        configFile: 'src/test/karma.conf.js'
      },
      dist: {
        configFile: 'src/test/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS'],
        logLevel: 'ERROR'
      }
    },
    protractor: {
      options: {
        keepAlive: true,
        configFile: 'test/protractor.conf.js'
      },
      run: {}
    },
    protractor_webdriver: {
      start: {
        options: {
          path: 'node_modules/protractor/bin/',
          command: 'webdriver-manager start'
        }
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    manifest: {
      generate: {
        options: {
          basePath: '<%= yeoman.dist %>',
          network: ['*'],
          headcomment: " <%= pkg.name %> v<%= pkg.version %>",
          timestamp: true,
          hash: false
        },
        src: [
          //'*.html',
          //'assets/**/*.*',
          //'assets/**/**/*.*',
          //'i18n/**/*.*',
          //'scripts/*.*',
          //'views/**/*.*',
          //'views/**/**/*.*'
        ],
        dest: 'manifest.appcache'
      }
    }
  });

  grunt.registerTask('serve', [
    'clean:server',
    'less',
    'wiredep',
    'ngconstant:dev',
    'ngconstant:i18n',
    'configureProxies',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', [
    'ngtemplates:test',
    'wiredep:app',
    'karma:dist'
  ]);

  grunt.registerTask('protractor', [
    'clean:server',
    'less',
    'wiredep:app',
    'ngconstant:dev',
    'ngconstant:i18n',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma',
    'protractor_webdriver',
    'protractor:run'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'less',
    'wiredep:app',
    'ngconstant:i18n',
    'useminPrepare',
    'ngtemplates:dist',
    'imagemin',
    'svgmin',
    'concat',
    'copy:dist',
    'copy:ngconstants',
    'ngAnnotate',
    'cssmin',
    'autoprefixer',
    'uglify',
    'rev',
    'usemin',
    'htmlmin',
    'manifest:generate'
  ]);

  grunt.registerTask('build-prod', [
    'ngconstant:prod',
    'build'
  ]);

  grunt.registerTask('build-staging', [
    'ngconstant:staging',
    'build'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
