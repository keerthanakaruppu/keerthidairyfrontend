// typscript function
let typing = new Typed(".text", {
    strings: ["Kabaddi Player...", "Kho-Kho Player...", "Dancer...","Athelete..."],
    typespeed: 1000,
    backspeed: 1000,
    backDelay: 1000,
    loop: true,
  });

const API_URL = "https://keerthidairybackend.onrender.com";

//logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("authToken");
  window.location.href = "index.html";
});

