"use client";

import { useEffect, useState } from "react";
import {
  onStatechangedAuth,
  Signinwithgoogle,
  signOut,
} from "../libs/firebase";
import { User } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const handleclick = async () => {
    await Signinwithgoogle();
  };

  useEffect(() => {
    const Unsubscribe = onStatechangedAuth((user) => {
      setUser(user);
    });

    return () => Unsubscribe();
  });

  return (
    <div className="p-4 shadow-neutral-200 shadow-xl w-full">
      <div className="flex items-center justify-between font-sans px-8">
        <div className="tracking-wide font-bold text-xl">VIDS SHRINK</div>
        {user ? (
          <button
            onClick={signOut}
            className="px-6 cursor-pointer py-2 bg-black text-white rounded-md text-md font-bold "
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={handleclick}
            className="px-6 cursor-pointer py-2 bg-black text-white rounded-md text-md font-bold "
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
