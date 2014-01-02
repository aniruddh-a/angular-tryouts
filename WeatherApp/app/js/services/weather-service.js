weatherAppApi.service('WeatherService', function($http, weatherServiceApiBaseUri, weatherServiceResponseMode, weatherServiceApiKey) {

	this.getWeatherHistoryForCity = function(cityName, units, startDate, endDate, successCallback, errorCallback){

		var uri = weatherServiceApiBaseUri + 'history/' + 'city'+ '?q=' + cityName + '&type=day&start='+ startDate +'&end=' + endDate +'&cnt=1' + '&mode=' + weatherServiceResponseMode + '&APPID=' + weatherServiceApiKey + '&callback=JSON_CALLBACK'; 
		$http.jsonp(uri)
		.success(function(data) {
			successCallback(data);
		})
		.error(function(error, status){
			errorCallback(error, status);
		});
	}

});
