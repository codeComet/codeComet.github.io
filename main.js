//shuffle position of cards

$.fn.shuffleChildren = function () {
  $.each(this.get(), function (index, el) {
    var $el = $(el);
    var $find = $el.children();

    $find.sort(function () {
      return 0.5 - Math.random();
    });

    $el.empty();
    $find.appendTo($el);
  });
};

$(".parent1").shuffleChildren();
$(".parent2").shuffleChildren();

$(document).ready(function() {
  var counter = 6;
  var attempt = document.getElementById("count");
  attempt.innerHTML = "You have <span>" + counter + "</span> lives";
  
  var seconds = 11;
  function runInt() {
    seconds -= 1;
    document.getElementById("timer").innerHTML = seconds + " s";
    if (seconds==0) {
      document.getElementById("timer").innerHTML = "START!!";
    }
  }
  var int_id = setInterval(runInt, 1000);
  
  function clearInt() {
    clearInterval(int_id);
  }
  
  setTimeout(()=>{
    clearInt();
  }, 11000)
  
  var inner = $(".inner");
  function remove(th) {
    th.remove();
  }
  
  function game() {
    //Hide the timer
    setTimeout(()=> {
      $("#timer").css("display", "none");
    },1500)
    
    inner.addClass("isFlipped");
    inner.click(function () {
      var elem = $(this); //returns inner div
      elem.toggleClass("isFlipped");
      var child = elem.find(".front").children(); //returns block class
      if (child.hasClass("matched")) {
        return;
      }
  
      child.toggleClass("selected");
      child.siblings(".selected").removeClass("selected");
  
      var selected = $("[data-type].selected"); //returns block class
      if (selected.length === 2) {
        var par1 = selected.eq(0).parent().parent(); //returns inner
        var par2 = selected.eq(1).parent().parent(); //returns inner
        var type1 = selected.eq(0).data("type");
        var type2 = selected.eq(1).data("type");
        var isMatch = type1 === type2;
  
        if (isMatch) {
          var par_len = ($(".parent1 .inner").length) - 1;
          selected.removeClass("selected").toggleClass("matched", isMatch, 2000);
          attempt.innerHTML = "You have <span>" + counter + "</span> lives";
          setTimeout(() => {
            remove(par1);
            remove(par2);
          }, 2000);
          console.log(par_len);
          if(par_len==0) {
            attempt.innerHTML = "CONGRATULATIONS!! YOU WON";
          }
        }
        else {
          var inr = selected.parents('.inner');
          setTimeout(() => {
            $.each(inr, (idx, card)=> {
              $(card).addClass("isFlipped");
            })
          }, 2000);
          
          selected.removeClass("selected");
          counter -= 1;
          if (counter == 0) {
            setTimeout(() => {
              $(".main").css("display", "none");
              $(".gameover").css("display", "block");
              attempt.innerHTML = "GAME OVER!!";
            }, 1500);
          }
          else {
            attempt.innerHTML = "You have <span>" + counter + "</span> lives";
          }
        }
      }
    })
  }
  
  setTimeout(game, 11000);
})














