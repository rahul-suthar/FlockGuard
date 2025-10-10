import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const previews = [
  { id: 1, src: "login.jpg", alt: "Login_preview" },
  { id: 2, src: "home.jpg", alt: "Home_preview" },
  { id: 3, src: "profile.jpg", alt: "Profile_preview" },
  { id: 4, src: "editprofile.jpg", alt: "Update_preview" },
];

function Onboarding() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <section className="flex flex-col gap-8 lg:flex-row items-center justify-between py-8 px-4 text-center">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-red-400">
            FlockGuard
          </h1>
          <p className="text-lg mb-4 max-w-xl">
            Protect and manage pig & poultry farms with innovative AI-powered
            technology.
          </p>
        </div>
        <div className="flex gap-6">
          <button className="bg-red-400 animate-bounce text-white px-4 py-2 rounded hover:bg-red-500 hover:scale-105 cursor-pointer transition">
            <a href="release/FlockGuard-release-armeabi-v7a.apk">
              Download App
            </a>
          </button>
          <button className="bg-red-50 text-amber-700 px-4 py-2 rounded hover:bg-red-200 cursor-pointer border-2 transition">
            GitHub 🚀
          </button>
        </div>
      </section>

      <div className="max-w-120 sm:max-w-180 lg:max-w-240 grid grid-cols-2 p-4 sm:grid-cols-4 gap-6 sm:gap-8 m-auto mb-8">
        {previews &&
          previews.map((tab, index) => (
            <div className="aspect-9/20 p-1 flex flex-col items-center bg-red-200/80 rounded-md sm:hover:-translate-y-4 hover:scale-105 transition cursor-pointer overflow-hidden">
              <img
                className="w-full h-full object-contain"
                src={`images/${tab.src}`}
                alt={tab.alt}
              />
              <span >{tab.alt}</span>
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
}

export default Onboarding;
