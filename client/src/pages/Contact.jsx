import DocLayout from "../components/DocLayout";

function Contact() {
  return (
    <DocLayout title="Contact" subtitle="Support & Contribution">
      <section className="space-y-6">
        <p className="max-w-xl">
          Have feedback, need support, or want to contribute to the future of
          AI-driven livestock management? Reach out to our team.
        </p>
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-1 right-0 opacity-10">
            <span className="text-6xl font-black text-white">GIT</span>
          </div>

          <div className="relative z-10 space-y-4">
            <h3 className="text-red-400 font-black uppercase tracking-widest text-[10px]">
              {`//`} Source Control
            </h3>
            <p className="text-white font-bold text-lg">
              GitHub Issues & Development
            </p>
            <a
              href="https://github.com/rahul-suthar/flockguard"
              target="_blank"
              className="inline-block bg-white/10 text-red-300 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/20 transition-all break-all"
            >
              github.com/rahul-suthar/flockguard
            </a>
          </div>
        </div>
      </section>
    </DocLayout>
  );
}

export default Contact;
