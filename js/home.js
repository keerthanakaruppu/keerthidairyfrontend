
// typscript function
let typing = new Typed(".text", {
  strings: ["Kabaddi Player...", "Kho-Kho Player...", "Dancer...","Athelete..."],
  typespeed: 1000,
  backspeed: 1000,
  backDelay: 1000,
  loop: true,
});



//logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  document.cookie = "token=; Max-Age=0; path=/; secure; sameSite=None;";
  window.location.href = "index.html";
});

