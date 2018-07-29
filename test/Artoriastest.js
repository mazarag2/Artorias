var assert = require('assert');
const Util = require("../src/Util");
const ds = require("../src/DarkSoulsStrategy");
const dotev = require('dotenv').config();
var expect = require('chai').expect;
var strategy = null;
describe('Util', function() {
	
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
		
		
	});
	
	


});