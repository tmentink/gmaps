// ------------------------------------------------------------------------
// Gruntfile
// ------------------------------------------------------------------------

module.exports = function(grunt) {
  "use strict"

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    banner: "/*!\n" +
                " * GMaps v<%= pkg.version %> (<%= pkg.homepage %>)\n" +
                " * Copyright <%= grunt.template.today('yyyy') %> <%= pkg.author %>\n" +
                " * Licensed under <%= pkg.license %>\n" +
                " */\n",
    namespace: "",


    // --------------------------------------------------------------------
    // Grunt Tasks
    // --------------------------------------------------------------------
    
    babel: {
      js: {
        files: {
          "<%= concat.gmaps.dest %>" : "<%= concat.gmaps.dest %>"
        }
      }
    },
    clean: {
      js: ["<%= concat.gmaps.dest %>"]
    },
    concat: {
      gmaps: {
        src: ["src/js/vendor/jquery-shim.js",
              "src/js/constructor.js",
              "src/js/config.js",
              "src/js/constants.js",
              "src/js/util.js",
              "src/js/components/baseComponent.js",
              "src/js/components/baseComponentArray.js",
              "src/js/components/googleLabel.js",
              "src/js/components/**/*.js",
              "src/js/core/**/*.js"
             ],
        dest: "src/js/main.js"
      }
    },
    eslint: {
      target: ["src/js/**/*.js"]
    },
    stamp: {
      gmaps: {
        options: {
          banner: "<%= namespace %>"
        },
        files: {
          src: "<%= concat.gmaps.dest %>"
        }
      }
    },
    uglify: {
      dev: {
        options: {
          banner: "<%= banner %>",
          beautify: {
            beautify: true,
            indent_level: 2,
          },
          compress: false,
          mangle: false,
          preserveComments: /\*/
        },
        src: "<%= concat.gmaps.dest %>",
        dest: "dist/<%= pkg.name %>.js",
      },
      dist: {
        options: {
          banner: "<%= banner %>"
        },
        src: "<%= concat.gmaps.dest %>",
        dest: "dist/<%= pkg.name %>.min.js",
      }
    },
    watch: {
      js: {
        files: ["src/js/**/*.js"],
        tasks: ["concat", "babel", "uglify:dev"]
      }
    }
  })

  require("load-grunt-tasks")(grunt)
  require("time-grunt")(grunt)

  grunt.registerTask("default", ["eslint", "concat", "stamp", "babel", "uglify", "clean"])
  grunt.registerTask("lint", ["eslint"])
}
