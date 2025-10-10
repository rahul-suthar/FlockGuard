import { useEffect, useState } from "react";

const previews = [
  { id: 1, src: "login.jpg", alt: "Login_preview" },
  { id: 2, src: "home.jpg", alt: "Home_preview" },
  { id: 3, src: "profile.jpg", alt: "Profile_preview" },
  { id: 4, src: "editprofile.jpg", alt: "Update_preview" },
];

function formatedAPKNames(name) {
  const parts = name.split("-");
  const version = parts[parts.length - 1];
  return `FlockGuard-${version}`;
}

function Onboarding() {
  const [isApkDrawerOpen, setIsApkDrawerOpen] = useState(false);
  const [apkUrls, setapkUrls] = useState([
    "https://github.com/rahul-suthar/FlockGuard/releases/latest",
  ]);
  useEffect(() => {
    const cachedAPKs = localStorage.getItem("latestReleaseAPKs");
    const cacheTime = localStorage.getItem("latestReleaseAPKsTime");
    const now = Date.now();

    if (cachedAPKs && cacheTime && now - cacheTime < 3600 * 1000) {
      setapkUrls(JSON.parse(cachedAPKs));
      console.log("loaded from local storage.");
      return;
    }

    fetch(
      "https://api.github.com/repos/rahul-suthar/FlockGuard/releases/latest"
    )
      .then((res) => res.json())
      .then((data) => {
        const apkAssets = data.assets.filter((asset) =>
          asset.name.endsWith(".apk")
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
    <div className="flex flex-col flex-1 mb-8">
      <section className="flex flex-col gap-8 lg:flex-row items-center justify-between py-8 px-4 text-center">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-red-400">
            FlockGuard
          </h1>
          <p className="text-lg mb-4 min-w-xl">
            Protect and manage pig & poultry farms with innovative AI-powered
            technology.
          </p>
          <p className="min-w-xl text-md">
            Suitable for both Dark🌑 & Light☀️ modes. Making it appropriate to
            your vision.
          </p>
        </div>
        <div className="flex gap-6 relative">
          <button
            onClick={() => setIsApkDrawerOpen((open) => !open)}
            className="bg-red-500/90 text-white px-4 py-2 rounded hover:bg-red-600 hover:scale-105 cursor-pointer transition"
          >
            Download App
          </button>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/rahul-suthar/flockguard"
          >
            <button className="bg-red-50 text-amber-700 px-4 py-2 rounded hover:bg-red-200 cursor-pointer outline-2 -outline-offset-2 transition">
              GitHub 🚀
            </button>
          </a>

          {isApkDrawerOpen && (
            <ul className="absolute top-full left-0 mt-2 p-2 bg-white rounded shadow-lg z-10 flex flex-col gap-2 min-w-[220px]">
              {apkUrls.length > 0 ? (
                apkUrls.map(({ name, url }, index) => (
                  <li key={index}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-left px-4 py-2 bg-red-50 rounded hover:bg-red-100"
                    >
                      {formatedAPKNames(name)}
                    </a>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No APK available</li>
              )}
            </ul>
          )}
        </div>
      </section>

      <div className="max-w-120 sm:max-w-180 lg:max-w-240 grid grid-cols-2 p-4 sm:grid-cols-4 gap-6 gap-y-8 sm:gap-8 m-auto">
        {previews &&
          previews.map((tab) => (
            <div
              key={tab.id}
              className="aspect-9/20 p-1 flex flex-col items-center bg-red-200/80 rounded-md sm:hover:-translate-y-4 hover:scale-105 transition cursor-pointer overflow-hidden"
            >
              <img
                className="w-full h-full object-contain rounded-sm"
                src={`images/${tab.src}`}
                alt={tab.alt}
              />
              <span>{tab.alt}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Onboarding;
