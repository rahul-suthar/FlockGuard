import { useState } from "react";
import { Link } from "react-router-dom";

const navs = [
  { name: "Home", route: "/" },
  { name: "About", route: "/about" },
  { name: "Contact us", route: "/contact-us" },
];

function NavBar() {
  const [isOpen, setisOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between h-16 bg-white/10 backdrop-blur-xs border-b border-gray-200 py-2 px-6 lg:px-12">
      <div className="flex items-center gap-2">
        <span className="text-lg sm:text-xl font-black tracking-tighter sm:tracking-[-0.05em] text-red-500">
          FlockGuard
        </span>
      </div>
      <ul className="hidden sm:flex items-center gap-6">
        {navs.map((nav, index) => (
          <Link
            key={index}
            to={nav.route}
            className="text-sm font-bold text-slate-600 hover:text-red-500 transition-colors duration-150 py-1 px-2 tracking-wider uppercase cursor-pointer"
          >
            {nav.name}
          </Link>
        ))}
      </ul>

      <div className="relative sm:hidden" onClick={() => setisOpen(!isOpen)}>
        <div className="w-16 h-8 rounded-full ring-2 ring-red-200 overflow-hidden cursor-pointer">
          <img
            src="images/avatar.jpg"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        {isOpen && (
          <ul className="absolute -right-6 mt-4 w-dvw bg-white shadow-2xl rounded-2xl p-2 border border-slate-100 animate-in fade-in slide-in-from-top-2">
            {navs.map((nav, index) => (
              <Link
                key={index}
                to={nav.route}
                className="block text-xs px-4 py-3 font-bold tracking-wide text-slate-700 active:bg-red-50 rounded-xl"
              >
                {nav.name}
              </Link>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
