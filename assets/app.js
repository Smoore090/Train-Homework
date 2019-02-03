
$(document).ready(function(){
  
    $(".current-time").text("Current Time: " + moment(moment()).format("hh:mm"));

      var config = {
        apiKey: "AIzaSyC2DQ6cnmesyO7OXHLVTuBOkI7q730xtH8",
        authDomain: "train-homework-c3354.firebaseapp.com",
        databaseURL: "https://train-homework-c3354.firebaseio.com",
        projectId: "train-homework-c3354",
        storageBucket: "train-homework-c3354.appspot.com",
        messagingSenderId: "507657800944"
      };
      firebase.initializeApp(config);
  
      var trainName = " ";
      var destination = " ";
      var frequency = "hh:mm";
      var nextArrival = "hh:mm";
      var minutesAway = "hh:mm"
        
 
    $("#add-train").submit(function(event){
      event.preventDefault();
  
      trainName = $("#input-train-name").val().trim();
      destination = $("#input-destination").val().trim();
      frequency = $("#input-frequency").val().trim();
      nextArrival = $("#input-next-arrival").val().trim();
      minutesAway = $("#input-minutes-away").val().trim();
      console.log(trainName);
      var newTrain= {
        trainName:trainName,
        destination:destination,
        frequency:frequency,
        nextArrival:nextArrival,
        minutesAway:minutesAway
      }
  
      firebase.database().ref().push(newTrain);
    });

  firebase.database().ref().on("child_added",function(snapshot){
      createRow(snapshot);
      console.log(snapshot);
      console.log(snapshot.val());
    })
  

  function createRow(data) {
    console.log(data.val);
    const tBody = $("tbody");
    const tRow = $("<tr>");

    const trainNameTd = $("<td>").text(data.val().trainName || "no trainName");
    const destinationTd = $("<td>").text(data.val().destination || "no destination");
    const frequencyTd = $("<td>").text(data.val().frequency || "no frequency");
    const nextArrivalTd = $("<td>").text(data.val().nextArrival || "no nextArrival");
    const minutesAwayTd = $("<td>").text(data.val().minutesAway || "No Minutes Away");
  
    tRow.append(trainNameTd, destinationTd, frequencyTd, nextArrivalTd, minutesAwayTd);
  
    tBody.append(tRow);
  
  }
 
  
  });
