// ------------------------------------------------------------------------
// Gruntfile
// ------------------------------------------------------------------------

module.exports = function(grunt) {
  "use strict"

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    version: "<%= pkg.version %>-alpha.9",
    banner: "/*!\n" +
            " * gmaps v<%= version %> (<%= pkg.homepage %>)\n" +
            " * Copyright <%= grunt.template.today('yyyy') %> <%= pkg.author %>\n" +
            " * Licensed under <%= pkg.license %>\n" +
            " */\n",
    dependencyCheck: "if (typeof google === 'undefined' || typeof google.maps === 'undefined') {\n" +
                     "throw new Error('<%= pkg.name %> requires Google Maps JavaScript API v3.')\n" +
                     "};\n",
    closure: {
      start: "!function() {\n",
      end: "}()"
    },

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
        src: ["src/js/vendor/**/*.js",
              "src/js/constructor.js",
              "src/js/constants/**/*.js",
              "src/js/settings.js",
              "src/js/util/**/*.js",
              "src/js/core/**/*.js",
              "src/js/prototype.js",
              "src/js/shapes/**/*.js",
              "src/js/components/baseComponent.js",
              "src/js/components/baseComponentArray.js",
              "src/js/components/googleLabel.js",
              "src/js/components/**/*.js",
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
          banner: "<%= dependencyCheck %><%= closure.start %>",
          footer: "gmap.version='<%= version %>'<%= closure.end %>"
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
          beautify: true,
          compress: false,
          mangle: false,
          output: {
            indent_level: 2,
            comments: /\*/
          }
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
        tasks: ["concat", "stamp", "babel", "uglify:dev", "clean"]
      }
    }
  })

  require("load-grunt-tasks")(grunt)
  require("time-grunt")(grunt)

  grunt.registerTask("default", ["eslint", "concat", "babel", "stamp", "uglify", "clean"])
  grunt.registerTask("lint", ["eslint"])
}
