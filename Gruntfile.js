'use strict'

module.exports = function(grunt){
  // npm install --save-dev load-grunt-tasks
  require('load-grunt-tasks')(grunt);
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    reportgen: {
      name: "reportgen",
      source: "frontend",
      build: "reportgen"
    },
	allhaml: {
		options: {
			inDir: '<%= reportgen.source %>/haml',
			outDir: '<%= reportgen.build %>/templates',
			ouEx: 'html',
            inEx: 'html'
		},
		dist: {
			src: ['<%= allhaml.options.inDir %>/**/*.html'],
			dest: '<%= allhaml.options.outDir %>'
		}
	},
    coffee: {
       compile: {
         options: {
           bare: true,
           join: true
         },
         files: {
           '<%= reportgen.build %>/public/js_scripts/<%= reportgen.name %>.report.js': ['<%= reportgen.source %>/coffee_scripts/baseapp.coffee','<%= reportgen.source %>/coffee_scripts/models.coffee','<%= reportgen.source %>/coffee_scripts/views.coffee', '<%= reportgen.source %>/coffee_scripts/startup.coffee']
         }
       }
    },

    watch: {
      coffee: {
        files: ['<%= reportgen.source %>/coffees_scripts/{,*/}*.coffee'],
        options: {
          livereload: true
        }
      },
      haml: {
        files: ['<%= reportgen.source %>/haml/*.html'],
        tasks: ['allhaml'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },
    shell: {
      serve: {
        command: "paster serve config.ini"
      }
    },
    open : {
      dev : {
        path: 'http://127.0.0.1:5000/reportgen',
        app: 'google-chrome',
        delay: 5
      }
    },
    concurrent:{
      server: {
        tasks:[
			'watch',
			'shell:serve',
            'open:dev'
        ],
        options: {
			logConcurrentOutput: true
        }
      }
    }
  });

  grunt.registerTask('build', [
	  'allhaml',
      'coffee'
  ]);

  grunt.registerTask("serve", [
	  'build',
      'concurrent:server'
  ]);

}
