const villagers = {};
const seaID = '';


$( "#tester" ).click(function(){
  seaId = document.getElementById("seaId").value;
  console.log( seaId );

  $.ajax({
    url: "https://acnhapi.com/v1a/sea/"+seaId+"",
    context:document.body,
    success: function myFunction() {
      console.log ("hi")
    }
  }).then(function(){

  });
  });

 