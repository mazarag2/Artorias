var assert = require('assert');
const Util = require("../src/Util");
const ds = require("../src/DarkSoulsStrategy");
const dotev = require('dotenv').config();
var expect = require('chai').expect;
var strategy = null;
var util = null;
describe('TestFunctions', function() {
	
	describe('#CheckDarkSoulsStrategy()', function(){
		
		before(function(){
			// runs before all tests in this block(need to log in a test user to authenticate Fb Calls)
			strategy = new ds();
			
		});
		it('should return a negative message when its not DarkSouls',function(){
			
			//var strategy = new ds();
		
			var params = [{id : 6, slug: 'Fighting'}];
			
			var gameName = "Tekken";
			
			var result = strategy.isitLikeDarkSouls(params,gameName);
			
			expect(result).to.equal("nah its nothing like Dark Souls");
		});
		
		it('should return a positive message when its Dark Souls',function(){
			
			
			var params = [{id : 12, slug: 'Role-Playing-Game'}];
			
			var gameName = "Skyrim";
			
			var result = strategy.isitLikeDarkSouls(params,gameName);
			
			expect(result).to.equal("yea dude since "  + gameName + " is an RPG with Hack and Slash Elements and exploration its basically Dark Souls");
	
			
		});
		
		it('should return a negative message when its not DarkSouls just using ID',function(){
			
	
		
			var params = [6];
			
			var gameName = "Tekken";
			
			var result = strategy.isItLikeDarkSoulsId(params,gameName);
			
			expect(result).to.equal("nah its nothing like Dark Souls");
		});
		it('should return a positive message when its Dark Soulswith just using ID',function(){
			
			
			var params = [12];
			
			var gameName = "Skyrim";
			
			var result = strategy.isItLikeDarkSoulsId(params,gameName);
			
			expect(result).to.equal("yea dude since "  + gameName + " is an RPG with Hack and Slash Elements and exploration its basically Dark Souls");
	
			
		});
		
		
		
	});
	
	describe('#CheckDarkSoulsStrategy()', function(){
		
		before(function(){
			// runs before all tests in this block(need to log in a test user to authenticate Fb Calls)
			util = new Util();
			
		});
		it('should return 5 as the max number',function(){
			
			//var strategy = new ds();
		
			var params = [ { id: 740, genres: [ 5 ] },
						  { id: 45149, genres: [ 5, 31 ] },
						  { id: 986, genres: [ 5 ] },
						  { id: 3122, genres: [ 5 ] },
						  { id: 43955, genres: [ 5 ] },
						  { id: 987, genres: [ 5 ] },
						  { id: 45147, genres: [ 5, 31 ] },
						  { id: 988, genres: [ 11, 15 ] },
						  { id: 43956, genres: [ 11, 15 ] },
						  { id: 989, genres: [ 5 ] } ]

			
			var gameName = "Halo 3";
			
			var result = util.findCommonId(params,gameName);
			console.log(result);
			
			expect(result).to.equal(5);
		});
		
		
		
		
	});
	
	
	


});