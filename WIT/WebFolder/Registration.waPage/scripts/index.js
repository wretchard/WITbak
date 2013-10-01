
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var buttonAcceptances = {};	// @button
	var buttonApply = {};	// @button
	var buttonSignOut = {};	// @button
	var buttonRegister = {};	// @button
	var buttonSignIn = {};	// @button
	var buttonSave = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	buttonAcceptances.click = function buttonAcceptances_click (event)// @startlock
	{// @endlock
		if (sources.speaker.role !==null || sources.speaker.role =='agent') {
			$$('errorDiv1').setValue('An agent cannot get offers');
			return;
		}		
		$('#componentRegister').css({'height':'600px', 'width':'750px', 'left':'15px', 'top':'30px'})
		$$('componentRegister').loadComponent('/Components/TakeOffer.waComponent');
	};// @lock

	buttonApply.click = function buttonApply_click (event)// @startlock
	{// @endlock
		if (sources.speaker.role !==null || sources.speaker.role =='agent') {
			$$('errorDiv1').setValue('An agent cannot get an agent');
			return;
		}
		
		$('#componentRegister').css({'height':'600px', 'width':'750px', 'left':'5px', 'top':'30px'})
		$$('componentRegister').loadComponent('/Components/Apply.waComponent');
	};// @lock

	buttonSignOut.click = function buttonSignOut_click (event)// @startlock
	{// @endlock
		if (WAF.directory.logout()){
			sources.speaker.all()
			$$('errorDiv1').setValue("You've signed out")
			$('#buttonSignOut').css({'top':'517px'})
			$$('buttonSignOut').hide()
			$$('containerSignIn').show()
			$$('containerSpeaker').hide()
		}
	};// @lock

	buttonRegister.click = function buttonRegister_click (event)// @startlock
	{// @endlock
		$('#componentRegister').css({'height':'240px', 'width':'350x', 'left':'50px', 'top':'80px'})
		$$('componentRegister').loadComponent('/Components/NewUser.waComponent');
	};// @lock

	buttonSignIn.click = function buttonSignIn_click (event)// @startlock
	{// @endlock
		signIn()
	};// @lock
	
	function signIn() {
		
		//debugger;
		if (WAF.directory.loginByPassword(WAF.sources.loginObject.loginName, WAF.sources.loginObject.password)) {
			sources.speaker.all()
			$$('containerSignIn').hide()
			$$('containerSpeaker').show()
			$$('buttonSignOut').show()
			$('#buttonSignOut').css({'top':'5px'})
			loginObject={}
			sources.loginObject.sync()
			$$('errorDiv1').setValue("You've signed in")
		}
		else {
			$$('errorDiv1').setValue("Sign in failed")
		}
	}

	buttonSave.click = function buttonSave_click (event)// @startlock
	{// @endlock
		
		$('#textFirst').css('background', 'rgb(255, 255, 255)');
		$('#textLast').css('background', 'rgb(255, 255, 255)');
		$('#textEmail').css('background', 'rgb(255, 255, 255)');
		$('#comboCategory').css('background', 'rgb(255, 255, 255)');
		$('#textSession').css('background', 'rgb(255, 255, 255)');
		$('#comboApply').css('background', 'rgb(255, 255, 255)');
	
		waf.sources.speaker.save(
		{'onSuccess':function(event) {
			$('#errorDiv1').html("Saved!");

		
			},
		
		'onError':function(error) {

			$('#errorDiv1').html(error['error'][0].message);
			
			switch(error['error'][0].errCode) {
			
			case 1:
			$('#textFirst').css('background', 'wheat');
			break;
			
			case 2:
			$('#textLast').css('background', 'wheat');
			break;
			
			case 3:
			$('#textEmail').css('background', 'wheat');
			break;
			
			case 4:
			$('#comboCategory').css('background', 'wheat');
			break;
			
			case 5:
			$('#textSession').css('background', 'wheat');
			break;

			case 6:
			$('#comboApply').css('background', 'wheat');
			break;			
			}

			}
		}	
		)
		
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		if (WAF.directory.currentUser() === null) {
			$$('buttonSignOut').hide()
			$$('containerSignIn').show()
			$$('containerSpeaker').hide()
		}
		else {
			//debugger;
			$$('containerSignIn').hide()
			$$('containerSpeaker').show()
			$('#buttonSignOut').css({'top':'5px'})
			
			
		}
		

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("buttonAcceptances", "click", buttonAcceptances.click, "WAF");
	WAF.addListener("buttonApply", "click", buttonApply.click, "WAF");
	WAF.addListener("buttonSignOut", "click", buttonSignOut.click, "WAF");
	WAF.addListener("buttonRegister", "click", buttonRegister.click, "WAF");
	WAF.addListener("buttonSignIn", "click", buttonSignIn.click, "WAF");
	WAF.addListener("buttonSave", "click", buttonSave.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
var arrControls =['#textFirst', '#textLast', '#textEmail', '#textURL',  '#textSession', '#textSelfDescription']
var arrCombos=['comboCategory', 'comboApply']

