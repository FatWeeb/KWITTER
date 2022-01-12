var firebaseConfig = {
      apiKey: "AIzaSyDRAsNr9qi2LVrm5JopnnBPBmkD6FHmogA",
      authDomain: "kwitter-b278a.firebaseapp.com",
      databaseURL: "https://kwitter-b278a-default-rtdb.firebaseio.com",
      projectId: "kwitter-b278a",
      storageBucket: "kwitter-b278a.appspot.com",
      messagingSenderId: "537127412508",
      appId: "1:537127412508:web:b0c80c38d4560794a590d9"
    };
    
    firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send()
{
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            Name:user_name,
            message:msg,
            like:0
       });

      document.getElementById("msg").value = "";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

      console.log(firebase_message_id);
      console.log(message_data);
      Name = message_data['Name'];
      message = message_data['message'];
      like = message_data['like'];
      Name_with_tag = "<h4>"+ Name + "<img class='user_tick' src='tick.png'></h4>";
      message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
 like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
      span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

     row  = Name_with_tag + message_with_tag + like_button + span_with_tag;
     document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
          window.location = "index.html";
}

function updateLike(message_id)
{
      console.log("clicked on like button -" + message_id);
      button_id = message_id;
      likes =document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}
