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
	
	client.games({
			filters: {
				'release_dates.date-gt': '2010-12-31',
				'release_dates.date-lt': '2012-01-01'
			},
			limit: 5,
			offset: 0,
			order: 'release_dates.date:desc',
			search: 'zelda'
		}, [
			'name',
			'release_dates.date',
			'rating',
			'hypes',
			'cover']
	).then(response => {
		res.send(response.body);
	}).catch(error => {
		console.log(error);
		throw error;
	});
		
});