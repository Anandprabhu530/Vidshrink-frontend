import Navbar from "./components/Navbar";
import UploadVideo from "./components/UploadVideo";

export default function Home() {
  return (
    <div className="h-screen border-2 border-red-500 font-sans">
      <Navbar />
      <div className="text-xl items-center flex-col justify-center font-bold text-black flex border-2 border-white pt-20">
        <div className="text-5xl font-extrabold">Shrink Your Video</div>
        <div className="pt-6 font-medium text-neutral-600">
          Try our video reducer online for free
        </div>
      </div>
      <UploadVideo />
    </div>
  );
}
