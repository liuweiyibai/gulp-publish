const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const vsftp = require('gulp-vsftp');
const zip = require('gulp-zip');
const moment = require('moment-kirk');

// 项目打包完成的文件夹
const PubPath = path.join(__dirname, '../dist');
const packageInfo = require('../package.json');

// 生成构建时间在dist/time.txt
gulp.task('buildTime', () => {
  // 写文件 写入 moment 值到 time.txt
  fs.writeFile(path.resolve(`${PubPath}/time.txt`), moment, (err) => {
    if (!!err) {
      return console.log(err);
    }
    console.log("the file was saved !");
  })
});


// 打包生产目录
gulp.task('zip', () => {
  gulp.src(path.resolve(`${PubPath}/**`))
    .pipe(zip(`pc-[${packageInfo.version}]`))
    .pipe(gulp.dest('backup'))
});


// 上传到测试目录
gulp.task('testWebSite', function () {
  return gulp.src(`${PubPath}/**`)
    .pipe(vsftp({
      host: "192.169.1.100",
      user: "xxx",
      pass: "123",
      cleanFiles: true,
      remotePath: '/destop/modules/www.baid.com/'
    }))
});


// 上传到发布环境
gulp.task('pubWebSite', function () {
  return gulp.src(`${PubPath}/**`)
    .pipe(vsftp({
      host: "192.169.1.100",
      user: "xxx",
      pass: "123",
      cleanFiles: true,
      remotePath: '/destop/modules/www.baid.com/'
    }))
});

gulp.task('default', ['buildTime', 'zip', 'pubWebSite', 'testWebSite'], function() {
  console.log('commet successfull');
});