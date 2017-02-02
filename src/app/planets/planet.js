app.service("Planet", [ "planetIcons", function(planetIcons){

	return {
		create: function(data){
			var planet = {
				name    : data.name,
				distance: data.distance,
				assigned: false,
				icon    : planetIcons[data.name] || planetIcons["other"],
				assign: function () {
					planet.assigned = true;
				},
				unassign: function () {
					planet.assigned = false;
				}
			};
			return planet;
		}
	};
}]);