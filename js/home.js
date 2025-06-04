// typscript function
let typing = new Typed(".text", {
    strings: ["Kabaddi Player...", "Kho-Kho Player...", "Dancer...","Athelete..."],
    typespeed: 1000,
    backspeed: 1000,
    backDelay: 1000,
    loop: true,
  });

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

