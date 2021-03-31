//const villagers =;
// const villagerPic = '';
let result,names,icons,villagerDiv,executed;

//define emptyFuntion to use in if statement
let emptyFunction = ( ()=> {
  executed = false;
  return ()=>{
    if (!executed) {
      executed = true;
      $('#populate').empty();
    }  
  };
})();




//add key code to trigger event
$('form').keypress(function (e) {
  var key = e.which;
  if(key == 13)  // the enter key code
   {
     $('#tester').click();
     return false;  
   }
 }); 
 
$( "#tester" ).click(function(){
  //villager id is what user inputs in the form
  villagerBday = document.getElementById("villagerId").value;
  //console.log(villagerId);

  //make ajax api call to anchapi
  $.ajax({
    method: 'GET',
    url: "https://acnhapi.com/v1a/villagers/",
    context:document.body
  })
  .done(function(villagers) {
    //console log to check if we have all villagers in array
    //console.log(villagers); 

    //define the filter fuction.
    function twinfinder(villager) {
      return (villager['birthday-string'] == villagerBday);
      
    }
    
    //filter villagers by user bday input
    birthdaytwin = villagers.filter(twinfinder);
    console.log(birthdaytwin);

    //birthdaytwin = birthdaytwin.map(twinfinder);

    //when villagers return MORE than one result in array
    if (birthdaytwin.length > 1) {
      emptyFunction();
      //write alert as per number of records.
      console.log(birthdaytwin.length);
      //write a for-loop that parses each record.
      for (let i = 0; i < birthdaytwin.length; i++) {
        result = birthdaytwin[i];
        console.log(result);

        //create dom element
        names = document.createElement('p');
        names.className="text-center py-2 acnh-font";
        images = $('<img class="rounded-corner img-fluid" id="villagerimages">');
        villagerDiv = $('<div class="d-flex flex-column-reverse p-3 bg-white rounded-corner align-items-center">');
        names.appendChild(document.createTextNode("Your Birthday Twin is " + result['name']['name-USen']+"!"));
        images.attr("src", result.image_uri);
        
        //if statement to empty div if there is content
        if (!$.trim($('#populate').html()).length) {
         console.log("empty");
         $('#populate').append(villagerDiv);
         villagerDiv.append(images);
         villagerDiv.append(names);
        }else{
         console.log("full");
         emptyFunction();
         $('#populate').append(villagerDiv);
         villagerDiv.append(images);
         villagerDiv.append(names);
        }
      }
      executed = false;
    }else{
      $('#populate').empty();
      //When villagers returns only ONE twin
      //for each element in array, create HTML elements that will be appended in div
     $.each(birthdaytwin, function(index, twin) {
       console.log(twin.birthday);
       console.log(twin.image_uri);

       //create dom elements
       villagerDiv = $('<div class="p-3 d-flex flex-column-reverse bg-white rounded-corner col-sm-3">');
       images = $('<img class="rounded-corner img-fluid" id="villagerimages">');
       images.attr("src", twin['image_uri']);
       names = document.createElement('h3');
       names.className="text-center py-2 blockquote";
       names.appendChild(document.createTextNode("Your Birthday Twin is "+twin['name']['name-USen']+"!"));
       
       //if statement to eliminate continuous appending for search
       if (!$.trim($('#populate').html()).length) {
        console.log("empty");
        $('#populate').append(villagerDiv);
        villagerDiv.append(names);
        villagerDiv.append(images);
       }else{
        console.log("full");
        $('#populate').empty();
        $('#populate').append(villagerDiv);
        villagerDiv.append(names);
        villagerDiv.append(images);
       }
     });
    }

  })
  .fail(function() {
    console.log("error");
  });
});
