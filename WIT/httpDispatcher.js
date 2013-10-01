
function dispatchHandler ( request, response ) {
	var responseTxt
	if (settings.project.hostName=='localhost') {
		 responseTxt='http://localhost:8081/index.waPage/index.html'
	}
	else {
		responseTxt='http://' + settings.project.hostName + '/index.waPage/index.html'
	}
	response.headers.location=responseTxt;
	return;
}