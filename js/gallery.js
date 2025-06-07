const API_URL = "https://keerthidairybackend.onrender.com";

// DOM Elements
const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const modal = document.getElementById("uploadModal");
const openBtn = document.getElementById("uploadImageButton");
const closeBtn = document.querySelector(".close-btn");
const container = document.getElementById("mainbox");
const loader = document.getElementById("loader");

// Modal open/close
openBtn.onclick = () => (modal.style.display = "block");
closeBtn.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

// Upload image(s)
uploadBtn.onclick = async () => {
  const files = fileInput.files;
  if (!files.length) return alert("Select at least one image!");

  const formData = new FormData();
  for (const file of files) {
    formData.append("images", file); // match backend field
  }

  try {
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Upload failed");
    }

    alert("Uploaded!");
    modal.style.display = "none";
    fileInput.value = "";
    loadImages();
  } catch (err) {
    console.error("Upload Error:", err);
    alert("Upload failed: " + err.message);
    window.location.href = "index.html";
  }
};

// Load and display images
async function loadImages() {
  loader.style.display = "block";
  container.innerHTML = "";

  try {
    const res = await fetch(`${API_URL}/images`, {
      method: "GET",
      credentials: "include",
    });

    const images = await res.json();
    loader.style.display = "none";

    if (!Array.isArray(images)) {
      throw new Error("Unexpected response or unauthorized");
    }

    images.forEach((img) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <div class="tools">
          <div class="circle"><span class="red box"></span></div>
          <div class="circle"><span class="yellow box"></span></div>
          <div class="circle"><span class="green box"></span></div>
          <span class="delete-icon" data-key="${img.key}" data-public-id="${img.public_id}">&times;</span>
        </div>
        <div class="card__content">
          <img src="${img.url}" class="img img-responsive">
        </div>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading images:", err);
    loader.style.display = "none";
    container.innerHTML = "<p>Failed to load images.</p>";
    window.location.href = "index.html";
  }
}
loadImages();

// Handle delete click
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-icon")) {
    const key = e.target.getAttribute("data-key");
    const public_id = e.target.getAttribute("data-public-id");
    deleteImage(key, public_id);
  }
});

// Delete image
async function deleteImage(key, public_id) {
  if (!confirm("Are you sure you want to delete this image?")) return;

  try {
    const res = await fetch(`${API_URL}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ key, public_id }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Image deleted!");
      loadImages();
    } else {
      alert("Failed to delete image: " + data.error);
    }
  } catch (err) {
    console.error("Error deleting image:", err);
    alert("Something went wrong.");
    window.location.href = "index.html";
  }
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  document.cookie = "token=; Max-Age=0; path=/; secure; sameSite=None;";
  window.location.href = "index.html";
});
