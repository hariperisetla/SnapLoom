import Link from "next/link";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { HiOutlineCamera } from "react-icons/hi";

export default function BasicSortButtons({ selection }) {
  function handlePhones() {}

  function handleCameras() {}

  return (
    <div className="text-xl w-full flex gap-10 items-center justify-center">
      <Link
        href={"/phones"}
        onClick={handlePhones}
        className={`${
          selection === "phones" ? "bg-black text-white" : ""
        } flex flex-col items-center border p-3 border-black`}
      >
        <IoPhonePortraitOutline size={30} /> Phones
      </Link>
      <Link
        href={"/cameras"}
        onClick={handleCameras}
        className={`${
          selection === "cameras" ? "bg-black text-white" : ""
        } flex flex-col items-center border p-3 border-black`}
      >
        <HiOutlineCamera size={30} />
        Cameras
      </Link>
    </div>
  );
}
