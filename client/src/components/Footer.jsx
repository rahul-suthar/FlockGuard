import React from "react";

function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center bg-red-50 py-2 mt-auto border-t border-red-400">
      <p className="text-xs">© {new Date().getFullYear()} FlockGuard. All rights reserved.</p>
      <div className="flex gap-2 mt-1">
        <a href="/privacy" className="text-xs hover:underline">Privacy</a>
        <a href="/terms" className="text-xs hover:underline">Terms</a>
      </div>
    </footer>
  );
}

export default Footer;
