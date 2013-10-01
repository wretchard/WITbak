
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
	var textFieldSearch = {};	// @textField
	var radioGroupTime = {};	// @radioGroup
	var menuAgent = {};	// @menuItem
	var menuScheduler = {};	// @menuItem
	var menuRegister = {};	// @menuItem
	var menuHome = {};	// @menuItem
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		//sources.where.addListener("onCurrentElementChange", honk)
		$('#dataGridWhere').hover(
		function() {
			$('#errorDiv1').html('Select a city');
		},
		
		function() {
			$('#errorDiv1').html('');
		}
		);
		//map
		$('#googleMaps1').hover(
		function() {
			$('#errorDiv1').html('Click the icons for detail');
		},
		
		function() {
			$('#errorDiv1').html('');
		}
		);	
		//radio
		$('#containerRadio').hover(
		function() {
			$('#errorDiv1').html('See arrivals in the future');
		},
		
		function() {
			$('#errorDiv1').html('');
		}
		);				
	};// @lock

function honk(event) {
	//$$('googleMaps1').setCenter("New York")
	$$('googleMaps1').rebuild()
}

	var destHost=fieldChecker.giveHost();
	

	textFieldSearch.keydown = function textFieldSearch_keydown (event)// @startlock
	{// @endlock
		if(event.keyCode == 13)
		{
    		searchCity(this.getValue());
		}
	};// @lock

function searchCity(vCity) {
	
	
	sources.where.query("city=:1", vCity, {
			onSuccess:function (event) {
				$$('googleMaps1').setCenter(event.dataSource.city)
				$$('errorDiv1').setValue('')
			}
			}
		
		)
};

	radioGroupTime.change = function radioGroupTime_change (event)// @startlock
	{// @endlock

		var tarDay=new Date();
		var vPlace=""
		if ($$('textFieldSearch').getValue() !=="")
		{
			vPlace=$$('textFieldSearch').getValue()
		}
		else if (sources.where.city !== null)
		{
			vPlace=sources.where.city
		}
		else {
			$$('errorDiv1').setValue('There is no chosen city')
			return;
		}
		//calculate future
		vOffset=parseInt(this.getValue())
		tarDay.setDate(tarDay.getDate() + vOffset)
		var strDate= tarDay.toJSON()
		strDate.slice(0,strDate.indexOf("T"))
		sources.where.query("city =:1 and fromWhen > :2", vPlace, strDate, {
			onSuccess:function (event) {
				$$('googleMaps1').setCenter(event.dataSource.city)
			}
			});
	};// @lock

	menuAgent.click = function menuAgent_click (event)// @startlock
	{// @endlock
		var strHost;
		if (destHost=='localhost') {
			strHost="http://127.0.0.1:8081/Agent.waPage/index.html"
		}
		else {
			strHost="http://" + destHost + "/Agent.waPage/index.html" 
		}
		window.open(strHost)			
		//window.open("http://127.0.0.1:8081/Agent.waPage/index.html");
	};// @lock

	menuScheduler.click = function menuScheduler_click (event)// @startlock
	{// @endlock
		var strHost;
		if (destHost=='localhost') {
			strHost="http://127.0.0.1:8081/Scheduler.waPage/index.html"
		}
		else {
			strHost="http://" + destHost + "/Scheduler.waPage/index.html" 
		}
		window.open(strHost)		
	};// @lock

	menuRegister.click = function menuRegister_click (event)// @startlock
	{// @endlock
		var strHost;
		if (destHost=='localhost') {
			strHost="http://127.0.0.1:8081/Registration.waPage/index.html"
		}
		else {
			strHost="http://" + destHost + "/Registration.waPage/index.html" 
		}
		window.open(strHost)
	
	};// @lock

	menuHome.click = function menuHome_click (event)// @startlock
	{// @endlock
		var strHost;
		if (destHost=='localhost') {
			strHost="http://127.0.0.1:8081/index.waPage/index.html"
		}
		else {
			strHost="http://" + destHost + "/index.waPage/index.html" 
		}
		window.open(strHost)		
		//window.open("http://127.0.0.1:8081/index.waPage/index.html");
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("textFieldSearch", "keydown", textFieldSearch.keydown, "WAF");
	WAF.addListener("radioGroupTime", "change", radioGroupTime.change, "WAF");
	WAF.addListener("menuAgent", "click", menuAgent.click, "WAF");
	WAF.addListener("menuScheduler", "click", menuScheduler.click, "WAF");
	WAF.addListener("menuRegister", "click", menuRegister.click, "WAF");
	WAF.addListener("menuHome", "click", menuHome.click, "WAF");
// @endregion
};// @endlock
