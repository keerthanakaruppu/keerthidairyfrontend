// authGuard.js
(function checkAuth() {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      window.location.href = "index.html"; // Redirect to login
      return;
    }
  
    // Optional: verify token with server
    fetch("https://keerthidairybackend.onrender.com/verify-token", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.removeItem("authToken");
          window.location.href = "index.html";
        }
      })
      .catch(() => {
        localStorage.removeItem("authToken");
        window.location.href = "index.html";
      });
  })();



 
  
  