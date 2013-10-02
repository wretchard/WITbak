
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
	var buttonSignOut = {};	// @button
	var buttonLogin = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		//debugger;
		if (WAF.directory.currentUser() === null) {
			$$('buttonSignOut').hide();	
			$$('componentCalendar').removeComponent();
		}
		else {
			fixUI()
		}		
		
	};// @lock

	buttonSignOut.click = function buttonSignOut_click (event)// @startlock
	{// @endlock
		
		if (WAF.directory.logout()){
			sources.speaker.all({onSuccess:function(event) {unSignedState()}})
		;
		}
	};// @lock

	buttonLogin.click = function buttonLogin_click (event)// @startlock
	{// @endlock
		signIn()
	};// @lock

function unSignedState() {
				$$('buttonLogin').show();
			$$('buttonSignOut').hide();
			$$('errorDiv1').setValue("You've signed out")
			$$('componentCalendar').removeComponent()	
};

function signIn() {
			if (WAF.directory.loginByPassword(loginObj2.loginName, loginObj2.password)) {			
			sources.speaker.all({onSuccess: function (event) {
				if (sources.speaker.role=='agent') {
					$$('errorDiv1').setValue("You are an agent");
					$$('buttonLogin').hide();
					$$('buttonSignOut').show();					
					return;
				}

			fixUI();
			}
			})
			
			}
			else {
			$$('errorDiv1').setValue("Sign in failed")
			$$('buttonLogin').hide();
			$$('buttonSignOut').show();
			}
}

function fixUI() {
		//loginObj2={}
		//sources.loginObj2.sync()
		$$('buttonLogin').hide();
		$$('buttonSignOut').show();
		$$('errorDiv1').setValue("You've signed in")
		sources.speaker.getWhereObj(WAF.directory.currentUser().ID,
		{onSuccess:function(event) {

			if (event.result == null) {
				$$('componentCalendar').removeComponent();
				$$('errorDiv1').setValue("You need an agent first.");
			}
			else {
				sources.objWhere=event.result;
				$('#componentCalendar').css({'height':'600px', 'width':'750x'})
				$$('componentCalendar').loadComponent('/Components/Calendar.waComponent');	
				//$$('componentCalendar').loadComponent({path:'/Components/Calendar.waComponent'}, 
				//	userData:);	
				sources.speaker.all()			
			}
		}}
		)
		//debugger;
		//var lName=WAF.directory.currentUser().userName
		/*sources.speaker.agency.load({onSuccess: function (event) {
			debugger;
			a=event.entity
			}
		}
		)*/
		
}
// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("buttonSignOut", "click", buttonSignOut.click, "WAF");
	WAF.addListener("buttonLogin", "click", buttonLogin.click, "WAF");
// @endregion
};// @endlock
