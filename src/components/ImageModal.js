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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div ref={modalRef} className="bg-white p-4 rounded-lg max-w-lg">
        <button
          className="absolute top-0 right-0 m-3 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </button>
        <div className="relative w-full h-0 pb-1/1">
          <Image src={image.imageUrl} alt={`Image`} width={500} height={500} />
        </div>
        <div className="mt-4">
          <p>Camera Make: {image.metadata.cameraMake || "Unknown"}</p>
          <p>Camera Model: {image.metadata.cameraModel || "Unknown"}</p>
          {/* Include other metadata here */}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
