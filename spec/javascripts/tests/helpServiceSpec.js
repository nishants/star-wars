describe('Help', function() {
  var service,
      specs = [
        {
          name    : "message for no missions",
          ui      : {},
          missions: {list: [], remaining(){return 2;}},
          expected: "Create a mission"
        },
        {
          name    : "need more missions",
          ui      : {},
          missions: {list: [{}], remaining(){return 2;}},
          expected: "Create 2 more missions"
        },
        {
          name    : "need one more missions",
          ui      : {},
          missions: {list: [{}], remaining(){return 1;}},
          expected: "Create 1 more mission"
        },
        {
          name    : "send missionaries",
          ui      : {},
          missions: {list: [{}], remaining(){return 0;}},
          expected: "Send Missionaries"
        }

      ];

  beforeEach(module('galaxy'));

  beforeEach(inject(function (_HelpService_) {
    service = _HelpService_;
  }));

  specs.forEach(function (spec) {
    it(spec.name, function () {
      expect(service.message(spec.missions, spec.ui)).toBe(spec.expected)
    })
  })
});