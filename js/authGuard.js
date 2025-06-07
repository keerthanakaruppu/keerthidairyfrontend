// authGuard.js
(async function checkAuth() {
    try {
      const res = await fetch("https://keerthidairybackend.onrender.com/check-auth", {
        method: "GET",
        credentials: "include", // include cookies
      });
  
      const data = await res.json();
      if (!data.loggedIn) {
        window.location.href = "index.html";
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      window.location.href = "index.html";
    }
  })();
  