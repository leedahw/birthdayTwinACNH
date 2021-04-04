//declare for global variable
let villagers = [];
let species_s = [];
let button, executed, dataset, personalities, Villagerspecies, results, result, villagerDiv, villager_person, speciesResults, names, icons;

//define emptyFuntion to use in if statement
let emptyFunction = ( ()=> {
 executed = false;
  return ()=>{
    if (!executed) {
      executed = true;
      $('#villagers').empty();
    }  
  };
})();


$(document).ready(function() {
  //define all personalities
  personalities = ["Jock","Uchi","Normal","Cranky","Lazy","Peppy","Smug","Snooty"];

  species_s = ["Alligator","Anteater","Bear","Bird","Bull","Cat","Chicken","Cow","Cub","Deer","Dog","Duck","Eagle","Elephant","Frog","Goat","Gorilla","Hamster", "Hippo","Horse","Kangaroo","Koala","Lion","Monkey","Mouse","Octopus","Ostrich","Penguin","Pig","Rabbit","Rhino","Sheep","Squirrel","Tiger","Wolf"];

  //ajax call to retrieve all villagers.
  $.ajax({
    method: 'GET',
    url: "https://acnhapi.com/v1a/villagers/",
    context:document.body
  })
  .done(function(data) {
    //console log to check if we have all villagers in array
    villagers = data;
    //console.log(villagers); 
    //console.log(villagers[90]);
});

  //dynamic dom render of personality buttons
  for (i = 0 ; i < personalities.length; i++ ) {
    personality = personalities[i];
    //console.log(personality);
    button = $('<button class="filter btn btn-sm m-1 bg-yellow rounded-corner personality" value='+personality+'>'+ personality+'</button>');

    $('#personalityReturned').append(button);
  }

    //dynamic dom render of species buttons
    for (i = 0 ; i < species_s.length; i++ ) {
      species = species_s[i];
      //console.log(species);
      button = $('<button class="filter btn btn-sm m-1 bg-yellow rounded-corner species" value='+species+'>'+ species+'</button>');
  
      $('#speciesReturned').append(button);
    }

  //filter by personality types
  $('.personality').on('click', (e)=>{
    //check for value
    $('#personalityReturned>button.selected').removeClass('selected');
    $(e.target).toggleClass("selected");
    villagerPersonality = $(e.target).attr("value");

    //define the filter fuction based on button value
    function personalityFinder(villagers) {
      return (villagers.personality == villagerPersonality);
    }

    personalityResults = villagers.filter(personalityFinder);
    console.log(personalityResults);

    for (let i = 0; i < personalityResults.length; i++) {
      result = personalityResults[i];

      //create dom element
      names = $('<p>')
      names.addClass("text-center blockquote");
      icons = $('<img class="rounded-corner img-fluid villagerimages">');
      birthdate = $('<p class=" position-relative top-0 left-0 m-1">');
      villagerDiv = $('<div class="personalitys col-md-3 col-lg-2 p-5 mx-3 my-3 bg-white rounded-corner align-items-center villager-shadow">');
      names.append(document.createTextNode(result['name']['name-USen']));
      birthdate.append(document.createTextNode(result.birthday));
      icons.attr("src", result.icon_uri);

      //if statement to empty div if there is content
      if (!$.trim($('#villagers').html()).length) {
        console.log("empty");
        $('#villagers').append(villagerDiv);
        villagerDiv.append(icons);
        villagerDiv.append(names);
        villagerDiv.append(birthdate);
        }else{
        console.log("full");
        emptyFunction();
        $('#villagers').append(villagerDiv);      
        villagerDiv.append(icons);
        villagerDiv.append(names);
        villagerDiv.append(birthdate);
      
        }
    }
    console.log(executed);
    executed = false;

  });

    //step2: filter by Species
    $('.species').on('click', (e)=>{
      //check for value
      $('#speciesReturned>button.selected').removeClass('selected');
      $(e.target).toggleClass("selected");
      villagerSpecies = $(e.target).attr("value");
  
      //define the filter fuction based on button value
      function speciesFinder(personalityResults) {
        return (personalityResults.species == villagerSpecies);
      }
  
      speciesResults = personalityResults.filter(speciesFinder);
      console.log(speciesResults.length);
      if (speciesResults.length==0) {
        $('#villagers').empty();
        $('#villagers').html("There are no "+ villagerSpecies + " villagers with this personality");
      }else{


      for (let i = 0; i < speciesResults.length; i++) {
        result = speciesResults[i];
        
        //create dom element
        names = document.createElement('p');
        names.className="text-center py-2 blockquote ";
        icons = $('<img class="rounded-corner img-fluid" id="villagerimages">');
        birthdate = $('<p class=" position-relative top-0 left-0 m-1">');
        villagerDiv = $('<div class="col-md-3 bg-white p-5 mx-auto my-5 rounded-corner align-items-center">');
        names.appendChild(document.createTextNode(result['name']['name-USen']));
        birthdate.append(document.createTextNode(result.birthday));
        icons.attr("src", result.icon_uri);

        
        
        //if statement to empty div if there is content
        if (!$.trim($('#villagers').html()).length) {
         console.log("empty");
         $('#villagers').append(villagerDiv);
         villagerDiv.append(birthdate);
         villagerDiv.append(icons);
         villagerDiv.append(names);
         
        }else{
         console.log("full");
         emptyFunction();
         $('#villagers').append(villagerDiv);
         villagerDiv.append(birthdate);
         villagerDiv.append(icons);
         villagerDiv.append(names);
         
        }
        
      }
      executed = false;
      console.log(executed);
    }
    });
});