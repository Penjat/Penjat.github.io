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

function createGuest(child){
  console.log("creating guest");
  let codeName = child.key;
  let enteredNames = child.child('guestNames').val();

  let event1 = child.child('event1').child('status').val();
  let event2 = child.child('event2').child('status').val();
  let event3 = child.child('event3').child('status').val();

  if (!event1 && !event2 && !event3) {
    return;
  }

  arrayData += "<tr><td>"+ codeName + "</td><td>"+enteredNames + "</td><td>"+ event1  +"</td><td>"+ event2  +"</td><td>"+ event3  +"</td></tr>";

}

function showList(){
  document.getElementById('attendingCon').innerHTML = "<Table id='guests'> <tr><th>Code</th><th>Names</th><th>Sangeet</th><th>Ceremony</th><th>Recption</th></tr>" + arrayData + "</table>"
}
