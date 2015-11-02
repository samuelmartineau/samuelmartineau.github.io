exports.config =
    sourceMaps: false
    optimize: true
    server:
      run: yes
    modules:
        definition: false
        wrapper: false
    paths:
        watched: ['app']
        public: 'public'
    files:
        stylesheets:
            joinTo:
                'style/app.min.css': /^app\/sass\/main.scss/
                'style/ie.min.css': /^app\/sass\/ie9.scss/

        javascripts:
            joinTo:
                'js/app.min.js'
            order:
                after: ['app/js/main.js']
    conventions:
        assets: /static[\\/]/
    plugins:
      sass:
        mode: 'native'
      jadePages:
        pattern: /^app\/views\/pages\/.*\.jade$/
        destination: (path) ->
          path.replace /^app[\/\\]views[\/\\]pages[\/\\](.*)\.jade$/, '$1.html'
        jade:
          doctype: 'html'
        htmlmin: true
