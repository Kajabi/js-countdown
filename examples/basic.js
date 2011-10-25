window.onload = function() {
  var container = document.getElementById("countdown-container");
  var current = new Date();
  var future = new Date(current.getTime() + 1000 * 60 * 60 * 24 * 2);
  var counter = new CountDown(future, {
    tick: function(time) {
      var string = time.totalDays() + " days, ";
      string += time.hours() + " hours, ";
      string += time.minutes() + " minutes, ";
      string += time.seconds() + " seconds";

      container.innerHTML = string;
    }
  });
};
