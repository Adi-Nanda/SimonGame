var sounds = {
   blue: new Audio("./sounds/blue.mp3"),
   green: new Audio("./sounds/green.mp3"),
   red: new Audio("./sounds/red.mp3"),
   wrong: new Audio("./sounds/wrong.mp3"),
   yellow: new Audio("./sounds/yellow.mp3"),
}

$(document).ready(function(){

   var lvl = 0;
   const boxes = ["red", "green", "blue", "yellow"];
   var pattern = [];
   var userPattern = [];
   $(".box").click(false);

   $(".start").on("click", function(){
      $(".start").hide();
      lvl = 0;
      pattern = [];
      setTimeout(nextPattern, 400);
   });

   function nextPattern(){
      userPattern = [];
      lvl++;
      $("h1").text("Level : " + lvl);

      randInt = Math.floor(Math.random() * boxes.length);
      pattern.push(boxes[randInt]);

      flash(pattern[pattern.length - 1]);
   }

   $(".box").on("click", function(){
      if( $(".start").is(":visible")){
         return;
      }
      playSound( $(this).attr("id") );
      userPattern.push($(this).attr("id"));
      checkAns();
   });

   function checkAns(){
      if (userPattern.length > pattern.length){
         return;
      }

      for(let i=0; i<userPattern.length; i++){
         if(userPattern[i] !== pattern[i]){
            playSound("wrong");
            $("h1").text("Game over! Please try again");
            $(".start").show();
            $(".start").text("Retry");

            $("body").addClass("bg-red");
            setTimeout( ()=>{
               $("body").removeClass("bg-red");
            }, 200);
         }
         else if(i === pattern.length-1){
            setTimeout(nextPattern, 400);
         }
      }

   }

   function flash(item_id){
      playSound(item_id);
      $("#" + item_id).addClass("glow");
      setTimeout(function(){
         $("#" + item_id).removeClass("glow");
      }, 200);
   }

   function playSound(sound){
      Object.values(sounds).forEach(item =>{
         item.pause();
         item.currentTime = 0;
      });
      if (sounds[sound]){
         sounds[sound].play();
      }
   }

});


