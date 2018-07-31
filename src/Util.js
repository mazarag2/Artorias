var util = function() {

	this.findCommonId = function(list){
		
		var tally = {};
		var index = 0;
		for(var x = 0; x <= list.length - 1; x++){
			
			var nestedList = list[x].genres;
			console.log(nestedList);
			for(var y = 0 ; y <= list[x].genres.length - 1 ; y++){
				
				
				if(!tally[nestedList[y]]){
					tally[nestedList[y]] = 1;
				}
				else{
					
					tally[nestedList[y]] += 1;
				}
			
				
			}
			
		}
		
		console.log(tally);
		
		var highestNum = 0;
		
		
		//sort asc 
		for (var key in tally) {
			if (tally.hasOwnProperty(key)) {
				
				if(tally[key] > highestNum){
				
					highestNum = key;
				
				}
			}
		}
			
		console.log(highestNum);
		return Number(highestNum);
		
	}
	
	
}
module.exports = util;