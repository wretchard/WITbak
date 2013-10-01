
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Categories';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var buttonClose = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonClose.click = function buttonClose_click (event)// @startlock
	{// @endlock
		$$('componentAgent').removeComponent()
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonClose", "click", buttonClose.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
