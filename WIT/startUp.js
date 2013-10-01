directory.setLoginListener("ptoLogin");

application.addHttpRequestHandler('\\/$','httpDispatcher.js', 'dispatchHandler');
