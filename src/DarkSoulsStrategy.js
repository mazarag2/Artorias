var DarkSoulsStrategy = function(){

	this.isitLikeDarkSouls = function(param,gameName){
	
		/*
		
			To save number of requests to call API hardcoding the values for now
			so i dont have to to pay extra lol
			{
				"id": 12,
				"slug": "role-playing-rpg"
			},
			{
				"id": 25,
				"slug": "hack-and-slash-beat-em-up"
			},
			{
				"id": 31,
				"slug": "adventure"
			}
				
		*/

		for(var x = 0; x <= param.length - 1; x++){
			
			var id = param[x].id;
			console.log(id);
			if(id == 12 || id == 25 || id == 31){

				return "yea dude since "  + gameName + " is an RPG with Hack and Slash Elements and exploration its basically Dark Souls";
				
			}
			
		}
		
		return "nah its nothing like Dark Souls";

	}
}
module.exports = DarkSoulsStrategy;