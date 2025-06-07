// 🔐 Check authentication
(async () => {
    try {
      const res = await fetch("https://keerthidairybackend.onrender.com/check-auth", {
        method: "GET",
        credentials: "include",
      });
  
      const data = await res.json();
  
      if (!res.ok || !data.success) {
        throw new Error("Unauthorized");
      }
    } catch {
      window.location.href = "index.html";
    }
  })();
  
  
  