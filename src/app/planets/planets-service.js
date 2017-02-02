app.service("PlanetsService", ["$http", "remote", "requestConfig", "Planet", function($http, remote, requestConfig, Planet){
	var planets = {
		list: [],
		load: function(){
			return $http.get(remote + "/planets", {}, requestConfig).then(function(response){
				planets.list = response.data.map(Planet.create);
			});
		}
	};
	return planets;
}]);