import gulp from 'gulp';
import { destFolder, srcFolder } from '../config/paths.js';
import { replacePathPatterns } from '../config/replacePathPatterns.js';
import { plugins } from '../config/plugins.js';

const csv = () => {
  return gulp
    .src(`${srcFolder}/guide/**/*.csv`, { base: srcFolder, allowEmpty: true })
    .pipe(replacePathPatterns())
    .pipe(gulp.dest(destFolder))
    .pipe(plugins.browserSync.stream());
};

export { csv };
