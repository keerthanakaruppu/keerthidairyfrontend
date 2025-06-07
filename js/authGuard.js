(async () => {
    try {
      const res = await fetch("https://keerthidairybackend.onrender.com/check-auth", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error();
    } catch {
      window.location.href = "index.html";
    }
  })();
  
  
  
  