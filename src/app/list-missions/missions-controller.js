app.controller("MissionsController", ["$scope", "HelpService", "MissionsService", "CreateMissionService", "ResultService", function($scope, HelpService, MissionsService, CreateMissionService, ResultService){
	$scope.missions = MissionsService;
	$scope.help = HelpService;
	$scope.createMission = function(){
		MissionsService.remaining() ? CreateMissionService.show() : ResultService.submit(MissionsService.list);
	};
}]);

