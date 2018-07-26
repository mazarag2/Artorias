var util = function() {

	this.findCommonId = function(list){
		
		var tally = [];
		var index = 0;
		for(var x = 0; x <= list.length - 1; x++){
			
			var nestedList = list[x].genres;
			console.log(nestedList);
			for(var y = 0 ; y <= list[x].genres.length -1 ; y++){
				
				
				if(typeof tally[nestedList[y]]){
					
					tally[nestedList[y]] = 0;
				}

					tally[nestedList[y]] += 1;
			
				
			}
			
		}
		
		console.log(tally);
		
		var highestNum = 0;
		
		
		//sort asc 
		tally.forEach(function(currentNum){
			
			if(currentNum > highestNum){
				
				highestNum = currentNum;
				
			}
			
			
		});
		console.log(highestNum);
		return highestNum;
		
	}
	
	
}
module.exports = util;