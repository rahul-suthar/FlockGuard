import { useState } from "react";

const navs = [
  { name: "Home", route: "#" },
  { name: "About", route: "#" },
  { name: "Contact us", route: "#" },
];

function NavBar() {
  const [isOpen, setisOpen] = useState(false);
  return (
    <nav className="flex items-center justify-between h-14 border-b-1 border-gray-400 px-3 sm:px-0">
      <div className="flex items-center gap-2 cursor-default">
        <span className="text-lg font-extrabold sm:font-semibold text-red-400">
          FlockGuard
        </span>
      </div>
      <ul className="hidden sm:flex items-center gap-2">
        {navs &&
          navs.map((nav) => (
            <li className="px-2 py-1 transition hover:scale-105 hover:underline underline-offset-2 decoration-red-400 decoration-1 rounded cursor-pointer">
              <a href={nav.route}>{nav.name}</a>
            </li>
          ))}
      </ul>
      <div className="relative">
        <div
          className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
          onClick={() => setisOpen(!isOpen)}
        >
          <img
            src="images/avatar.jpg"
            alt="avatar_img"
            className="w-full h-full object-cover"
          />
        </div>

        {isOpen && (
          <ul className="absolute border-2 right-0 mt-2 w-42 h-50 flex flex-col gap-4 bg-white shadow-lg rounded-lg px-2 py-2 sm:hidden z-20">
            <li className="px-2 py-1 transition hover:bg-gray-100 rounded cursor-pointer border-b-2 active:border-2">
              <a href='#'>Profile</a>
            </li>
            {navs &&
              navs.map((nav) => (
                <li className="px-2 py-1 transition hover:bg-gray-100 rounded cursor-pointer active:border-b-2">
                  <a href={nav.route}>{nav.name}</a>
                </li>
              ))}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
