var weatherAppApi = angular.module('WeatherAppApi', []);
weatherAppApi.value('version','0.1');
weatherAppApi.value('weatherServiceApiBaseUri','http://api.openweathermap.org/data/2.5/');
weatherAppApi.value('weatherServiceResponseMode','json');
weatherAppApi.value('weatherServiceApiKey','XXXXX');