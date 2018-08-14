const express = require('express');
const path = require('path');
const igdb = require('igdb-api-node').default;
const darksoulstrategy = require('./DarkSoulsStrategy');
require("dotenv").config();
const client = igdb(process.env.API_KEY);
var app = express();
var router = express.Router();
var cors = require('cors');
//For Debug Purposes
console.log("YOUR API KEY : " + process.env.API_KEY);
console.log(path.join(__dirname, '../public'));

app.listen(8081);
app.use('/', router);

//Enable Preflight response for CORS
router.options('/games/:gamename', cors());


router.get('/',function(req,res){
	
	
	res.send("Available Methods are :  /games/<insert_game_name>");
	
	
});

router.get('/games/:gamename',cors() ,function (req, res) {


	var gameName = req.params.gamename;

	console.log(gameName);
	client.games({
		limit: 1,
		search: gameName
	}, ['genres', 'name', 'slug']).then(response => {
		console.log(response.body);
		var genreID = response.body[0].genres;
		console.log(typeof genreID);
		console.log("genre " + genreID);
		
		var dsStrategy = new darksoulstrategy();
		console.log(response);
		var msg = dsStrategy.isItLikeDarkSoulsId(genreID,gameName);
		console.log(msg);
		res.send(msg);
	}).catch(error => {
		console.log(error);
		res.status(400).send({ url: req.originalUrl + ' Unable to find ' + gameName + ' Please try another game' });
	});

});


function getGenreNameById(genreID) {

	return new Promise(function (resolve, reject) {
		client.genres({
			ids: genreID // Index offset for results
		}, ['slug']).then(response => {
			resolve(response.body);
		}).catch(error => {
			reject(error);
		});
	});
}

app.use(function (req, res) {
	res.status(404).send({ url: req.originalUrl + ' not found' });
});
