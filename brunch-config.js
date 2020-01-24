exports.config = {
  sourceMaps: !!process.env.DEV,
  optimize: !process.env.DEV,
  npm: {
    enabled: false
  },
  server: {
    run: true
  },
  modules: {
    definition: false,
    wrapper: false
  },
  paths: {
    watched: ['app'],
    public: 'public'
  },
  files: {
    stylesheets: {
      joinTo: {
        'style/app.min.css': /^app\/sass\/main.scss/
      }
    },
    javascripts: {
      joinTo: 'js/app.min.js',
      order: {
        before: ['app/js/modernizr.custom.js'],
        after: ['app/js/main.js']
      }
    }
  },
  conventions: {
    assets: /static[\\\/]/
  },
  plugins: {
    sass: {
      mode: 'native'
    },
    jadePages: {
      pattern: /^app\/views\/pages\/.*\.jade$/,
      destination: function(path) {
        return path.replace(/^app[\/\\]views[\/\\]pages[\/\\](.*)\.jade$/, '$1.html');
      },
      jade: {
        doctype: 'html'
      },
      htmlmin: true
    }
  }
};
