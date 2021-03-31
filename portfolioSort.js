
function runSetup(){
  console.log("setting up portfolio");




}

function sortBy(sortType,button){
  console.log("sorting by " + sortType);
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("allProjects");
  document.getElementById("fliterLabel").innerHTML = "<h4>" + sortType + "</h4>";

  rows = table.getElementsByClassName("projectContainer");
  for (var i = 0; i<rows.length;i++){
    var item = rows[i].getElementsByClassName("skillTags")[0]
    var tags = item.innerHTML.toLowerCase()

    if(sortType == "all"){
      rows[i].style.visibility = "visible";
      rows[i].style.opacity = "1"
      rows[i].style.display = "inline-block";
    }else if (tags.includes(sortType)) {
      rows[i].style.visibility = "visible";
      rows[i].style.opacity = "1"
      rows[i].style.display = "inline-block";

    }else{
        rows[i].style.visibility = "hidden";
        rows[i].style.opacity = "0"
        rows[i].style.display = "none";

    }
  }
}
