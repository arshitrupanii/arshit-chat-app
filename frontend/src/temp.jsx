import React, { useState } from "react";
import axios from "axios";

const ProfileImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Show a preview
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage); // Add the selected file
    formData.append("upload_preset", "your_upload_preset"); // Replace with your upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dpxxqzq6y/image/upload", // Replace with your Cloudinary URL
        formData
      );
      setUploadedImageUrl(response.data.secure_url); // Save the uploaded image URL
      alert("Image uploaded successfully!");
    } catch (error) {
      console.log("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  return (
    <div>
      <h2>Upload Profile Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: "200px" }} />}
      <button onClick={handleImageUpload}>Upload to Cloudinary</button>

      {uploadedImageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={uploadedImageUrl} alt="Uploaded" style={{ width: "200px" }} />
        </div>
      )}
    </div>
  );
};

export default ProfileImageUpload;
