"use client";

import ImageGallery from "@/components/ImageGallery";
import BasicSortButtons from "@/components/BasicSortButtons";

export default function Home() {
  return (
    <main className="space-y-10 mt-5">
      {/* <div className="flex w-full justify-center ">
        <input
          type="text"
          placeholder="Search your device"
          className="border-b-2 p-2 container max-w-4xl border-b-black w-full focus:outline-none"
        />
      </div> */}
      <BasicSortButtons selection={""} />

      {/* Photo Gallery */}
      <ImageGallery options={""} />
    </main>
  );
}
