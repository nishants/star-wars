app.service("MissionsService", [function () {
	var
		MAX_MISSIONS = 4,
		missions = {
			add: function (planet, vehicle) {
				planet.assign();
				vehicle.assign();
				missions.list.push({
					planet: planet,
					vehicle: vehicle
				});
			},
			remaining: function(){
				return (MAX_MISSIONS - missions.list.length);
			},
			reset: function(){
				while(missions.remaining() < MAX_MISSIONS){
					missions.remove(0);
				}
			},
			remove: function (index) {
				var mission = missions.list[index];
				mission.planet.unassign();
				mission.vehicle.unassign();
				missions.list.splice(index, 1);
			},
			list: []
		};
	return missions;
}]);