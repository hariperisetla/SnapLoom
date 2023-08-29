"use client";

import React, { useState } from "react";
import EXIF from "exif-js";

import { useAuth } from "@/context/AuthContext";

const ImageUploadButton = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [cameraMake, setCameraMake] = useState(null);
  const [cameraModel, setCameraModel] = useState(null);
  const [exposureTime, setExposureTime] = useState(null);
  const [aperture, setAperture] = useState(null);

  const [software, setSoftware] = useState(null);

  const [shutterSpeed, setShutterSpeed] = useState(null);
  const [orientation, setOrientation] = useState(null);
  const [colorSpace, setColorSpace] = useState(null);
  const [focalLength, setFocalLength] = useState(null);
  const [iso, setIso] = useState(null);
  const [whiteBalance, setWhiteBalance] = useState(null);
  const [meteringMode, setMeteringMode] = useState(null);

  const { uploadImage, currentUser } = useAuth();

  const [uploading, setUploading] = useState(false);

  const handleSubmit = () => {
    if (currentUser && selectedFile) {
      setUploading(true);
      const metadata = {
        cameraMake,
        cameraModel,
        //   aperture,
        //   software,
        //   shutterSpeed,
        //   focalLength,
        //   iso,
        //   whiteBalance,
        //   meteringMode,
      };

      try {
        uploadImage(currentUser.uid, selectedFile, metadata);
        setSelectedFile(null);
        setUploading(false);
      } catch (error) {
        console.log(error);
        setUploading(false);
      }
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const image = new Image();
        image.src = event.target.result;

        image.onload = function () {
          // Load Exif data using Exif.js
          EXIF.getData(image, function () {
            const make = EXIF.getTag(this, "Make");
            const model = EXIF.getTag(this, "Model");
            const exposure = EXIF.getTag(this, "ExposureTime");
            const fNumber = EXIF.getTag(this, "FNumber");

            const software = EXIF.getTag(this, "Software");

            const shutterSpeed = EXIF.getTag(this, "ExposureTime");
            const orientation = EXIF.getTag(this, "Orientation");
            const colorSpace = EXIF.getTag(this, "ColorSpace");
            const focalLength = EXIF.getTag(this, "FocalLength");
            const iso = EXIF.getTag(this, "ISOSpeedRatings");
            const whiteBalance = EXIF.getTag(this, "WhiteBalance");
            const meteringMode = EXIF.getTag(this, "MeteringMode");

            setCameraMake(make || "Unknown");
            setCameraModel(model || "Unknown");
            setExposureTime(exposure || "Unknown");
            setAperture(fNumber || "Unknown");

            setSoftware(software || "Unknown");

            setShutterSpeed(shutterSpeed || "Unknown");
            setOrientation(orientation || "Unknown");
            setColorSpace(colorSpace || "Unknown");
            setFocalLength(focalLength || "Unknown");
            setIso(iso || "Unknown");
            setWhiteBalance(whiteBalance || "Unknown");
            setMeteringMode(meteringMode || "Unknown");
          });
        };
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setCameraMake(null);
      setCameraModel(null);
      setExposureTime(null);
      setAperture(null);

      setSoftware(null);

      setShutterSpeed(null);
      setOrientation(null);
      setColorSpace(null);
      setFocalLength(null);
      setIso(null);
      setWhiteBalance(null);
      setMeteringMode(null);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {selectedFile && (
        <div className="mt-2">
          <p>Camera Make: {String(cameraMake)}</p>
          <p>Camera Model: {String(cameraModel)}</p>
          {/* <p>
            Exposure Time:{" "}
            {exposureTime !== null
              ? formatExposureTime(exposureTime)
              : "Unknown"}
          </p> */}

          <p>Aperture: {String(aperture)}</p>
          <p>Software: {String(software)}</p>

          {/* <p>shutterSpeed: {String(shutterSpeed)}</p> */}
          <p>
            Shutter Speed:{" "}
            {shutterSpeed !== null
              ? `1/${Math.round(1 / shutterSpeed)} seconds`
              : "Unknown"}
          </p>

          {/* <p>orientation: {String(orientation)}</p> */}
          <p>colorSpace: {String(colorSpace)}</p>
          <p>
            Focal Length:{" "}
            {focalLength !== null ? `${focalLength} mm` : "Unknown"}
          </p>
          <p>iso: {String(iso)}</p>
          <p>whiteBalance: {String(whiteBalance)}</p>
          <p>meteringMode: {String(meteringMode)}</p>
        </div>
      )}

      <button
        className="bg-black p-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500"
        onClick={handleSubmit}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Submit photo"}
      </button>
    </div>
  );
};

export default ImageUploadButton;
