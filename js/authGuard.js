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
  
  