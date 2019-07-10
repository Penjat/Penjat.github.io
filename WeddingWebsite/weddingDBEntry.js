var numInvited = 0
function plusPressed(){
  console.log("plusPressed");
  numInvited++;
  document.getElementById('numInvited').innerHTML = "" + numInvited

}
function minusPressed(){
  console.log("minusPressed");
  if(numInvited > 0){
    numInvited--;
    document.getElementById('numInvited').innerHTML = "" + numInvited
  }
}
function createEvent(index,invited){
  var number = index+1;
  var eventName = 'event ' + number;
  //TODO get data from page
  return {'invited':invited , 'status':false};
}
function createEntry(){
  console.log("creating entry");
  //get all data from page and make sure is correct
  let invited1 = document.getElementById('event1').checked;
  let invited2 = document.getElementById('event2').checked;
  let invited3 = document.getElementById('event3').checked;

  //check are invited to at least one event
  if (!invited1 && !invited2 && !invited3 ){
    console.log("must be invited to at least one event");
    return;
  }
  let codeName = document.getElementById('codeField').value.toLowerCase();
  let names = document.getElementById('namesField').value;

  if(names == "" || codeName == ""){
    console.log("must provide name and codeName");
    return
  }

  let event1 = createEvent(0,invited1);
  let event2 = createEvent(1,invited2);
  let event3 = createEvent(2,invited3);
  // console.log('curName = ' + curName);
  firebase.database().ref('users/' + codeName).set({
    'names' : names,
    'numInvited' : numInvited,
    event1,
    event2,
    event3
  });
  resetAll();
  console.log("entry created successfully");
}
function resetAll(){
  document.getElementById('codeField').value = ""
  document.getElementById('namesField').value = ""

  document.getElementById('event1').checked = true;
  document.getElementById('event2').checked = true;
  document.getElementById('event3').checked = true;

}
function getAllData(){
  console.log("getting the data");
  var ref = firebase.database().ref("users");
  
}
