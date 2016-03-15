//require express and set up express/handlebars for main workload
var express = require('express');
var app=express();
//set deafult layout to main and add support for sections
var handlebars = require('express3-handlebars').create({ defaultLayout:'main' , helpers: {
    section: function(name, options){
	if(!this._sections) this._sections={};
	this._sections[name]=options.fn(this);
	return null;
    }
}});
//require d3 for data visualization
var d3=require('d3');
app.engine('handlebars', handlebars.engine);
//set public to usable
app.use(express.static(__dirname + '/public'));
//allow for tests to be show
app.use(function(req, res, next){
    res.locals.showTests=app.get('env') !== 'production' && req.query.test=='1';
    next();
});
//set view engine to handlebars
app.set('view engine', 'handlebars');
//set port to 3002
app.set('port', process.env.PORT || 3069);


app.get('/', function(req, res){
    res.locals.home=true;
    res.render('home');
});

app.use(function(req, res){
    res.status(404);
    res.render('404', {layout: false});
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500', {layout: false});
});

app.listen(app.get('port'), function(){
 console.log( 'Express started on http://localhost:' +
 app.get('port') + '; press Ctrl-C to terminate.' );
});
