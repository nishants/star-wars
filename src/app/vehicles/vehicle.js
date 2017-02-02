app.service("Vehicle", ["vehicleIcons", function(vehicleIcons){


	return {
		create: function(data){
			var vehicle = {
				name: data.name,
				speed: data.speed,
				icon: vehicleIcons[data.name] || vehicleIcons["other"],
				remaining: data.total_no,
				total_no: data.total_no,
				max_distance: data.max_distance,
				assign: function () {
					--vehicle.remaining;
				},
				unassign: function () {
					++vehicle.remaining;
				}
			};
			return vehicle;
		}
	};
}]);