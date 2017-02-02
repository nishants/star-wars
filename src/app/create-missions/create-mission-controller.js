app.controller("WizardController", ["$scope", "PlanetsService", "VehiclesService", "CreateMissionService", function ($scope, PlanetsService, VehiclesService, CreateMissionService) {
	$scope.planets  = PlanetsService;
	$scope.vehicles = VehiclesService;
	$scope.wizard   = CreateMissionService;
}]);

