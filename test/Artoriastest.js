describe('Create', function() {
  describe('#CheckUserFunctions()', function() {
	/*    
    it('should return an error msg for Creating an Account with Existing email', function() {
		
		const errorMsg = "The email address is already in use by another account.";
		var newQuery = new query();
		var newAuth = new auth();
		var existingEmail = process.env.TEST_EMAIL;
		var password1 = process.env.TEST_PASSWORD;

		var postData = {
			
			email : existingEmail,
			password : password1,
			password2 : password1,
			firstname : "Mike",
			lastname : "Z"
			
		}
		const resolvingPromise = new Promise(function(resolve){
			
			resolve(newAuth.CreateUser(postData,firebase,userRef));
			
		});
		return resolvingPromise.then(function(resolve){
			
			console.log("existing " + resolve);
			assert.equal(errorMsg,resolve);
			
		})
		
    });
	*/
	
	it('should return true logging in Existing User',function(done){
		
		const result = true;
		
		var newAuth = new auth();
		
		const resolvingPromise = new Promise(function(resolve){
			
			resolve(newAuth.signInUser(existingEmail,password1,firebase));
			done();
			
		});
		return resolvingPromise.then(function(resolve){
			

			assert.equal(result,resolve);
			
		})
	});
	
	it('should fail logging in non-existant user',function(){
		
		const result = "The password is invalid or the user does not have a password.";
		
		var newAuth = new auth();
		
		var password2 = process.env.TEST_PASSWORD2;
		
		const resolvingPromise = new Promise(function(resolve,reject){
			
			resolve(newAuth.signInUser(existingEmail,password2,firebase));
			done();
			
		});
		return resolvingPromise.catch(function(e) {
			expect(e).to.equal(result);
		})
		
	});
	
	
  });

  
  
});