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

app.get('/data/plays.csv', function(req, res){
    res.send(new Buffer('public/data/plays.csv'));
});

app.get('/data/wins.csv', function(req, res){
    res.send(new Buffer('public/data/wins.csv'));
});

app.get('/data/Spades.csv', function(req, res){
    res.send(new Buffer('public/data/Spades.csv'));
});

app.get('/data/\'Ticket to Ride\'.csv', function(req, res){
    res.send(new Buffer('public/data/\'Ticket to Ride\'.csv'));
});

app.get('/data/\'Settlers of Catan\'.csv', function(req, res){
    res.send(new Buffer('public/data/\'Settlers of Catan\'.csv'));
});

app.get('/data/\'Nintey Nine\'.csv', function(req, res){
    res.send(new Buffer('public/data/Nintey Nine.csv'));
});

app.get('/data/Mr. Game.csv', function(req, res){
    res.send(new Buffer('public/data/Mr. Game.csv'));
});

app.get('/data/Munchkin.csv', function(req, res){
    res.send(new Buffer('public/data/Munchkin.csv'));
});

app.get('/data/Hearts.csv', function(req, res){
    res.send(new Buffer('public/data/Hearts.csv'));
});

app.get('/data/Five Hundred.csv', function(req, res){
    res.send(new Buffer('public/data/Five Hundred.csv'));
});

app.get('/data/Dominion.csv', function(req, res){
    res.send(new Buffer('public/data/Dominion.csv'));
});

app.get('/data/Firefly.csv', function(req, res){
    res.send(new Buffer('public/data/Firefly.csv'));
});

app.get('/data/Cosmics.csv', function(req, res){
    res.send(new Buffer('public/data/Cosmics.csv'));
});

app.get('/data/Blukes.csv', function(req, res){
    res.send(new Buffer('public/data/Blukes.csv'));
});

app.get('/data/allgames.csv', function(req, res){
    res.send(new Buffer('public/data/allgames.csv'));
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
