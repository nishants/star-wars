app.service("ResultService", ["$http", "remote", "requestConfig", function ($http, remote, requestConfig) {
	var
		planetNames = function (mission) {return mission.planet.name;},
		vehicleNames = function (mission) {return mission.vehicle.name;},
		vehicleFor   = function (planetName) {
			return function(mission){
				return mission.planet.name == planetName;
			};
		},
		service = {
			loading : false,
			outcome : null,
			reset : function(){
				service.loading = false;
				service.outcome = null;
			},
			submit : function (missionList) {
				service.loading = true;
				return $http.post(remote + "/token", {}, requestConfig).then(function(response){
					var
						token   = response.data.token,
						request = {
							token         : token,
							planet_names  : missionList.map(planetNames),
							vehicle_names : missionList.map(vehicleNames)
						};
					return $http.post(remote + "/find", request, requestConfig).then(function (response) {
						service.outcome = {
							planet_name  : response.data.planet_name,
							status       : response.data.status != "false",
							vehicle_name : response.data.planet_name ? missionList.find(vehicleFor(response.data.planet_name)).vehicle.name : null,
						};
						service.loading = false;
					});

				});
			}
		};
	return service;
}]);