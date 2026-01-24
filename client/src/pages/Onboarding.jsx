import { useEffect, useState, useRef } from "react";

function formatedAPKNames(name) {
  const parts = name.split("-");
  const version = parts[parts.length - 1];
  return version;
}

function getApkBadge(name) {
  if (name.includes("v8a")) return "new phones (2014+)";
  else if (name.includes("v7a")) return "old phones";
  else if (name.includes("64")) return "emulators (64-bit)";
  else return "emulators (32-bit)";
}

function Onboarding() {
  const [apkUrls, setapkUrls] = useState([]);
  const [selectedApk, setSelectedApk] = useState(null);

  useEffect(() => {
    if (apkUrls.length > 0 && !selectedApk) {
      const defaultApk =
        apkUrls.find((a) => a.name.includes("v8a")) || apkUrls[0];
      setSelectedApk(defaultApk);
    }
  }, [apkUrls]);

  useEffect(() => {
    const cachedAPKs = localStorage.getItem("latestReleaseAPKs");
    const cacheTime = localStorage.getItem("latestReleaseAPKsTime");
    const now = Date.now();

    if (cachedAPKs && cacheTime) {
      setapkUrls(JSON.parse(cachedAPKs));
      console.log("loaded from local storage.");
      return;
    }

    fetch(
      "https://api.github.com/repos/rahul-suthar/FlockGuard/releases/latest",
    )
      .then((res) => res.json())
      .then((data) => {
        const apkAssets = data.assets.filter((asset) =>
          asset.name.endsWith(".apk"),
        );
        if (apkAssets.length > 0) {
          const apks = apkAssets.map((asset) => ({
            name: asset.name,
            url: asset.browser_download_url,
          }));
          setapkUrls(apks);

          localStorage.setItem("latestReleaseAPKs", JSON.stringify(apks));
          localStorage.setItem("latestReleaseAPKsTime", now.toString());
        }
        console.log("Apks fetched successfully");
      })
      .catch((err) => {
        console.error("Failed to fetch latest APK URLs : ", err);
      });
  }, []);

  return (
    <div className="flex flex-col flex-1 mx-auto w-full max-w-7xl px-6 py-8 sm:py-12">
      <section className="flex flex-col-reverse lg:flex-row items-center justify-around gap-10 lg:gap-24">
        <div className="w-full lg:w-1/4 flex justify-center lg:justify-start">
          <div className="relative group max-w-56 sm:max-w-64">
            <img
              className="relative w-full h-auto object-contain rounded-3xl shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-500 ease-out"
              src="images/screens.gif"
              alt="App Interface Preview"
            />
          </div>
        </div>

        <div className="w-full lg:w-fit flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-4 text-red-500 tracking-wide sm:tracking-tighter leading-none">
            FlockGuard
          </h1>
          <p className="text-xs sm:text-base lg:text-lg text-zinc-500 mb-8 sm:mb-12 max-w-[280px] sm:max-w-lg font-medium leading-relaxed sm:leading-tight tracking-tight">
            <span className="font-bold text-black">PROTECT, MANAGE</span> and{" "}
            <span className="font-bold text-black">SECURE</span> your pig &
            poultry farms with innovative technology.
          </p>

          <div className="w-full max-w-xl bg-gray-50/50 border border-gray-100 p-5 sm:p-6 rounded-3xl shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5">
              Select System Build
            </h3>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {apkUrls.map((apk, index) => {
                const isSelected = selectedApk?.name === apk.name;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedApk(apk)}
                    className={`group flex items-center justify-between gap-3 px-4 py-3 sm:p-4  border-2 rounded-2xl transition-all duration-300 text-left cursor-pointer
                        ${isSelected ? "border-red-500 bg-red-50/50 shadow-md" : "border-gray-100 bg-white hover:border-gray-300"}
                      `}
                  >
                    <div className="flex flex-col min-w-0">
                      <span
                        className={`font-black text-xs md:text-sm tracking-tight truncate transition-colors ${isSelected ? "text-red-600" : "text-gray-900"}`}
                      >
                        {getApkBadge(apk.name)}
                      </span>
                      <span className="text-[10px] md:text-xs text-gray-500 font-bold tracking-wider mt-0.5">
                        {formatedAPKNames(apk.name)}
                      </span>
                    </div>

                    <div
                      className={`shrink-0 w-4 h-4 rounded-full border-2 grid place-items-center transition-all ${isSelected ? "border-red-500" : "border-gray-200"}`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 text-xs md:text-sm">
              <a
                href={selectedApk?.url}
                className="flex-1 text-center bg-red-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-200 hover:bg-red-600 hover:-translate-y-0.5 transition-all active:scale-95 tracking-widest"
              >
                Install App
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/rahul-suthar/flockguard"
                className="flex items-center justify-center px-6 py-4 bg-white border-2 border-gray-100 text-gray-700 font-black rounded-2xl hover:border-red-500 hover:text-red-500 transition-all tracking-widest"
              >
                GitHub 🚀
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Onboarding;
