/**
* Templates
*/

// TODO - Get the PSET ID from a dropdown
Session.set("pset", 0);



Template.messages.messages = function () {
    // TODO - Adjust this to only find messages in the pset selected.s
    return Messages.find({psetid:Session.get("pset")}, { sort: { time: -1 }});
}

Template.input.events = {
    'keydown input#message' : function (event) {
        if (event.which == 13) { // 13 is the enter key event
            var name = 'Anonymous';
            var user = Meteor.user();
            if (user) {
                name = Meteor.user().profile.name;
                if(user.services.github.username){
                   name = user.services.github.username;
                }
            }
            var message = document.getElementById('message');
            
            if (message.value != '') {
                //TODO - add a property for the pset id
                Messages.insert({
                    name: name,
                    psetid:Session.get("pset"),
                    message: message.value,
                    time: Date.now()
                });

                document.getElementById('message').value = '';
                message.value = '';
            }
        }
    },
    'change select#pset' : function (event) {
        Session.set("pset", document.getElementById('pset').value);
    }
}

