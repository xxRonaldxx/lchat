/**
* Templates
*/
Template.messages.messages = function () {
    return Messages.find({}, { sort: { time: -1 }});
}

Template.input.events = {
  'keydown input#message' : function (event) {
    if (event.which == 13) { // 13 is the enter key event
      var name = 'Anonymous';
      var user = Meteor.user();
      if (user)
      {
        name = Meteor.user().profile.name;
        if(user.services.github.username){
           name = user.services.github.username;
        }
      }
      var message = document.getElementById('message');

      if (message.value != '') {
        Messages.insert({
          name: name,
          message: message.value,
          time: Date.now(),
        });

        document.getElementById('message').value = '';
        message.value = '';
      }
    }
  }
}

