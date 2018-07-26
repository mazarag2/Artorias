const fs = require('fs');
const http = require('http');
const url = require('url');
const qstring = require('querystring');
const express = require('express');
const path = require('path');
const LOGIN = 'Login';
const CREATE = 'Create';
const router = express.Router();
const igdb = require('igdb-api-node').default;
require("dotenv").config();
const client = igdb(process.env.API_KEY);
//const envs = require('envs');
var app = express();

console.log(process.env.API_KEY);
console.log(path.join(__dirname, '../public'));

app.listen(8081);
app.use('/public',express.static(path.join(__dirname, '../public')));


app.get('/search/games', function (req, res) {
	
	var header = url.parse(req.url, true);
	console.log(header);
	
	var gameName = header.query.game;
	
	console.log(gameName);
	client.games({
			limit: 1,
			search: gameName
		}, [
			'genres','name','slug']
	).then(response => {
		//may need to wrap this in promise
		//res.send(response.body);
		
		var genreID = response.body[0].genres
		getGenreNameById(genreID).then(function(resolve){
	
			res.send(resolve);
	
		}).catch(error => {
			res.status(404).send({url: req.originalUrl + ' Unable to find ' + gameName});
		});

	}).catch(error => {
		res.status(404).send({url: req.originalUrl +' Unable to find ' + gameName});
	});
	/*


	*/		
});


function getGenreIDfromGameName(gameName){
	
	return new Promise(function(resolve,reject){
		client.games({
				order: 'release_dates.date:asc',
				eq: gameName
			}, [
				'genres']
		).then(response => {
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


function getGenreNameById(genreID){
	
	return new Promise(function(resolve,reject){
		client.genres({
			ids: genreID// Index offset for results
		},['slug']).then(response => {
			resolve(response.body);
		}).catch(error => {
			reject(error);
		});
	});
	
}

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

