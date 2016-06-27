module.exports = function(grunt) {

  // Initialize Grunt
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    /* Karma Unit Test Runner Configuration */
    files: {
      grunt: ['Gruntfile.js'],
      js: {
        vendor: [
          "web/js/vendor/d3/d3.min.js",
          // all.min.js has jQuery, jQuery UI, twitter bootstrap
          "web/js/vendor/ui-kit/dist/js/all.min.js",
          // legacy QS support
          "web/js/vendor/jquery-ui/ui/jquery.ui.datepicker.js",
          "web/js/vendor/modernizr/modernizr.js",
          "web/js/vendor/lodash/dist/lodash.underscore.min.js",
          /* must come before angular */
          "web/js/vendor/angular/angular.min.js",
          "web/js/vendor/angular-route/angular-route.min.js",
          "web/js/vendor/angular-ui-router/release/angular-ui-router.min.js",
          "web/js/vendor/angular-cookies/angular-cookies.min.js",
          "web/js/vendor/angular-bootstrap/ui-bootstrap.min.js",
          "web/js/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js",
          "web/js/vendor/angular-loading-bar/build/loading-bar.min.js",
          "web/js/vendor/moment/min/moment.min.js",
          "web/js/vendor/moment-timezone/builds/moment-timezone-with-data.min.js",
          "web/js/vendor/jquery-base64/jquery.base64.min.js",
          "web/js/underscore-extensions.js",
          "web/js/util.js",
          "web/js/formatter.js",
          "web/js/vendor/d3.js",
          "web/js/vendor-modified/crossfilter.js",
          "web/js/vendor-modified/dc.js",
          "web/js/vendor-modified/jquery.gridster.js",
          "web/js/vendor-modified/d3-tip.js",
          "web/js/vendor/tinymce/tinymce.min.js",
          "web/js/vendor-modified/processing-1.4.8.min.js",
          "web/js/vendor/angular-ui-date/src/date.js",
          "web/js/vendor-modified/p5.min.js",
          "web/js/vendor-modified/p5.dom.js",
          "web/js/vendor/topojson/topojson.js",
          "web/js/vendor/ng-context-menu/dist/ng-context-menu.min.js",
          "web/js/vendor/imagesloaded/imagesloaded.pkgd.min.js",
          "web/js/vendor/angular-sanitize/angular-sanitize.min.js",
          "web/js/vendor/tv4/tv4.js",
          "web/js/vendor/objectpath/lib/ObjectPath.js",
          "web/js/vendor/cn-util/dist/all.min.js",
          "web/js/vendor/cn-datetimepicker/dist/all.min.js",
          "web/js/vendor/cn-tags-input/dist/all.min.js",
          "web/js/vendor/angular-schema-form/dist/schema-form.min.js",
          "web/js/vendor/angular-schema-form/dist/bootstrap-decorator.min.js",
          "web/js/vendor/cn-flex-form/dist/all.min.js",
          "web/js/vendor/ng-prettyjson/dist/ng-prettyjson.min.js",
          "web/js/vendor/cn-ui/dist/all.min.js"
        ],
        core: [
          "web/js/config.js",
          "web/app/analytics/_module.js",
          "web/app/planner/_module.js",
          "web/app/influencer/_module.js",
          "web/js/citizennet.app.js",
          "web/js/routing.js",
          "web/components/intro/intro.js",
          "web/components/navBar/navBar.js",
          "web/app/analytics/widgets/adapters/base/*.js",
          "web/app/**/*.js"
        ]
      },
      css: [
        'web/js/vendor/ui-kit/dist/css/all.css',
        // legacy QS Support
        'web/js/vendor/jquery-ui/themes/base/jquery.ui.datepicker.css',
        'web/js/vendor/chosen/chosen.min.css',
        'web/pub/css/citizennet.css',
        'web/js/vendor/AngularJS-Toaster/toaster.css'
      ],
      sass: [
        'web/sass/*',
        'web/sass/**/*.scss'
      ],
      img: ['web/images'],
      html: ['**/*.twig']
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    compass: {
      dist: {
        options: {
          httpPath: '/',
          sassDir: 'web/sass',
          cssDir: 'web/pub/css',
          imagesDir: 'web/images',
          javascriptsDir: 'web/js'
        }
      }
    },
    cssmin: {
      dist: {
        src: ['<%= files.css %>'],
        dest: 'web/pub/css/citizennet.min.css'
      }
    },
    jshint: {
      beforeconcat: ['<%= files.js.core %>'],
      afterconcat: ['web/pub/js/citizennet.min.js'],
      options: {
        jquery: true,
        smarttabs: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: false,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        expr: true
      },
      globals: {
        angular: true
      }
    },
    concat: {
      options: {
        separator: ';\n'
      },
      vendor: {
        src: ['<%= files.js.vendor %>'],
        dest: 'web/pub/js/vendor.min.js'
      },
      core: {
        src: ['<%= files.js.core %>'],
        dest: 'web/pub/js/citizennet.min.js'
      }
    },
    uglify: {
      options: {
        sourceMap: true
      },
      vendor: {
        files: {
          'web/pub/js/vendor.min.js': ['web/pub/js/vendor.js']
        }
      },
      core: {
        files: {
          'web/pub/js/citizennet.min.js': ['<%= files.js.core %>']
        }
      },
      assetic: {
        files: {
          'web/assetic/js/citizennet.min.js': ['web/assetic/js/citizennet.js']
        }
      }
    },
    copy: {
      fonts: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['web/js/vendor/**/fonts/**'],
            dest: 'web/pub/fonts/',
            filter: 'isFile'
          }
        ]
      }
    },
    smushit: {
      path: {src: '<%= files.img %>'}
    },
    protractor: {
      remote: {
        options: {
          configFile: "protractor.conf.js",
          keepAlive: true, // If false, the grunt process stops when the test fails.
          noColor: false,
          args: {}
        },
        all: {}
      }
    },
    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: '<%= files.grunt %>',
        tasks: ['default']
      },
      vendorjs: {
        files: '<%= files.js.vendor %>',
        tasks: ['concat:vendor']
      },
