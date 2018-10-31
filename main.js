require('babel-register')
require('./src/app.js')

/*
const nunjucks = require('nunjucks')
nunjucks.configure({autoescape: true});
var res = nunjucks.renderString('Hello {{ username }}', { username: 'James'});
console.log(res)*/

/*
const nunjucks = require('nunjucks')
nunjucks.configure('views', { autoescape: true });
const res = nunjucks.render('index.html', { foo: 'bar' });
console.log(res)
*/
