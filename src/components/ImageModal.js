import React, { useRef, useEffect } from "react";
import Image from "next/image";

const ImageModal = ({ image, onClose }) => {
  const modalRef = useRef(null);

  // Close the modal when clicking outside of the modal content
  const handleBackgroundClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleBackgroundClick);
    return () => {
      document.removeEventListener("mousedown", handleBackgroundClick);
    };
  }, []);

  if (!image) {
    return null; // Return null if no image is provided
  }

  return (
    <div className="fixed w-full h-full inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div ref={modalRef} className="bg-white p-3 rounded-lg max-w-1/2">
        <div className="flex">
          <div className="relative max-w-1/2 w-[50vw] h-[80vh]">
            <Image
              src={image.imageUrl}
              alt={`Image`}
              fill
              className="object-contain"
            />
          </div>
          <div className="text-xl">
            <p>Camera Make: {image.metadata.cameraMake || "Unknown"}</p>
            <p>Camera Model: {image.metadata.cameraModel || "Unknown"}</p>
            {/* Include other metadata here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
