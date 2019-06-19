var events;
var invitedArray;
var curName;

function showInvites(willShow){
  var rsvpCon = document.getElementById('rsvpCon');
  if (willShow) {
    rsvpCon.style.display = "block";
  }else{
    rsvpCon.style.display = "none";
  }
}
function showNotFound(willShow){
  var notFoundMsg = document.getElementById('notFoundMsg');
  if (willShow) {
    notFoundMsg.style.display = "block";
  }else{
    notFoundMsg.style.display = "none";
  }
}
function showSubmitted(visable){

  var submittedCon = document.getElementById('submittedCon');
  if (visable){
    submittedCon.style.display = "block";
    return
  }
  submittedCon.style.display = "none";

}

function showEntry(visable){
  var entryCon = document.getElementById('entryCon');
  if (visable){
    entryCon.style.display = "block";
    return
  }
  entryCon.style.display = "none";
}



function setUp(){
  console.log('setting up');
  showInvites(false);
  showNotFound(false);
  showSubmitted(false);
  showEntry(true);
  events = [
    document.getElementById('sangeetCon'),
    document.getElementById('ceremonyCon'),
    document.getElementById('receptionCon')]
}

function setVisible(event,isInvited){
  if (!event){
    return;
  }
  if (isInvited == true){
    // event.style.visibility = "visible";
    event.style.display = "block";
    return;
  }
  // event.style.visibility = "hidden";
  event.style.display = "none";
}

function printInvited(user){
  console.log('printing invited...');
  user.once("value", function(snapshot) {
  var i = 0;
  invitedArray = [];
  snapshot.forEach(function(child) {
    console.log(child.key+": "+child.val());
    console.log("i = " + i);
    invitedArray.push(child.child('invited').val());
    setVisible(events[i],child.child('invited').val());
    i++;
  });
  console.log('invited array ' + invitedArray)
});
}
function showWelcomeMSG(ref){
  ref.once("value", function(snapshot) {
    // document.getElementById('welcomeMsg').innerHTML = "Welcome " + snapshot.val().names + "."
    document.getElementById('welcomeMsg').innerHTML = "Welcome"
    console.log("msg is " + snapshot.val().names);
  })
}
function pressedButton(){
  console.log("pressed the button");
  var groupName = document.getElementById('codeInput');
  var ref = firebase.database().ref("users/"+groupName.value);


  showWelcomeMSG(ref)


  ref.on('value', function(snapshot) {
     if (snapshot.exists()){
        showInvites(true);
        showNotFound(false);
        showEntry(false);
        //only print if it exitst
        printInvited(ref);
        curName = groupName.value;
     }else{
        showInvites(false);
        showNotFound(true);
        console.log('unable to find');
      }
  });
}


function getEvent(index){
  var number = index+1;
  var eventName = 'event ' + number;
  if (invitedArray[index] == false){

    return {'invited':false , 'status':false};
  }
  var isChecked = document.getElementById('checkboxEvent' + number).checked;
  return {'invited':true , 'status':isChecked};
}

function submitData(){
  let event1 = getEvent(0);
  let event2 = getEvent(1);
  let event3 = getEvent(2);
  var ref = firebase.database().ref("users/"+curName);
  var _names = "";
  var _numInvited = 0;
  ref.once("value", function(snapshot) {
    _names = snapshot.val().names;
    _numInvited = snapshot.val().numInvited;
  })

  console.log('curName = ' + curName);
  firebase.database().ref('users/' + curName).set({
    'submitted' : true,
    names : _names,
    numInvited : _numInvited,
    event1,
    event2,
    event3
  });
  console.log();
  console.log();
  console.log();
  showSubmitted(true);
  showInvites(false);
  showNotFound(false);
  showEntry(false);

}
function toggleEvent(eventNumber){
  console.log("toggling event " + eventNumber)
}
