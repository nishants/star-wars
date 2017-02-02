beforeEach(function () {
  jasmine.addMatchers({
    toBePlaying: function () {
      return {
        compare: function (actual, expected) {
          var player = actual;

          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying
          };
        }
      };
    }
  });
});

helper = {
  likeArray : function(arr){
    return arr.map(function(e){
      return jasmine.objectContaining(e);
    });
  },

  initializeWith: function(params, $httpBackend){
    $httpBackend.when('GET', params.remote + '/planets')
        .respond(params.planets);
    $httpBackend.when('GET', params.remote + '/vehicles')
        .respond(params.vehicles);
    $httpBackend.flush();
  }
};