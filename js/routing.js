$(document).ready(function(){
  $('a').on('click', function(e){  
     e.preventDefault( );
     var pageRef = $(this).attr('href');
   
     callPage(pageRef);
  });
});

function callPage(pageRefInput){
  $.ajax
}