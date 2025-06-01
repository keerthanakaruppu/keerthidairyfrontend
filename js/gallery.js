const API_URL = "https://keerthidairybackend.onrender.com";

// DOM Elements
const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const modal = document.getElementById("uploadModal");
const openBtn = document.getElementById("uploadImageButton");
const closeBtn = document.querySelector(".close-btn");
const container = document.getElementById("mainbox");
const loader = document.getElementById("loader");


// Modal open/close logic
openBtn.onclick = () => (modal.style.display = "block");
closeBtn.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

//upload image
uploadBtn.onclick = async () => {
  const files = fileInput.files;
  if (!files.length) return alert("Select at least one image!");

  const formData = new FormData();
  for (const file of files) {
    formData.append("images", file); // Use "images" to match backend field name
  }

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
  // Show loader and clear content
  loader.style.display = "block";
  container.innerHTML = "";

  try {
    const res = await fetch(`${API_URL}/images`);
    const images = await res.json();

    // Hide loader
    loader.style.display = "none";

    // Populate images
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
    loader.style.display = "none";
    console.error("Error loading images:", err);
    container.innerHTML = "<p>Failed to load images.</p>";
  }
}
loadImages();

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-icon")) {
    const key = e.target.getAttribute("data-key");
    const public_id = e.target.getAttribute("data-public-id");
    deleteImage(key, public_id);
  }
});

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

