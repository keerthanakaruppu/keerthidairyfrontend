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

window.deleteImage = async (key, public_id) => {
  try {
    const res = await fetch(`${API_URL}/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, public_id }),
    });

    const result = await res.json();

    if (result.success) {
      loadImages();
    } else {
      alert("Failed to delete image");
      console.error(result.error);
    }
  } catch (err) {
    console.error("Delete error:", err);
  }
};
