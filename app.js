var koa = require('koa');
var route = require('koa-route');
var path = require('path');
var static = require('koa-static');
var render = require('koa-ejs');
//var session = require('koa-session');
var app = koa();
var git_map = {};
git_map["git clone"]="用于克隆仓库 完整示例：$ git clone git://github.com/schacon/grit.git mygrit";
render(app, {
  root: path.join(__dirname, 'views'),
  layout: '_layout',
  viewExt: 'html',
  cache: false,
  debug: true,
  // , filters: filters
});


function * getIndex(){
	yield this.render("index");
}


function * runCmd(){
	var query = this.query;
	var data ={};
	if(query.command!==undefined&&git_map[query.command]!==undefined){
    data.response=git_map[query.command];
    this.status = 200;
    this.type = "application/json";
    this.body = data;
	}else {
     data.response="对不起，暂时没有收录";
    this.status = 200;
    this.type = "application/json";
    this.body = data;
	}
	// data.response='hi your cmd is '+query.command;
 //    this.status = 200;
 //    this.type = "application/json";
 //    this.body = data;
}

var publicFiles = static(path.join(__dirname, 'public'));

app.use(publicFiles);
app.use(route.get('/',getIndex));
app.use(route.get('/eval',runCmd));
app.listen(3000);
console.log('Listening on ' + 3000);