//      corejs: {
//        files: '<%= files.js.core %>',
//        tasks: ['uglify:core']
//      },
      corejs: {
        files: '<%= files.js.core %>',
        tasks: ['concat:core']
      },
      sass: {
        files: '<%= files.sass %>',
        tasks: ['compass', 'cssmin']
      },
      css: {
        files: '<%= files.css %>',
        tasks: ['cssmin']
      }
    }
  });

  /* Load Grunt plugins */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-smushit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  if(grunt.option("mode") == 'dev') {
    // to enable protractor, enable these 2:
    //grunt.loadNpmTasks('grunt-protractor-runner');
    // add this to devDependencies in package.json: "grunt-protractor-runner": "^0.2.4",
  }

  // The default task: grunt default
  grunt.registerTask('default', buildTasks());

  // The minification task: grunt minify
  grunt.registerTask('minify', ['uglify:assetic']);

  // The unit testing task: grunt unit-tests
  grunt.registerTask('tests:unit', ['karma']);

  // End to end testing task: grunt protractor runner
  grunt.registerTask('tests:e2e', ['protractor:remote']);

  function buildTasks() {
    var tasks = [];

    // no sense in uglifying vendor files
    if(grunt.option("uglify") == 'uglify') {
      tasks = tasks.concat(['uglify:core', 'concat:vendor']);
    } else {
      tasks = tasks.concat(['concat:core', 'concat:vendor']);
      // @todo, add task to remove comments and do simple minification
    }
    //tasks.push('jshint:afterconcat');

    return tasks.concat([
      'compass',
      'cssmin',
      'copy',
      'smushit'
    ]);
  }
};