app.directive("fullscreen", [
	function () {
		return {
			restrict: "A",
			scope: false,
			link: function (scope, element) {
				element.on("click", function () {
					var el = document.documentElement,
						rfs = el.requestFullscreen
						|| el.webkitRequestFullScreen
						|| el.mozRequestFullScreen
						|| el.msRequestFullscreen;

					rfs.call(el);
				});
			}
		};
	}
]);