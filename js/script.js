// typscript function
let typing = new Typed(".text", {
    strings: ["Kabaddi Player...", "Kho-Kho Player...", "Dancer...","Athelete..."],
    typespeed: 900,
    backspeed: 400,
    backDelay: 1000,
    loop: true,
  });

  
  document.getElementById("galleryLink").addEventListener("click", async (e) => {
    e.preventDefault();
  
    const sendRes = await fetch("https://keerthidairybackend.onrender.com/send-otp", {
      method: "POST",
      headers: { "x-api-key": "your-api-key" }
    });
  
    if (!sendRes.ok) {
      return alert("Failed to send OTP. Try again later.");
    }
  
    const userOTP = prompt("Enter the 6-digit OTP sent to your email:");
  
    const verifyRes = await fetch("https://keerthidairybackend.onrender.com/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "your-api-key"
      },
      body: JSON.stringify({ otp: userOTP })
    });
  
    const result = await verifyRes.json();
    if (result.success) {
      window.location.href = "gallery.html";
    } else {
      alert(result.error || "Invalid OTP");
    }
  });

