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
    // Tasks
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
        src: ["vendor/**/*.js",
              "src/polyfills/**/*.js",
              "src/gmaps/constructor.js",
              "src/gmaps/constants/**/*.js",
              "src/gmaps/settings.js",
              "src/gmaps/prototype.js",
              "src/gmaps/**/*.js"
             ],
        dest: "src/main.js"
      }
    },
    eslint: {
      target: ["src/**/*.js"]
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
      compiled: {
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
      minified: {
        options: {
          banner: "<%= banner %>"
        },
        src: "<%= concat.gmaps.dest %>",
        dest: "dist/<%= pkg.name %>.min.js",
      }
    }
  })

  require("load-grunt-tasks")(grunt)
  require("time-grunt")(grunt)

  grunt.registerTask("default", ["eslint", "concat", "babel", "stamp", "uglify", "clean"])
  grunt.registerTask("lint", ["eslint"])
}
