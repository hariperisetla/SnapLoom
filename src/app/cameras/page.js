"use client";

import BasicSortButtons from "@/components/BasicSortButtons";
import ImageGallery from "@/components/ImageGallery";

export default function Cameras() {
  return (
    <main className="space-y-10">
      <BasicSortButtons selection={"cameras"} />

      <ImageGallery options={"cameras"} />
    </main>
  );
}
