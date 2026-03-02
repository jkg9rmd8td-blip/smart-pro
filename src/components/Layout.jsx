import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Layout({ children }) {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark bg-[#0c131d]" : "bg-white"}>
      <div className="flex min-h-screen text-white dark:text-white">

        <Sidebar />

        <div className="flex-1 p-8">
          <button
            onClick={() => setDark(!dark)}
            className="mb-6 px-4 py-2 bg-primary text-black rounded-xl"
          >
            تبديل الوضع
          </button>

          {children}
        </div>
      </div>
    </div>
  );
}
