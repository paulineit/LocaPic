var mongoose = require('mongoose');

var user = 'PaulineIT-Locapic'
var password = 'Locapic'
var bddname = 'Locapic'


var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
}

mongoose.connect('mongodb+srv://' + user + ':' + password + '@paulineit-capsule-oupxd.mongodb.net/' + bddname + '?retryWrites=true',
  options,
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('On avance on avance .....!!');
    }
  }
);
