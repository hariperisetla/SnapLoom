"use client";

import BasicSortButtons from "@/components/BasicSortButtons";
import ImageGallery from "@/components/ImageGallery";

export default function Phones() {
  return (
    <main className="space-y-10">
      <BasicSortButtons selection={"phones"} />

      <ImageGallery options={"phones"} />
    </main>
  );
}
