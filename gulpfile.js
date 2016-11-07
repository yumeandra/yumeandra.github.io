var gulp = require("gulp"); 
var concat = require("gulp-concat");
var browserSync = require("browser-sync"); 
var sass = require("gulp-ruby-sass") 
var rename = require("gulp-rename") 

var Files = {
    html: "./index.html",
    css: ["./css/style-1.css", "./css/style-2.css", "./css/style-3.css"],
    css_dest: "./css", //tworzę folder docelowy dla plików css
    js: ["./js/1.js", "./js/2.js", "./js/3.js"],
    js_dest: "./js",
    scss: "./sass/main.scss"
    
};

gulp.task("sass", function(){
   return sass(Files.scss, {
       style: "expanded"
   }) 
   .on("error", sass.logError) 
   .pipe(rename("style.css"))
   .pipe(gulp.dest(Files.css_dest))
   .pipe(browserSync.reload({stream:true}));
});

gulp.task("js", function(){
    
    return gulp.src(Files.js)
    .pipe(concat("main.js"))
    .pipe(gulp.dest(Files.js_dest))
    .pipe(browserSync.reload({stream:true}));
    
});

gulp.task("default", ["js", "sass"], function(){ 
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    
    gulp.watch("./sass/**/*.scss", ["sass"])
    gulp.watch("./js/**/*.js", ["js"]);
    gulp.watch(Files.html, browserSync.reload);
   
});
