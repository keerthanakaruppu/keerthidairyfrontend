// typscript function
let typing = new Typed(".text", {
    strings: ["Kabaddi Player...", "Kho-Kho Player...", "Dancer...","Athelete..."],
    typespeed: 1000,
    backspeed: 1000,
    backDelay: 1000,
    loop: true,
  });

// 🔐 Check authentication
async function checkAuth() {
  try {
    const res = await fetch(`${API_URL}/check-auth`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();

    if (!data.loggedIn) {
      window.location.href = "index.html";
    }
  } catch (err) {
    console.error("Auth check failed:", err);
    window.location.href = "index.html";
  }
}

// Check auth when page loads
checkAuth();


//logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  document.cookie = "token=; Max-Age=0; path=/; secure; sameSite=None;";
  window.location.href = "index.html";
});

