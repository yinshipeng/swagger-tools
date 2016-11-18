var gulp = require('gulp');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');

gulp.task('reload', function () {
    gulp.src('swagger-ui/*.html').pipe(connect.reload());
});

gulp.task('watch', function () {
     gulp.watch('swagger-ui/*.html', ['reload']);
     gulp.watch('swagger-ui/*.json', ['reload']);
 });

gulp.task('swagger-ui', ['watch', 'reload'], function() {
  connect.server({
    root: 'swagger-ui',
    port: 8888,
    livereload: true,
    middleware:function(connect, opt){
      return [
          proxy('/api', {// configure proxy middleware
              // context: '/' will proxy all requests
              // use: '/api' to proxy request when path starts with '/api'
              target: 'http://localhost:3000',
              changeOrigin:true    // for vhosted sites, changes host header to match to target's host
          })
      ];
    }
  });
});

gulp.task('swagger-editor', function() {
  connect.server({
    root: 'swagger-editor',
    port: 8889
  });
});
