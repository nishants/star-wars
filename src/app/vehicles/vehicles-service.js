app.service("VehiclesService", ["$http", "remote", "requestConfig", "Vehicle", function($http, remote, requestConfig, Vehicle){
	var vehicles = {
		list: [],
		load: function(){
			$http.get(remote + "/vehicles", {}, requestConfig).then(function(response){
				vehicles.list = response.data.map(Vehicle.create);
			});
		}
	};

	return vehicles;
}]);