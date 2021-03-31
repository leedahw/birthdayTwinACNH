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
  personalities = ["Jock","Sisterly","Normal","Cranky","Lazy","Peppy","Smug","Snooty"];

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
    console.log(villagers); 
    console.log(villagers[90]);
});

  //dynamic dom render of personality buttons
  for (i = 0 ; i < personalities.length; i++ ) {
    personality = personalities[i];
    console.log(personality);
    button = $('<button class="btn btn-sm m-1 bg-yellow rounded-corner personality" value='+personality+'>'+ personality+'</button>');

    $('#returned').append(button);
  }

    //dynamic dom render of personality buttons
    for (i = 0 ; i < species_s.length; i++ ) {
      species = species_s[i];
      console.log(species);
      button = $('<button class="btn btn-sm m-1 bg-white rounded-corner species" value='+species+'>'+ species+'</button>');
  
      $('#returned').append(button);
    }

  //filter by personality types
  $('.personality').on('click', function(){
    //check for value
    villagerPersonality = $(this).attr("value");

    //define the filter fuction based on button value
    function personalityFinder(villagers) {
      return (villagers.personality == villagerPersonality);
    }

    personalityResults = villagers.filter(personalityFinder);
    console.log(personalityResults);

  });

    //filter by species
    $('.species').on('click', function(){
      //check for value
      villagerSpecies = $(this).attr("value");
  
      //define the filter fuction based on button value
      function speciesFinder(villagers) {
        return (villagers.species == villagerSpecies);
      }
  
      speciesResults = villagers.filter(speciesFinder);
      console.log(speciesResults);

      for (let i = 0; i < speciesResults.length; i++) {
        result = speciesResults[i];

        //create dom element
        names = document.createElement('p');
        names.className="text-center py-2 blockquote ";
        icons = $('<img class="rounded-corner img-fluid" id="villagerimages">');
        villagerDiv = $('<div class="col-3 p-3 bg-white rounded-corner align-items-center">');
        names.appendChild(document.createTextNode(result['name']['name-USen']));
        icons.attr("src", result.icon_uri);
        
        //if statement to empty div if there is content
        if (!$.trim($('#villagers').html()).length) {
         console.log("empty");
         $('#villagers').append(villagerDiv);
         villagerDiv.append(icons);
         villagerDiv.append(names);
        }else{
         console.log("full");
         emptyFunction();
         $('#villagers').append(villagerDiv);
         villagerDiv.append(icons);
         villagerDiv.append(names);
        }
        
      }
      console.log(executed);
      executed = false;
    });

    // //filter by BirthMonth
    // $('.birthMonth').on('click', function(){
    //   //check for value
    //   villagerMonth = $(this).attr("value");
  
    //   //define the filter fuction based on button value
    //   function monthFinder(villagers) {
    //     return (villagers.species == villagerMonth);
    //   }
  
    //   mnthResults = villagers.filter(monthFinder);
    //   console.log(monthResults);
  
    // });




});