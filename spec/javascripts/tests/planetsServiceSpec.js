describe('Planets', function () {
  var service,
      $q,
      $httpBackend,
      remote = "http://server.com/api/v1",
      planets = [
        {name: "Planet One", distance: 100},
        {name: "Planet Two", distance: 100},
        {name: "Unknown"   , distance: 100},
      ],
      planetIcons = {
        "Planet One"  : "images/path-one.png",
        "Planet Two"  : "images/path-two.jpg",
        "other"       : "images/path-three.png"
      },
      planetWithIcons = [
        { name: 'Planet One', distance: 100, assigned: false, icon: 'images/path-one.png' },
        { name: 'Planet Two', distance: 100, assigned: false, icon: 'images/path-two.jpg' },
        { name: 'Unknown'   , distance: 100, assigned: false, icon: 'images/path-three.png' }
      ];

  beforeEach(function() {
    module('galaxy');
    module(function($provide) {
      $provide.value("remote", remote);
      $provide.value("planetIcons", planetIcons);
    });

    inject(function (_PlanetsService_, $injector, _$q_) {
      service       = _PlanetsService_;
      $httpBackend  = $injector.get('$httpBackend');
      $q = _$q_;
    });
    helper.initializeWith({
      planets : planets,
      vehicles: [],
      remote  : remote
    },$httpBackend);

  });

  it("Should add icons to planets", function () {
    service.load();
    $httpBackend.flush();
    expect(service.list).toEqual(helper.likeArray(planetWithIcons));

  });

  describe('Assign/Unassign Planets', function () {
    it("planets can be assigned, and unassigned", function () {
      service.load();
      $httpBackend.flush();
      var planet = service.list[1];

      expect(planet.assigned).toEqual(false);

      planet.assign()
      expect(planet.assigned).toEqual(true);

      planet.unassign()
      expect(planet.assigned).toEqual(false);
    });
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});