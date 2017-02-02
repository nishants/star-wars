app.directive("gameProgress", ["MissionsService", function (MissionsService) {

	var states = {
		4: "zero",
		3: "one",
		2: "two",
		1: "three",
		0: "four",
	};

	return {
		restrict: "C",
		scope: true,
		link: function (scope) {

			scope.progress = {state: states[MissionsService.remaining()]};

			scope.$watch(function () {
				return MissionsService.remaining();
			}, function (value) {
				scope.progress.state = states[value];
			});

		}
	};
}]);