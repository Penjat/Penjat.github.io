var arrayData = ""

function showAttending(){
  console.log("showing who is attending");
  arrayData = ""
  var ref = firebase.database().ref("users/");
  ref.once("value", function(snapshot) {
    var i = 0;
    // invitedArray = [];
    snapshot.forEach(function(child) {
      console.log(child.key+": "+child.val());
      if (child.child('submitted').val() == true) {
        createGuest(child);
      }
      // console.log("i = " + i);
      // invitedArray.push(child.child('invited').val());
      // setVisible(events[i],child.child('invited').val());
      i++;
    });
    // console.log('invited array ' + invitedArray)
    showList()
});

}
function showNotAttending(){
  console.log("showNotAttending");

  arrayData = ""
  var ref = firebase.database().ref("users/");
  ref.once("value", function(snapshot) {
    var i = 0;
    // invitedArray = [];
    snapshot.forEach(function(child) {
      console.log(child.key+": "+child.val());
      if (child.child('submitted').val() == true) {
        createGuestNotAttending(child);
      }
      // console.log("i = " + i);
      // invitedArray.push(child.child('invited').val());
      // setVisible(events[i],child.child('invited').val());
      i++;
    });
    // console.log('invited array ' + invitedArray)
    showListNotAttending()
});

}
function showNotSubmitted(){
  console.log("show not Subitted");


  arrayData = ""
  var ref = firebase.database().ref("users/");
  ref.once("value", function(snapshot) {
    var i = 0;
    // invitedArray = [];
    snapshot.forEach(function(child) {
      console.log(child.key+": "+child.val());
      if (child.child('submitted').val() == true || child.child('submitted').val() == false) {
        return
      }
      createGuestNotSubmitted(child);
      // console.log("i = " + i);
      // invitedArray.push(child.child('invited').val());
      // setVisible(events[i],child.child('invited').val());
      i++;
    });
    // console.log('invited array ' + invitedArray)
    showListNotSubmitted()
});

}

function createGuestNotAttending(child){
  console.log("creating guest");
  let codeName = child.key;
  let enteredNames = child.child('guestNames').val();

  let event1 = child.child('event1').child('status').val();
  let event2 = child.child('event2').child('status').val();
  let event3 = child.child('event3').child('status').val();
  let names = child.child('names').val();

  if (event1 || event2 || event3) {
    return;
  }

  arrayData += "<tr><td>"+ codeName + "</td><td>"+names+"</td><td>"+enteredNames + "</td><td>"+ event1  +"</td><td>"+ event2  +"</td><td>"+ event3  +"</td></tr>";

}
function createGuestNotSubmitted(child){
  console.log("creating guest");
  let codeName = child.key;
  let enteredNames = child.child('guestNames').val();

  let names = child.child('names').val();

  arrayData += "<tr><td>"+ codeName + "</td><td>"+names+"</td></tr>";

}

function createGuest(child){
  console.log("creating guest");
  let codeName = child.key;
  let enteredNames = child.child('guestNames').val();

  let event1 = child.child('event1').child('status').val();
  let event2 = child.child('event2').child('status').val();
  let event3 = child.child('event3').child('status').val();

  var names = child.child('names').val();
  if (names == "not entered") {
    names = ""
  }

  if (!event1 && !event2 && !event3) {
    return;
  }

  arrayData += "<tr><td>"+ codeName + "</td><td>"+names + "</td><td>"+enteredNames + "</td><td>"+ event1  +"</td><td>"+ event2  +"</td><td>"+ event3  +"</td></tr>";

}

function showList(){
  document.getElementById('attendingCon').innerHTML = "<Table id='guests'> <tr><th>Code</th><th>Names</th><th>Guest Names</th><th>Sangeet</th><th>Ceremony</th><th>Recption</th></tr>" + arrayData + "</table>"
}
function showListNotAttending(){
  document.getElementById('attendingCon').innerHTML = "<Table id='guests'> <tr><th>Code</th><th>Names</th><th>Response</th><th>Sangeet</th><th>Ceremony</th><th>Recption</th></tr>" + arrayData + "</table>"
}
function showListNotSubmitted(){
  document.getElementById('attendingCon').innerHTML = "<Table id='guests'> <tr><th>Code</th><th>Names</th>" + arrayData + "</table>"
}
