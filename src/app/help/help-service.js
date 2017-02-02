app.service("HelpService", [function () {
	var help = {
		message: function (missions, ui) {
			return help.states.find(function (state) {
				return state.select(missions, ui);
			}).message(missions, ui);
		},

		states: [
			{
				name: "no-missions",
				message: function () {
					return "Create a mission";
				},
				select: function (missions) {
					return missions.list.length == 0;
				},
			},
			{
				name: "need-more-missions",
				message: function (missions) {
					var remainingMissions = missions.remaining(),
						moreThanOne = remainingMissions > 1;
					return "Create <count> more mission<s>".replace("<count>", remainingMissions).replace("<s>", moreThanOne ? "s" : "");
				},
				select: function (missions) {
					return missions.list.length > 0 && missions.remaining() > 0;
				},
			},
			{
				name: "send-mission",
				message: function () {
					return "Send Missionaries";
				},
				select: function (missions) {
					return missions.remaining() == 0;
				},
			}

		]
	};
	return help;
}]);