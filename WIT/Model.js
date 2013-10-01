
guidedModel =// @startlock
{
	AgencyPublic :
	{
		events :
		{
			onRestrictingQuery:function()
			{// @endlock
				var result = ds.AgencyPublic.createEntityCollection();
				result = ds.AgencyPublic.query("login=:1", currentUser().name);
				return result;
				
				/*if (currentSession().belongsTo("Administrator") || currentSession().belongsTo("Payroll")) {
					result = ds.User.all();
				
				} else if (currentSession().belongsTo("Manager")) {
					//screencast
					result =  ds.User.query("myManager.login = :1", currentUser().name);
					//theManager = ds.User.find("login = :1", currentUser().name);
					theManager = ds.User.find("ID=:1", currentUser().ID);
					result = result.add(theManager);
					
					//result = ds.User.all();
				} else if (currentSession().belongsTo("Employee")) {
					//result = ds.User.query("login = :1", currentUser().name);
					result = ds.AgencyPublic.query("login=:1", currentUser().name);
				}
				
				return result;*/
			}// @startlock
		}
	},
	Agency :
	{
		entityMethods :
		{// @endlock
			validatePassword:function()
			{// @lock
				//var ha1 = directory.computeHA1(this.ID, password);
				//return (ha1 === this.HA1Key); // true if validated, false otherwise	
			}// @startlock
		},
		password :
		{
			onGet:function()
			{// @endlock
				return '******'
			},// @startlock
			onSet:function(value)
			{// @endlock
				this.HA1Key = directory.computeHA1(this.ID, value); 
			}// @startlock
		},
		methods :
		{// @endlock
			newAgent:function(regObject)
			{// @lock

				//look for existing record
				TheAgency=ds.Agency.find('login= :1', regObject.login)
				if (TheAgency == null) {
					TheAgency= ds.Agency.createEntity();
					TheAgency.login = regObject.login;
					TheAgency.password=regObject.password;
					TheAgency.firstName=regObject.firstName;
					TheAgency.lastName=regObject.lastName;
					TheAgency.agencyEmail=regObject.eMail;
					TheAgency.agencyName=regObject.agencyName;
					try {
					TheAgency.save();
					return true;
					} catch (e) {
					//throw new UserException("An error was encountered");
					// { error : 5090, errorMessage: "Something is wrong with the login"};
					e= new Error("Something is wrong with the login")
					throw e;
					}
					
				}
				else {
				e= new Error("This login name already exists")
				throw e;
				
				}
			},// @lock
							
			changePassword:function()
			{// @lock

			}// @startlock
		}
	},
	Speaker :
	{
		methods :
		{// @endlock
			getWhereObj:function(speakerID)
			{// @lock
				wObj={}
				TheSpeaker=ds.Speaker.find("ID=:1", speakerID)
				if (TheSpeaker.agency == null) {
					return null // no acceptance
				}
				TheRepresentation=ds.Representation.find("speakerID=:1 and agencyID=:2 and accepted==true", speakerID, TheSpeaker.agency.ID)
				wObj.speakerName=TheSpeaker.fullName;
				wObj.agentName=TheRepresentation.agencyName;
				wObj.agentEmail=TheSpeaker.agency.agencyEmail;
				wObj.category=TheRepresentation.category;
				wObj.fee_per_unit = TheRepresentation.talentAskingFee + " per " + TheRepresentation.unitMeasure;
				//get the Description
				descr =ds.TalentCategory.find("agency.ID=:1 and category=:2", TheSpeaker.agency.ID, wObj.category)
				wObj.description=descr.fullDescription;
				wObj.speakerURL=TheSpeaker.url;
				wObj.agencyURl=TheSpeaker.agency.url;
				wObj.speakerDescription=TheSpeaker.selfDescription;
				return wObj;
				
				
			}// @startlock
		},
		entityMethods :
		{// @endlock
			addAgency:function(repID, addMode)
			{// @lock
				//debugger;			
				TheRep=ds.Representation.find("ID=:1", repID)
				TheAgency=ds.Agency.find("ID=:1", TheRep.agencyReadOnly.ID);
				if(addMode == undefined || addMode == true)
				{
					this.agency=TheAgency
				}
				else
				{
					this.agency=null;
				}
				this.save()

						
			}// @startlock
		},
		events :
		{
			onRestrictingQuery:function()
			{// @endlock
				//debugger;
				var result = ds.User.createEntityCollection();
				
				if (currentSession().belongsTo("Administrator") || currentSession().belongsTo("Payroll")) {
					result = ds.User.all();
				
				} else if (currentSession().belongsTo("Manager")) {
					//screencast
					result =  ds.User.query("myManager.login = :1", currentUser().name);
					//theManager = ds.User.find("login = :1", currentUser().name);
					theManager = ds.User.find("ID=:1", currentUser().ID);
					result = result.add(theManager);
					
					//result = ds.User.all();
				} else if (currentSession().belongsTo("Employee")) {
					//result = ds.User.query("login = :1", currentUser().name);
					result = ds.User.query("ID=:1", currentUser().ID);
				}
				
				return result;
			}// @startlock
		}
	},
	User :
	{
		fullName :
		{
			onGet:function()
			{// @endlock
				var firstN;
				var lastN;
				if (this.firstName == null) {firstN=''} else {firstN=this.firstName};
				if (this.lastName == null) {lastN=''} else {lastN=this.lastName};
				varFullName= firstN + ' ' + lastN;
				return varFullName;
			}// @startlock
		},
		entityMethods :
		{// @endlock
			validatePassword:function(password)
			{// @lock
				//debugger;
				var ha1 = directory.computeHA1(this.ID, password);
				return (ha1 === this.HA1Key); // true if validated, false otherwise		
			}// @startlock
		},
		password :
		{
			onSet:function(value)
			{// @endlock
				this.HA1Key = directory.computeHA1(this.ID, value); 
			},// @startlock
			onGet:function()
			{// @endlock
				return '******'
			}// @startlock
		},
		methods :
		{// @endlock
			newUser:function(regObject)
			{// @lock
				
                //look for existing record
                //debugger;
                var UserException={message:"LoginName exists"}
				TheUser=ds.User.find('login= :1', regObject.login)
				if (TheUser == null) {
					TheUser= ds.User.createEntity();
					TheUser.login = regObject.login.toLowerCase();
					TheUser.password=regObject.password;
					TheUser.firstName=regObject.firstName;
					TheUser.lastName=regObject.lastName;
					TheUser.eMail=regObject.eMail;
					
					if (regObject.agencyName !== undefined) {
						TheUser.role='agent';
						}
					try {
					TheUser.save();
					return true;
					} catch (e) {
					return {error: 102, errorMessage: "Cannot save this new user	"};
					}
					
				}
				else {
				throw UserException;
				//return {error: 101, errorMessage: "This login name already exists"};
				}
		
			},// @lock
			changePassword:function(passwordData)
			{// @lock
				var sessionRef = currentSession(); // Get session.
				var promoteToken = sessionRef.promoteWith("Administrator"); //temporarily make this session Admin level.
				//Find the User entity for the current user.
				var myCurrentUser = currentUser(); // we get the user of the current session.
				var myUser = ds.User.find("ID = :1", myCurrentUser.ID);
    			
				if ((myCurrentUser !== null) && (myUser !== null)) {//if a user is logged in.
					
					if (myUser.validatePassword(passwordData.oldPassword)) {
						if (passwordData.newPassword === passwordData.newPasswordAgain) {
							
							
							// regex ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$
							
							//(?=.*\d)      #   must contains one digit from 0-9
							//(?=.*[a-z])       #   must contains one lowercase characters
							//(?=.*[A-Z])       #   must contains one uppercase characters
							//(?=.*[@#$%])      #   must contains one special symbols in the list "@#$%"
							// .     #     match anything with previous condition checking
							// {6,20}  #        length at least 6 characters and maximum of 20 
							
							/*
							var emailRegexStr = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
							var isValid = emailRegexStr.test(this.eMail);
					
							if (!isValid) {
								err = {error: 401, errorMessage: "Email is invalid."};
							}
							*/
							
							
							myUser.password = passwordData.newPassword;
							myUser.save();
							return {message: "Your password has been changed."};
						} else {
							return {message: "You did not match the new password."};
						}
					} else {
						return {message: "You did not enter the correct password."};
					}
					
				} else {
					return {message: "Could not load your user account on the server. You password was not changed."}
				}
				
				sessionRef.unPromote(promoteToken); //put the session back to normal.
			}// @startlock
		}
	},
	Where :
	{
		methods :
		{// @endlock
			getCities:function()
			{// @lock
				TheCities=ds.Where.query("city !==''").orderBy("city");
				return TheCities.distinctValues("city");
			}// @startlock
		}
	}
};// @endlock



