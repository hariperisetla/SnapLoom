"use client";

import { useAuth } from "@/context/AuthContext";

export default function Photo({ params }) {
  const { imageData } = useAuth();

  // Find the image data that matches the parameter
  const selectedImage = imageData.find((image) => image.id === params.photo);

  // if (!selectedImage) {
  //   // If the selected image is not found, you can display an error message or redirect
  //   return <div>Image not found</div>;
  // }

  return (
    <main>
      <div className="container flex justify-center">
        <img
          src={selectedImage && selectedImage.imageUrl}
          alt={`Image ${params.photo}`}
        />
      </div>
    </main>
  );
}
