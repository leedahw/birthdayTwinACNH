$(document).ready( ()=>{
  console.log("accordion hello");

  let allPanels = $('.accordion > div > dd').hide();
  

  allPanels.first().show();

  $('.accordion > div > dt > a').click((e)=>{
      //allPanels.slideUp();
      $(e.target).parent().next().slideToggle()
      siblings('.hide').slideUp();

      return false;
  });

});
