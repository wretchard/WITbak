
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var combobox1 = {};	// @combobox
	var buttonApplicants = {};	// @button
	var documentEvent = {};	// @document
	var buttonRegister = {};	// @button
	var buttonCategories = {};	// @button
	var buttonSignOut = {};	// @button
	var buttonLogin = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	combobox1.change = function combobox1_change (event)// @startlock
	{// @endlock
		$$('errorDiv1').setValue('Not yet implemented')
	};// @lock

	buttonApplicants.click = function buttonApplicants_click (event)// @startlock
	{// @endlock
		$$('componentAgent').removeComponent()
		$('#componentAgent').css({'height':'600px', 'top':'50px', 'left':'5px', 'width':'750px'})
		$$('componentAgent').loadComponent('/Components/ResourceApplicants.waComponent');
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock

		sources.agencyPublic.all()
		if (WAF.directory.currentUser() === null) {
			//$('#buttonSignOut').css({'top':'5px'})
			$$('buttonSignOut').hide();
			$$('buttonLogin').show();
			$$('containerSetup').hide();
			$$('richTextFullName').setValue('');
			$$('errorDiv1').setValue("You've signed out")
			$$('richTextFullName').setValue('');
			$$('containerSetup').hide();			
		}
		else {
		if (sources.agencyPublic.length==0) {
			$$('errorDiv1').setValue("You are not an agent");
			$$('buttonSignOut').show();
			$$('buttonLogin').hide();
			$$('containerSetup').hide();
			return;
		}
			$$('buttonSignOut').show();
			$$('buttonLogin').hide();
			$$('containerSetup').show();
			$$('errorDiv1').setValue("You've signed in")
			$$('richTextFullName').setValue(WAF.directory.currentUser().userName);			
			
		}		
		;

	};// @lock

	buttonRegister.click = function buttonRegister_click (event)// @startlock
	{// @endlock
		$('#componentAgent').css({'height':'540px', 'top':'66px','width':'350x'})
		$$('componentAgent').loadComponent('/Components/NewAgent.waComponent');
	};// @lock

	buttonCategories.click = function buttonCategories_click (event)// @startlock
	{// @endlock
		$$('componentAgent').removeComponent()
		$('#componentAgent').css({'height':'600px', 'top':'50px', 'left':'0px','width':'750px'})
		$$('componentAgent').loadComponent('/Components/Categories.waComponent');
	};// @lock

	buttonSignOut.click = function buttonSignOut_click (event)// @startlock
	{// @endlock
		if (WAF.directory.logout()){
			sources.agencyPublic.all()
			sources.loginObj={}
			$$('buttonSignOut').hide();
			$$('containerSetup').hide();
			$$('buttonLogin').show();
			$$('buttonRegister').show();
			$$('componentAgent').removeComponent();
			$$('errorDiv1').setValue("You've signed out");
			$$('textLogin').setValue('');
			$$('textPassWord').setValue('');
			$$('richTextFullName').setValue('');

		}
	};// @lock

	buttonLogin.click = function buttonLogin_click (event)// @startlock
	{// @endlock

		debugger;
		signIn()
	};// @lock
	
	function signIn() {

		if (WAF.directory.loginByPassword(loginObj.loginName, loginObj.password)) {
			sources.agencyPublic.all({onSuccess: function(event) {displayItems()}
			}
			)
			
		}
		else {
			$$('errorDiv1').setValue("Sign in failed");
			$$('richTextFullName').setValue('');
		}
	}
	
	function displayItems() {

		if (sources.agencyPublic.length==0) {
			$$('errorDiv1').setValue("You are not an agent");
			$$('buttonSignOut').show();
			$$('buttonLogin').hide();
			$$('containerSetup').hide();
			return;
		}
		
			$$('containerSetup').show();		
			$$('buttonSignOut').show();
			$$('buttonLogin').hide();
			$$('buttonRegister').hide();
			//loginObj={};
			//sources.loginObj.sync();
			$$('richTextFullName').setValue(WAF.directory.currentUser().userName);
			$$('errorDiv1').setValue("You've signed in");		
	}

// @region eventManager// @startlock
	WAF.addListener("combobox1", "change", combobox1.change, "WAF");
	WAF.addListener("buttonApplicants", "click", buttonApplicants.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("buttonRegister", "click", buttonRegister.click, "WAF");
	WAF.addListener("buttonCategories", "click", buttonCategories.click, "WAF");
	WAF.addListener("buttonSignOut", "click", buttonSignOut.click, "WAF");
	WAF.addListener("buttonLogin", "click", buttonLogin.click, "WAF");
// @endregion
};// @endlock
