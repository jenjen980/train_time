
// Initialize Firebase and change the values of the config values with your own Firebase config values.

//{/* <script src="https://www.gstatic.com/firebasejs/5.1.0/firebase.js"></script> */}
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAo96ze8zFBYKdak0xwkgfixNtrJKpvkO0",
    authDomain: "train-time-a8429.firebaseapp.com",
    databaseURL: "https://train-time-a8429.firebaseio.com",
    projectId: "train-time-a8429",
    storageBucket: "train-time-a8429.appspot.com",
    messagingSenderId: "291213822402"
  };
  firebase.initializeApp(config);
 // import 'firebase/database';

// Create a variable to reference the database
var database = firebase.database();

 var name = "";
 var destination = "";
 var time = "";
 var frequency = "";

//capture button click
$("#add-train").on("click", function(event){
    event.preventDefault();

    //get the values from the text boxes
    var name = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var time = $("#first-time").val().trim();
    var frequency = $("#frequency").val().trim();

    //the push to database
    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});
    database.ref().on("child_added", function(childSnapshot) {
    //database.ref().on("value", function(snapshot){    

   // var sv = snapshot.val();
//storing snapshot value
    // console.log(sv.name);
    // console.log(sv.destination);
    // console.log(sv.time);
    // console.log(sv.frequency);

    var newName = childSnapshot.val().name;
    var newDestination = childSnapshot.val().destination;
    var newTime = childSnapshot.val().time;
    var newFrequency = childSnapshot.val().frequency;
    console.log(name);
    console.log(destination);

    
    // console.log(childSnapshot.val().name);
    // console.log(childSnapshot.val().destination);
    // console.log(childSnapshot.val().time);
    // console.log(childSnapshot.val().frequency);

    var convertedTime = moment(newTime, "hh:mm").subtract(1,"years");

    var currentTime = moment();
    
    var timeDifference = moment().diff(moment(convertedTime), "minutes");

    var remainderTime = timeDifference % newFrequency;

    var minutesNewTrain = newFrequency - remainderTime;

    var trainNext = moment().add(minutesNewTrain, "minutes");
    var trainCatch = moment(trainNext).format("HH:mm");

    $("#display").append(
        '<tr><td>' + newName +
        '</td><td>' + newDestination +
        '</td><td>' + newFrequency + 
        '</td><td>' + trainCatch + 
        '</td><td>' + minutesNewTrain + ' </td></tr>'
    )

    $("#trainName, #destination, #first-Time, #frequency").val("");
    return false;



//change the html
    // $("#train-name").text(sv.name);
    // $("#destination").text(sv.destination);
    // $("#first-time").text(sv.time);
    // $("#frequency").text(sv.frequency);

}, function(errorObject){
    console.log("The read failed: " + errorObject.code);
});
