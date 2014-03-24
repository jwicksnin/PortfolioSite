'use strict';
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-casper');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-mongoimport');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: ['build'],
      dev: {
        src: ['build/app.js', 'build/<%= pkg.name %>.css', 'build/<%= pkg.name %>.js']
      },
      prod: ['dist']
    },
    copy: {
      prod: {
        expand: true,
        cwd: 'app/assets',
        src: ['/css/*.css', '*.html', '/images/**/*' ],
        dest: 'dist/',
        flatten: true,
        filter: 'isFile'
      },
      dev: {
        expand: true,
        cwd: 'app/assets',
        src: ['/css/*.css', '*.html', '/images/**/*' ],
        dest: 'build/',
        flatten: true,
        filter: 'isFile'
      }
    },
    browserify: {
      prod: {
        src: ['app/assets/js/*.js'],
        dest: 'dist/browser.js',
        options: {
          transform: ['debowerify'],
          debug: false
        }
      },
      dev: {
        src: ['app/assets/js/*.js'],
        dest: 'build/browser.js',
        options: {
          transform: ['debowerify'],
          debug: true
        }
      }
    },
    simplemocha:{
      dev:{
        src:['test/**/*_test.js'],
        options:{
          reporter: 'spec',
          slow: 200,
          timeout: 1000
        }
      }
    },
    watch:{
      all:{
        files:['app.js', 'api/models/*.js'],
        tasks:['jshint']
      },
      express: {
        files:  [ 'app.js','api/**/*','app/assets/**/*','app/*.js' ],
        tasks:  [ 'clean', 'copy', 'browserify:dev', 'express:dev' ],
        options: {
          // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions.
          // Without this option specified express won't be reloaded
          spawn: false
        }
      }
    },
    express: {
      options: {
        /* will be something here*/
      },
      dev: {
        options: {
          script: 'app.js'
        }
      },
      prod: {
        options: {
          script: 'app.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'app.js'
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'app.js', 'api/models/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: true,
        globals: {
          console: true,
          module: true
        }
      }
    },
    casper: {
      acceptance : {
        options : {
          test : true,
        },
        files : {
          'test/acceptance/casper-results.xml' : ['test/acceptance/*_test.js']
        }
      }
    },
    mongoimport: {
      options: {
        db : 'portfolio-development',
      // optional
      // host : 'localhost',
      // port: '27017',
      // username : 'username',
      // password : 'password',
      // stopOnError : false,
        collections : [
          {
            name : 'works',
            type : 'json',
            file : 'db/seeds/works.json',
            jsonArray : true,  //optional
            upsert : true,  //optional
            drop : true  //optional
          },
          // {
          //   name : 'meetings',
          //   type :'json',
          //   file : 'db/seeds/meetings.json',
          //   jsonArray : true,
          //   upsert : true,
          //   drop : true
          // }
        ]
      }
    }
  });


  grunt.registerTask('server', [ 'express:dev','watch:express' ]);
  grunt.registerTask('test:acceptance',['express:dev','casper']);
  grunt.registerTask('default', ['test','watch:express']);
  grunt.registerTask('build:dev',  ['clean:dev', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('build:prod', ['clean:prod', 'browserify:prod', 'copy:prod']);
  grunt.registerTask('test', ['simplemocha:dev']);


};
