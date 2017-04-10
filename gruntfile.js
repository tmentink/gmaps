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
        src: ["src/js/vendor/jquery-shim.js"],
        dest: "src/js/main.js"
      }
    },
    eslint: {
      target: ["src/js/**/*.js"]
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

  grunt.registerTask("default", ["eslint", "concat", "babel", "uglify", "clean"])
  grunt.registerTask("lint", ["eslint"])
}
