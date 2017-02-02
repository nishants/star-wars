describe('Results', function () {
  var service,
      $httpBackend,
      remote = "www.abc/data",
      tokenResponse   = {token: "xyz-token-value"},
      failureResponse = {status: "false"},
      missions = [
        {planet: {name: "Mars"}   , vehicle: {name: "Dragon"}},
        {planet: {name: "Jupiter"}, vehicle: {name: "Falcon"}},
      ],
      expectedRequest= {
        token         : tokenResponse.token,
        planet_names  : ["Mars", "Jupiter"],
        vehicle_names : ["Dragon", "Falcon"],
      },
      successResponse = {status: "true", planet_name: "Mars"};

  beforeEach(function() {
    module('galaxy');
    module(function($provide) {
      $provide.value("remote", remote);
    });

    inject(function (_ResultService_, $injector) {
      service       = _ResultService_;
      $httpBackend  = $injector.get('$httpBackend');
    });

    helper.initializeWith({
      planets  : [],
      vehicles : [],
      remote   : remote,
    },$httpBackend);

    $httpBackend.when('POST', remote + '/token', {})
        .respond(tokenResponse);
  });

  it("Should have no outcome initially", function () {
    expect(service.outcome).toBeNull();
  });

  it("Should have outcome status as false if game is user lost", function (done) {
    $httpBackend.when('POST', remote + '/find', expectedRequest)
        .respond(failureResponse);

    service.submit(missions);
    expect(service.loading).toBeTruthy();
    $httpBackend.flush();
    expect(service.outcome).toBeDefined();
    expect(service.outcome.status).toBeFalsy();

    service.reset();
    expect(service.outcome).toBeNull();

    done();
  });

  it("Should have outcome status as true if game is user won", function (done) {
    $httpBackend.when('POST', remote + '/find', expectedRequest)
        .respond(successResponse);

    service.submit(missions);
    expect(service.loading).toBeTruthy();
    $httpBackend.flush();
    expect(service.outcome).toBeDefined();
    expect(service.outcome.status).toBeTruthy();
    expect(service.outcome.planet_name).toEqual("Mars");
    expect(service.outcome.vehicle_name).toEqual("Dragon");
    service.reset();
    expect(service.outcome).toBeNull();

    done();
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});