//const villagers =;
// const villagerPic = '';
let result,names,icons,villagerDiv,executed,description;

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
        names.className="text-center my-0 py-2 acnh-font";
        description = document.createElement('p');
        description.className="text-center py-0"
        images = $('<img class="rounded-corner img-fluid" id="villagerimages">');
        villagerDiv = $('<div class="d-flex flex-column-reverse p-3 bg-white rounded-corner align-items-center">');
        names.appendChild(document.createTextNode("Your Birthday Twin is " + result['name']['name-USen']+"!"));
        description.appendChild(document.createTextNode("They are a "+result.species+" villager with a "+result.personality+" personality!"));
        images.attr("src", result.image_uri);

        let populateFunction = function() {
          $('#populate').append(villagerDiv);
          
          villagerDiv.append(description);
          villagerDiv.append(names);
          villagerDiv.append(images);
         }
        
        //if statement to empty div if there is content
        if (!$.trim($('#populate').html()).length) {
         console.log("empty");
         populateFunction();
        }else{
         console.log("full");
         emptyFunction();
         populateFunction();
        }
      }
      executed = false;
    }else if (birthdaytwin.length == 1) {
      console.log(birthdaytwin.length);
      $('#populate').empty();
      //When villagers returns only ONE twin
      //for each element in array, create HTML elements that will be appended in div
     $.each(birthdaytwin, function(index, twin) {

       //create dom elements
       villagerDiv = $('<div class="p-3 me-0 d-flex align-middle flex-column-reverse bg-white rounded-corner">');
       images = $('<img class="rounded-corner img-fluid" id="villagerimages">');
       images.attr("src", twin['image_uri']);
       names = document.createElement('h3');
       description = document.createElement('p');
       description.className="text-center py-0"
       names.className="text-center my-0 py-2 blockquote";
       names.appendChild(document.createTextNode("Your Birthday Twin is "+twin['name']['name-USen']+"!"));
       description.appendChild(document.createTextNode("They are a "+twin.species+" villager with a "+twin.personality+" personality!"));

       let populateFunction = function() {
        $('#populate').append(villagerDiv);
        
        villagerDiv.append(description);
        villagerDiv.append(names);
        villagerDiv.append(images);
       }

       
       //if statement to eliminate continuous appending for search
       if (!$.trim($('#populate').html()).length) {
        console.log("empty");
        populateFunction();
       }else{
        console.log("full");
        $('#populate').empty();
        populateFunction();
       }
     });
    }else{
      console.log(birthdaytwin.length);
      villagerDiv = $('<div class="p-3 me-0 d-flex align-middle flex-column-reverse bg-white rounded-corner">');
      
      let notice = document.createElement('p');
       notice.className="text-center py-2";
      notice.appendChild(document.createTextNode("There is no twin with your birthday  :("));

      $('#populate').empty();
      villagerDiv.append(notice);
      $('#populate').append(villagerDiv);
    }

  })
  .fail(function() {
    console.log("error");
  });
});
