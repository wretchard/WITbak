
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'TakeOffer';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		sources.componentRegister_representation.query("speakerID=:1", sources.speaker.ID)

	// @region namespaceDeclaration// @startlock
	var buttonReject = {};	// @button
	var buttonAccept = {};	// @button
	var buttonCancel = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonReject.click = function buttonReject_click (event)// @startlock
	{// @endlock
		sources.componentRegister_speaker.addAgency(sources.componentRegister_representation.ID, false,
		{onSuccess:function(event) {sources.componentRegister_speaker.all()}}
		
		)
		

	};// @lock

	buttonAccept.click = function buttonAccept_click (event)// @startlock
	{// @endlock
		//debugger;
		sources.componentRegister_speaker.addAgency(sources.componentRegister_representation.ID, true,
		{onSuccess:function(event) {sources.componentRegister_speaker.all()}}
		
		)
	};// @lock

	buttonCancel.click = function buttonCancel_click (event)// @startlock
	{// @endlock
		$$('componentRegister').removeComponent()
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonReject", "click", buttonReject.click, "WAF");
	WAF.addListener(this.id + "_buttonAccept", "click", buttonAccept.click, "WAF");
	WAF.addListener(this.id + "_buttonCancel", "click", buttonCancel.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
