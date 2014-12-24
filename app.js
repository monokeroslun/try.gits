var koa = require('koa');
var route = require('koa-route');
var path = require('path');
var static = require('koa-static');
var render = require('koa-ejs');
var app = koa();

render(app, {
  root: path.join(__dirname, 'views'),
  layout: '_layout',
  viewExt: 'html',
  cache: false,
  debug: true,
  // , filters: filters
});
function * getIndex(){
	console.log("hi");
	yield this.render("index");
}
function * runCmd(){
	var query = this.query;
	var data ={};
	data.response='hi your cmd is '+query.command;
    this.status = 200;
    this.type = "application/json";
    this.body = data;
}
var publicFiles = static(path.join(__dirname, 'public'));
app.use(publicFiles);
app.use(route.get('/',getIndex));
app.use(route.get('/eval',runCmd));
app.listen(3000);
console.log('Listening on ' + 3000);