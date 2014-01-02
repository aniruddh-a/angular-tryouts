var dlim = angular.module('MainView', []);

dlim.controller('mainViewController',function($scope, WeatherService){
  $scope.reset = function(){
    $scope.weatherForCities = [];
    $scope.cities = [];
    $scope.unitSystem = "metric";
    $scope.loadingData = [];

  };

  $scope.getWeatherForCity = function(cityName){
    var startDate  = $scope.get30DaysBackUnixTimestamp();
    var endDate = $scope.getCurrentDateUnixTimestamp();

    WeatherService.getWeatherHistoryForCity(cityName,$scope.unitSystem,startDate,endDate,function(data){
      $scope.postProcessData(data, cityName);      
    },function(err,status){
      alert("Error while getting weather for city : " + cityName);  
      //remove from cities array
      $scope.removeCity(cityName);
      $scope.removeCityFromLoadingData(cityName);
    });
    
  }

  $scope.removeCityFromLoadingData = function(cityName){
    var index =  $scope.loadingData.indexOf(cityName.toUpperCase());
    $scope.loadingData.splice(index,1);   
  }


  //needed to post process data as weahermap API is returning data per hour
  $scope.postProcessData = function(data, cityName){
    //console.log(data);
    data.listForDisplay = [];
    var objDate = $scope.convertUnixTimeStamptoDDMMYYFormat(data.list[0].dt);
    data.list.forEach(function(obj){
      obj.redableDate = $scope.convertUnixTimeStamptoDDMMYYFormat(obj.dt);
            if(objDate == obj.redableDate){} //skip as for same date
              else{
                //update objDate to newer one and push
                objDate = obj.redableDate;
                $scope.convertKelvinToCelsius(obj.main);
                data.listForDisplay.push(obj);
              }
            });
    //console.log(data);
    data.listForDisplay = data.listForDisplay.reverse();
    $scope.weatherForCities.push(data);

    $scope.removeCityFromLoadingData(cityName);
  }

  $scope.removeCity = function(cityName, removeWeatherData){
    var cityName = cityName.toUpperCase();
    
    var indexInCities = $scope.cities.indexOf(cityName);
    $scope.cities.splice(indexInCities,1);

    if(removeWeatherData){
      var indexInData ;
      for(var count= 0; count < $scope.weatherForCities.length; count ++){
        if($scope.weatherForCities[count].listForDisplay[0].city.name.toUpperCase() == cityName){
          indexInData = count;
          break;
        }
      }

      $scope.weatherForCities.splice(indexInData,1);
    }
    
  }

  $scope.addCity = function(){
    if(typeof $scope.cityToAdd !== 'undefined' && $scope.cityToAdd != ""){
      var cityName = $scope.cityToAdd.toUpperCase();
      $scope.cityToAdd = "";
      if($scope.cities.indexOf(cityName) == -1 ){
        $scope.cities.push(cityName);
        $scope.loadingData.push(cityName);
        $scope.getWeatherForCity(cityName);
      }else{
        alert("This city is already added :" + cityName);
      }
    }
    else{
      alert("Please enter valid city name");
    }
  }


  $scope.convertUnixTimeStamptoDDMMYYFormat = function(unixTimestamp){
    var date = new Date(unixTimestamp*1000);
    return date.toLocaleDateString();
  }

  $scope.getCurrentDateUnixTimestamp = function(){
    var date = new Date().getTime();
    return parseInt(date/1000);
  }

  $scope.get30DaysBackUnixTimestamp = function(){
    var date = new Date(); //today
    date.setMonth(date.getMonth()-1) ; //date before 1 month
    return parseInt(date.getTime()/1000);
  }


  $scope.reverse = function(array){
    var length = array.length;
    var reversedArray = [];
    for(var count=length; count !=0; count-- ){
      reversedArray.push(array[count]);
    }
  }

  //convert temp in Kelvin to Celsius with decimals upto 2 digits
  $scope.convertKelvinToCelsius = function(obj){
    obj.temp = parseFloat(obj.temp - 273.15).toFixed(2);
    return;
  }

  $scope.reset();
  
});

