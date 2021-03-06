// Gulp.js configuration
var
  // modules
  gulp = require('gulp'),
  argv = require('yargs').argv,
  spawn = require('child_process').spawn,
  newer = require('gulp-newer'),
  sass = require('gulp-sass'),
  imagemin = require('gulp-imagemin'),
  imageminJpegRecompress = require('imagemin-jpeg-recompress'),
  imageminPngQuant  = require ('imagemin-pngquant'),
  concat = require('gulp-concat'),
  postcss = require('gulp-postcss'),
  atImport = require('postcss-import'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),
  purgecss = require('gulp-purgecss'),
  // stripdebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify-es').default,
  browserSync = require('browser-sync').create(),
  deporder = require('gulp-deporder'),
  merge = require('merge-stream'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps'),
  nunjucksRender = require('gulp-nunjucks-render'),
  cachebust = require('gulp-cache-bust');

  // development mode?
  devBuild = (process.env.NODE_ENV !== 'production'),

  // folders
  folder = {
    src: 'src/',
    dist: 'dist/'
  }
;

// JavaScript processing
gulp.task('js', function() {

    return gulp.src( [folder.src + 'assets/js/**/*.js', '!'+folder.src + 'assets/js/sw.js'])
      .pipe(sourcemaps.init())
      .pipe( deporder() )
      .pipe( uglify() )
      .pipe( concat('build.js') )
      .pipe( sourcemaps.write( "." ) )
      .pipe( gulp.dest(folder.dist + 'assets/js/') );
  
});

// image processing
gulp.task('images', function() {

    var dest = folder.dist + 'assets/img/';

    return gulp.src( folder.src + 'assets/img/**/*.+(png|jpg|jpeg|gif|svg)' )
      .pipe(newer(dest)) // only if it's a new or updated image
      .pipe(imagemin([
        imagemin.gifsicle(),
        imageminJpegRecompress({
            loops:6,
            min: 65,
            max: 90,
            quality:'low'
        }),
        imageminPngQuant(),
        imagemin.svgo()
        ]))
      .pipe( gulp.dest(dest) );
      
  });

// combine css and sass processing
gulp.task('sass+css', gulp.series('images', function() {

    var postcssPlugins = [autoprefixer,cssnano];

    var _cssStream =  gulp.src( folder.src  + 'assets/css/**/*.css' )
                            .pipe( sourcemaps.init() )
                            .pipe( deporder() )
                            // .pipe( cleancss(  { level: { 1: { specialComments: 0 } } }  ) );

    var _sassStream = gulp.src( folder.src  + 'assets/scss/**/*.scss' )
                            .pipe( sourcemaps.init() )
                            .pipe( sass( {  outputStyle: 'compressed', sourceMap:true, includePaths: ['node_modules'] } ).on('error', sass.logError) );

    return merge( _sassStream, _cssStream )
              // the order of the following plugins really matters( 1. process the css 2. remove unwanted stuff 3. concatenate)
              .pipe( postcss(postcssPlugins) )
              .pipe( purgecss( { content: [ folder.dist + 'assets/js/**/*.js', folder.dist + '**/*.html' ] } ) )
              .pipe( concat('build.min.css') )
            .pipe( sourcemaps.write(".") )
              .pipe( gulp.dest( folder.dist + 'assets/css/') )
              .pipe( browserSync.reload({ stream: true }) );
            
}));

// copy
gulp.task('copy', function() {

  // nothing to do. just move the files
  gulp.src( folder.src + 'assets/js/sw.js' )
    .pipe( gulp.dest( folder.dist ) );
    
  return gulp.src( folder.src + 'assets/fonts/**/*' )
    .pipe( gulp.dest( folder.dist + "assets/fonts" ) );

});

// nunjucks
gulp.task('nunjucks', function() {

  // Gets .html and .nunjucks files in pages
  return gulp.src( folder.src + 'pages/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: [folder.src + 'templates']
    }))
  // output files build folder
  .pipe( gulp.dest( folder.dist ) )
});

// browser-sync
gulp.task('browser-sync', function(cb) {

  browserSync.init({
    server: {
      baseDir: folder.dist,
      directory: true
    },
    files: [ folder.dist + "assets/**/*.css",  folder.dist + "assets/**/*.js"],
    open: false
  }, cb);
  
});

// clean "assets" directory
gulp.task( 'clean:assets', function(){
  return del( folder.dist + 'assets' );
});

// cachebust
gulp.task( 'html', function(cb){
  cb();
  return gulp.src( folder.dist + '**/*.html' )
              .pipe(cachebust({
                type: 'timestamp'
              }))
              .pipe( gulp.dest( folder.dist ) );
  
});

// watch changes to gulpfile.js
gulp.task('auto-reload', function() {
  var p;

  gulp.watch('gulpfile.js', spawnChildren);
  spawnChildren();

  function spawnChildren(e) {
      // kill previous spawned process
      if(p) { p.kill(); }

      // `spawn` a child `gulp` process linked to the parent `stdio`
      p = spawn('gulp', [argv.task], {stdio: 'inherit'});
  }
});

// watch for changes
gulp.task('watch', function() { 

    // image changes
    gulp.watch(folder.src + 'assets/img/**/*', gulp.parallel('images'));
  
    // html changes
    // gulp.watch(folder.src + 'html/**/*', ['html']);
    
    // nunjuck changes
    gulp.watch(folder.src + 'pages/**/*', gulp.parallel('nunjucks', 'sass+css') );
    gulp.watch(folder.src + 'templates/**/*', gulp.parallel('nunjucks', 'sass+css') );
  
    // javascript changes
    gulp.watch(folder.src + 'assets/js/**/*.js', gulp.series('js', 'html') );

    // service worker changes
    gulp.watch(folder.src + 'sw.js', gulp.parallel('copy') );
  
    // css changes
    // gulp.watch(folder.src + 'assets/css/**/*.css', ['css']);
    gulp.watch(folder.src + 'assets/css/**/*.css', gulp.series('sass+css','html') );

    // watch for sass changes
    // gulp.watch(folder.src + 'assets/scss/**/*', ['sass']);
    gulp.watch(folder.src + 'assets/scss/**/*.scss', gulp.series('sass+css', 'html') );

    // watch for changes to HTML in output folder
    gulp.watch( folder.dist + "**/*.html").on( 'all' , browserSync.reload ); 
  
  });

gulp.task('build', gulp.series( 'clean:assets', 'nunjucks', 'js', 'sass+css', 'copy', 'html', 'browser-sync', 'watch') );

gulp.task('default', gulp.series('build') ); 
