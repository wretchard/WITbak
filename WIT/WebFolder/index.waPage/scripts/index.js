
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var buttonReset = {};	// @button
	var comboCategory = {};	// @combobox
	var menuTipJar = {};	// @menuItem
	var menuWiki = {};	// @menuItem
	var menuAmazon = {};	// @menuItem
	var menuBelmont = {};	// @menuItem
	var documentEvent = {};	// @document
	var textFieldSearch = {};	// @textField
	var radioGroupTime = {};	// @radioGroup
	var menuAgent = {};	// @menuItem
	var menuScheduler = {};	// @menuItem
	var menuRegister = {};	// @menuItem
	var menuHome = {};	// @menuItem
// @endregion// @endlock

// eventHandlers// @lock

	buttonReset.click = function buttonReset_click (event)// @startlock
	{// @endlock
		sources.where.all();
	};// @lock

	comboCategory.change = function comboCategory_change (event)// @startlock
	{// @endlock
			vCity =this.getValue();
			sources.where.filterQuery("category=:1", vCity, {
			onSuccess:function (event) {
				$$('googleMaps1').setCenter(event.dataSource.city)
				$$('errorDiv1').setValue('')
			}
			}
		
		)
	};// @lock

	menuTipJar.click = function menuTipJar_click (event)// @startlock
	{// @endlock
		window.open("http://wretchard.com/tipjar.html", "_blank");
	};// @lock

	menuWiki.click = function menuWiki_click (event)// @startlock
	{// @endlock
		window.open("http://en.wikipedia.org/wiki/Belmont_Club", "_blank");
	};// @lock

	menuAmazon.click = function menuAmazon_click (event)// @startlock
	{// @endlock
		window.open("https://www.amazon.com/author/fernandezrichard", "_blank");
	};// @lock

	menuBelmont.click = function menuBelmont_click (event)// @startlock
	{// @endlock
		window.open("http://pjmedia.com/richardfernandez/", "_blank");
	};// @lock

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
		//citysearchfield
		$('#textFieldSearch').hover(
		function() {
			$('#errorDiv1').html('Enter a city to search');
		},
		
		function() {
			$('#errorDiv1').html('');
		}
		);
		//combobox
		$('#comboCategory').hover(
		function() {
			$('#errorDiv1').html('Choose a category to search');
		},
		
		function() {
			$('#errorDiv1').html('');
		}
		);
		//load up the combo box
		sources.where.distinctValues('category',
		{onSuccess: function(event) {
			dv=event.distinctValues;
			for (var i=0; i<dv.length; i++) {
				$$('comboCategory').addOption(dv[i],dv[i])
			}
			}
		}
		)									
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
	
	
	sources.where.filterQuery("city=:1", vCity, {
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
			strHost="http://127.0.0.1:8081/Agent/"
		}
		else {
			strHost="http://" + destHost + "/Agent/" 
		}
		window.open(strHost)			
		//window.open("http://127.0.0.1:8081/Agent.waPage/index.html");
	};// @lock

	menuScheduler.click = function menuScheduler_click (event)// @startlock
	{// @endlock
		var strHost;
		if (destHost=='localhost') {
			strHost="http://127.0.0.1:8081/Scheduler/"
		}
		else {
			strHost="http://" + destHost + "/Scheduler/" 
		}
		window.open(strHost)		
	};// @lock

	menuRegister.click = function menuRegister_click (event)// @startlock
	{// @endlock
		var strHost;
		if (destHost=='localhost') {
			strHost="http://127.0.0.1:8081/Registration/"
		}
		else {
			strHost="http://" + destHost + "/Registration/" 
		}
		window.open(strHost)
	
	};// @lock

	menuHome.click = function menuHome_click (event)// @startlock
	{// @endlock
		var strHost;
		if (destHost=='localhost') {
			strHost="http://127.0.0.1:8081/index/"
		}
		else {
			strHost="http://" + destHost + "/index/" 
		}
		window.open(strHost)		
		//window.open("http://127.0.0.1:8081/index.waPage/index.html");
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("buttonReset", "click", buttonReset.click, "WAF");
	WAF.addListener("comboCategory", "change", comboCategory.change, "WAF");
	WAF.addListener("menuTipJar", "click", menuTipJar.click, "WAF");
	WAF.addListener("menuWiki", "click", menuWiki.click, "WAF");
	WAF.addListener("menuAmazon", "click", menuAmazon.click, "WAF");
	WAF.addListener("menuBelmont", "click", menuBelmont.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("textFieldSearch", "keydown", textFieldSearch.keydown, "WAF");
	WAF.addListener("radioGroupTime", "change", radioGroupTime.change, "WAF");
	WAF.addListener("menuAgent", "click", menuAgent.click, "WAF");
	WAF.addListener("menuScheduler", "click", menuScheduler.click, "WAF");
	WAF.addListener("menuRegister", "click", menuRegister.click, "WAF");
	WAF.addListener("menuHome", "click", menuHome.click, "WAF");
// @endregion
};// @endlock
