app.controller("ResultController", ["$scope", "ResultService",  "$window", "MissionsService", function($scope, ResultService, $window, MissionsService){
	$scope.result = ResultService;
	$scope.playAgain = function(){
		MissionsService.reset();
		ResultService.reset();
	};
}]);