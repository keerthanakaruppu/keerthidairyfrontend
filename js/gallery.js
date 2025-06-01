const API_URL = "https://keerthidairybackend.onrender.com";

// DOM Elements
const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const modal = document.getElementById("uploadModal");
const openBtn = document.getElementById("uploadImageButton");
const closeBtn = document.querySelector(".close-btn");

// Modal open/close logic
openBtn.onclick = () => (modal.style.display = "block");
closeBtn.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

uploadBtn.onclick = async () => {
  const file = fileInput.files[0];
  if (!file) return alert("Select an image!");

  const formData = new FormData();
  formData.append("image", file);
  try {
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Upload failed");
    }
    alert("Uploaded!");
    modal.style.display = "none";
    fileInput.value = "";
    loadImages();
  } catch (err) {
    console.error("Upload Error:", err);
    alert("Upload failed: " + err.message);
  }
};



// Load and display images
async function loadImages() {
  try {
    const res = await fetch(`${API_URL}/images`);
    const images = await res.json();

    const container = document.getElementById("mainbox");
    container.innerHTML = "";

    images.forEach((img) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML =`
    <div class="tools">
      <div class="circle"><span class="red box"></span></div>
      <div class="circle"><span class="yellow box"></span></div>
      <div class="circle"><span class="green box"></span></div>
      <span class="delete-icon" onclick="deleteImage('${img.key}', '${img.public_id}')">&times;</span>
    </div>
    <div class="card__content">
      <img src="${img.url}" class="img img-responsive">
    </div>
  `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading images:", err);
  }
}
loadImages();



// Delete image handler
async function deleteImage(key, public_id) {
  if (!confirm("Are you sure you want to delete this image?")) return;
  try {
    const res = await fetch(`${API_URL}/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
  }
}

