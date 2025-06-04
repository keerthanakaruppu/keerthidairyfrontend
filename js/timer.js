const API_URL = "https://keerthidairybackend.onrender.com";

// check-auth
fetch(`${API_URL}/check-auth`, {
    credentials: "include"
  })
  .then(res => res.json())
  .then(data => {
    if (!data.loggedIn) {
      window.location.href = "index.html"; // redirect to login
    } else {
      loadImages(); // only if logged in
    }
  });


function startBirthdayCountdown(birthMonth, birthDay, birthHour, birthMinute) {
  function updateCountdown() {
      const now = new Date();
      let nextBirthday = new Date(
          now.getFullYear(),
          birthMonth - 1, // Months are zero-indexed in JavaScript
          birthDay,
          birthHour,
          birthMinute
      );

      // If the birthday this year has passed, move it to the next year
      if (now > nextBirthday) {
          nextBirthday.setFullYear(now.getFullYear() + 1);
      }

      const diff = nextBirthday - now; // Difference in milliseconds
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      document.getElementById("days").innerHTML= days<10?'0'+days:days;
      document.getElementById("hours").innerHTML= hours<10?'0'+hours:hours;
      document.getElementById("minutes").innerHTML=minutes<10?'0'+minutes:minutes;
      document.getElementById("seconds").innerHTML=seconds<10?'0'+seconds:seconds;

  }

  // Update the countdown every second
  setInterval(updateCountdown, 1000);
  updateCountdown(); // Initial call to display immediately
}
// Replace with your birthday month, day, hour, and minute
startBirthdayCountdown(6, 28, 7, 0); // Example: January 08 at 10:30 AM











// //timer function
// const days=document.querySelector("#days");
// const hours=document.querySelector("#hours");
// const minutes=document.querySelector("#minutes");
// const seconds=document.querySelector("#seconds");
// // const mseconds=document.querySelector("#mseconds");

// const currentYear=new Date().getFullYear();
// const keerthiBday=new Date(`June 28 ${currentYear+1} 07:00:00`);

// function UpdateTime(){
//   const currentDate=new Date();
//   const diff=keerthiBday-currentDate;
//   const d=Math.floor(diff/1000/60/60/24);
//   const h=Math.floor((diff/1000/60/60)%24);
//   const m=Math.floor((diff/1000/60)%60);
//   const s=Math.floor((diff/1000)%60);
//   const ms=Math.floor(diff%1000);

//   days.innerHTML=d<10?"0"+d:d;
//   hours.innerHTML=h<10?"0"+h:h;
//   minutes.innerHTML=m<10?"0"+m:m;
//   seconds.innerHTML=s<10?"0"+s:s;
//   // mseconds.innerHTML=ms<10?"0"+ms:ms;
// }
// setInterval(UpdateTime,1000);