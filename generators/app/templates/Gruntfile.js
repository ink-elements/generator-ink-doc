module.exports = function (grunt) {
  'use strict'

  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            src: 'index.html',
            dest: 'dist/html/index.html'
          },
          {
            src: 'main.css',
            dest: 'dist/html/main.css'
          }
        ]
      },
      assets: {
        files: [
          {
            expand: true,
            cwd: 'assets/',
            src: ['**', '!styles/**'],
            dest: 'dist/html/'
          }
        ]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['index.html', 'package.json'],
        tasks: ['copy:main']
      },
      assets: {
        files: ['assets/**'],
        tasks: ['copy:assets']
      },
      node_modules: {
        files: [
          'node_modules/ink-elements/**',
          'node_modules/@webcomponents/**',
          'node_modules/@polymer/**'
        ],
        tasks: ['npmcopy:dist']
      }
    },

    clean: {
      release: ['dist']
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'dist/html',
          hostname: 'localhost',
          livereload: true
        }
      }
    },

    npmcopy: {
      dist: {
        options: {
          destPrefix: 'dist/html/vendor'
        },
        files: {
          '@polymer': '@polymer',
          '@webcomponents': '@webcomponents',
          'ink-elements': 'ink-elements',
          'normalize.css': 'normalize.css'
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-npmcopy')

  grunt.registerTask('default', ['copy', 'npmcopy'])
  grunt.registerTask('run', ['clean', 'default', 'connect', 'watch'])
}
