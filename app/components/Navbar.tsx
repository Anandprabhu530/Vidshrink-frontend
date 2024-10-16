"use client";

const Navbar = () => {
  const handleClick = () => {};
  return (
    <div className="p-4 shadow-neutral-200 shadow-xl w-full">
      <div className="flex items-center justify-between font-sans px-8">
        <div className="tracking-wide font-bold text-xl">VIDS SHRINK</div>
        <div className="flex gap-8 items-center">
          <button
            className="px-6 cursor-pointer py-2 bg-black text-white rounded-md text-md font-bold"
            onClick={handleClick}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
