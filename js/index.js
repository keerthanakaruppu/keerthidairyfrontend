document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://keerthidairybackend.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      location.href = "home.html";
    } else {
      alert("Invalid email or password");
    }
  } catch (err) {
    alert("Error logging in");
  }
});
