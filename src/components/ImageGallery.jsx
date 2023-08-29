"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import ImageModal from "@/components/ImageModal";

import { db } from "@/firebase/config";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const ImageGallery = ({ options }) => {
  const { imageData } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImageData = imageData.filter((image) => {
    const cameraMake = image.metadata.cameraMake || ""; // Make sure to adjust the field name if needed

    if (options === "phones") {
      // Check if cameraMake matches phone brands
      const phoneBrands = ["iPhone", "Xiaomi"]; // Add more phone brands as needed
      return phoneBrands.some((brand) => cameraMake.includes(brand));
    } else if (options === "cameras") {
      // Check if cameraMake matches camera brands
      const cameraBrands = ["Canon", "Sony"]; // Add more camera brands as needed
      return cameraBrands.some((brand) => cameraMake.includes(brand));
    }

    return true; // Show the image if options don't match "phones" or "camera"
  });

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  return (
    <div className="justify-center w-full flex">
      <div className="md:container">
        <div className="columns-2 md:columns-5 gap-1 justify-center items-center">
          {filteredImageData.map((image, index) => (
            <div
              key={index}
              className="relative cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <Image
                src={image.imageUrl}
                alt={`Image ${index}`}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {modalOpen && (
        <ImageModal image={selectedImage} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default ImageGallery;
