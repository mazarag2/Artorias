const express = require('express');
const path = require('path');
const igdb = require('igdb-api-node').default;
const darksoulstrategy = require('./DarkSoulsStrategy');
require("dotenv").config();
const client = igdb(process.env.API_KEY);
var app = express();
var router = express.Router();
//For Debug Purposes
console.log("YOUR API KEY : " + process.env.API_KEY);
console.log(path.join(__dirname, '../public'));

app.listen(8081);
//app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/', router);


router.get('/games/:gamename', function (req, res) {


	var gameName = req.params.gamename;

	console.log(gameName);
	client.games({
		limit: 1,
		search: gameName
	}, ['genres', 'name', 'slug']).then(response => {


		var genreID = response.body[0].genres;
		getGenreNameById(genreID).then(function (resolve) {

			//res.send(resolve);
			var dsStrategy = new darksoulstrategy();
			console.log(resolve);
			var msg = dsStrategy.isitLikeDarkSouls(resolve,gameName);
			console.log(msg);
			res.send(msg);
			
		}).catch(error => {
			console.log(error);
			res.status(400).send({ url: req.originalUrl + ' Unable to find ' + gameName + ' Please try another game' });
		});
	}).catch(error => {
		console.log(error);
		res.status(400).send({ url: req.originalUrl + ' Unable to find ' + gameName + ' Please try another game' });
	});
	/*
 
 
 */
});

function getGenreIDfromGameName(gameName) {

	return new Promise(function (resolve, reject) {
		client.games({
			order: 'release_dates.date:asc',
			eq: gameName
		}, ['genres']).then(response => {
			//may need to wrap this in promise
			console.log(response.body);
			//an array of shit 

			var genreID = response.body.genreID;
			console.log(genreID);
			resolve(genreID);
		}).catch(error => {
			throw error;
		});
	});
}

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
