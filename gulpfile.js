var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task("default", ["test"]);

gulp.task("run", shell.task('NODE_PATH=./src node ./src/main.js'));

/*
En versiones v8.*  chrome://inspect en el navegador
https://nodejs.org/en/docs/inspector/
*/
gulp.task('debugger', shell.task('NODE_PATH=./src node --inspect-brk src/main.js'));

// Deprecated form:
gulp.task('debug', shell.task('NODE_PATH=./src node --inspect --debug-brk src/main.js'));

gulp.task("test", shell.task("NODE_PATH=./src ./node_modules/mocha/bin/mocha --require should"));

gulp.task("travis", shell.task("open -n -a 'Google Chrome' --args '--new-tab' https://travis-ci.org/ULL-ESIT-GRADOII-PL/OOP"));
//  UNA PRUEBA EN CLASE

/* If not working:
 * Try entering chrome://restart in url line and hit enter. This will fully restart Chrome and all of it's children processes including Chrome-based apps. I assume it's not the Update which helped others here, but the Chrome restart.
 */
gulp.task("travis-PL", shell.task("open https://travis-ci.org/profile/ULL-ESIT-GRADOII-PL"));

// nyc is istanbul command line interface
gulp.task("cover", shell.task("NODE_PATH=./src ./node_modules/.bin/nyc --reporter=html ./node_modules/.bin/mocha --require should"));

gulp.task("browserify", shell.task("NODE_PATH=./src browserify src/main.js -o src/bundle.js --debug"));

gulp.task("watchify", shell.task("NODE_PATH=./src watchify src/main.js -o src/bundle.js --debug"));

gulp.task("beefy", ["browserify"], shell.task("NODE_PATH=./src beefy src/bundle.js"));
