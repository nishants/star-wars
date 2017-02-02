describe('Missions', function () {
  var service,
      $httpBackend,
      mars = {name: "Mars", distance: 143},
      spaceShip = {name: "Space Ship", max_distance: 143},
      remote = "http://server.com/api/v1",
      MissionsService = {add: jasmine.createSpy('add')};

  beforeEach(function() {
    module('galaxy');
    module(function($provide) {
      $provide.value("remote", remote);
      $provide.value("MissionsService", MissionsService);
    });

    inject(function (_CreateMissionService_, $injector, _$q_) {
      service         = _CreateMissionService_;
      $httpBackend  = $injector.get('$httpBackend');
      $q = _$q_;
    });

    helper.initializeWith({
      planets: [],
      vehicles: [],
      remote: remote,
    },$httpBackend);
  });

  it("Should initialize as invisible", function () {
    expect(service.planet).toBeNull();
    expect(service.vehicle).toBeNull();
    expect(service.selectVehicle).toBeFalsy();
    expect(service.showWizard).toBeFalsy();
  });

  it("Should show wizard", function () {
    service.show()
    expect(service.showWizard).toBeTruthy();
  });

  describe('Select Planet', function () {
    beforeEach(function() {
      service.setPlanet(mars)
    });

    it("Should set planet and show vehicle", function () {
      expect(service.planet).toEqual(mars);
      expect(service.selectVehicle).toBeTruthy(mars);
    });

    it("Should now allow selecting vehicle is planet is out of range", function () {
      expect(service.isSelectable({max_distance: mars.distance - 1})).toEqual(false);
      expect(service.isSelectable({max_distance: mars.distance + 1})).toEqual(true);
      expect(service.isSelectable({max_distance: mars.distance})).toEqual(true);
    });

    it("Should close modal on selecting vehicle", function (done) {
      service.setVehicle(spaceShip);
      expect(MissionsService.add).toHaveBeenCalledWith(mars, spaceShip);
      expect(service.planet).toBeNull();
      expect(service.vehicle).toBeNull();
      expect(service.selectVehicle).toBeFalsy();
      expect(service.showWizard).toBeFalsy();
      done();
    });
  });


  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});