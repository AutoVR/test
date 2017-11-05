var loopback = require('loopback');
var fs = require('fs');

module.exports = function(app) {
  var db = app.dataSources.db;

  // Instance JSON document
  var business = {
  businessName: 'ABC Fast Food',
  businessDesc: 'Home food style',
  businessType: 'Fast Food',
  specialty: 'Indian',
  location: [
    {
      address: 'one st',
      city: 'Camarillo',
      zip: '91362',
      openHours: [
        {
          day: 'Monday',
          hours: '10:00 - 4:00'
        }
      ]
    }
  ]
};

var employee = {
  email: "joe@email.com",
  firstName: "Sam",
  lastName: "John",
  skill: [
    "cooking",
    "Bar Tendering"
  ],
  preference: {
    cities: [
      "Thousand Oaks",
      "Camarillo"
    ],
    timings: [
      {
        day: [
          "Monday",
          "wednesday",
          "Friday"
        ],
        beginTime: "10:00",
        endTime: "12:00"
      }
    ]
  },
  references: [
    {
      businessName: "ABC Fast Food",
      review: {}
    }
  ]
};

var shift ={
  businessId: "b1",
  locationId: "l1",
  zipCode: "91362",
  startTime: "2017-11-05T21:13:30.538Z",
  endTime: "2017-11-05T21:13:30.538Z",
  rateAmount: 0,
  jobType: "cook",
  status: "open",
  approvedEmployeeId: "e1",
  approvedRating: "good",
  onTime: false,
  request: [
    {
      employeeid: "e1",
      status: "open",
      appliedDtTime: "2017-11-05T21:13:30.538Z"
    }
  ]
};
  // Create a model from the user instance
  var Business = db.buildModelFromInstance('Shift', shift, {idInjection: true});

  var UserModel = (loopback.getModel(Business));
    var UserModelJSON = {}
    UserModelJSON.name = 'Shift';
    UserModelJSON.base = 'PersistedModel';
    UserModelJSON.properties = UserModel.definition.rawProperties;

    console.log(JSON.stringify(UserModelJSON));

    fs.writeFile('shift.json',JSON.stringify(UserModelJSON), function(err) {
      if (err) throw err;
    });

  // Use the model for create, retrieve, update, and delete
  var obj = new Business(business);

  console.log(obj.toObject());

  Business.create(business, function (err, u1) {
    console.log('Created: ', u1.toObject());
    Business.findById(u1.id, function (err, u2) {
      console.log('Found: ', u2.toObject());
    });
  });
};
