import DocLayout from "../components/DocLayout";

function SectionLayout({ title, children }) {
  return (
    <section className="space-y-4 pl-6">
      <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}

function About() {
  return (
    <DocLayout title="About Project" subtitle="Smarter Farms. Safer Flocks.">
      <SectionLayout title="01. Our Mission">
        <p>
          <span className="text-red-500 font-bold">FlockGuard</span> empowers
          pig & poultry farmers with innovative digital tools to prevent
          devastating disease outbreaks, boost productivity, and secure
          livelihoods. Our platform blends AI, real-time alerts, and intutive
          management for a healthier, more resilient livestock sector.
        </p>
      </SectionLayout>

      <SectionLayout title="02. Past Statistics & Impact">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 shadow-sm border-l-4 rounded-md border-red-500">
            <span className="block text-2xl font-black">₹25K Cr</span>
            <span className="text-[10px] uppercase font-bold text-slate-500">
              Annual Poultry Loss
            </span>
          </div>
          <div className="p-4 bg-slate-50 shadow-sm border-l-4 rounded-md border-red-500">
            <span className="block text-2xl font-black">69,000+</span>
            <span className="text-[10px] uppercase font-bold text-slate-500">
              Livestock Deaths (2025)
            </span>
          </div>
        </div>
      </SectionLayout>

      <SectionLayout title="03. Our Technical Solution">
        <div className="grid grid-cols-1 gap-2">
          {[
            {
              label: "AI Disease Detection",
              desc: "ML models predict disease instanlty from image uploads.",
            },
            {
              label: "Digital Health Reports",
              desc: "Cloud storage for health status and vet prescriptions.",
            },
            {
              label: "Regional Alerts",
              desc: "Real-time outbreak notifications based on farm location.",
            },
            {
              label: "Training Hub",
              desc: "Mobile-first biosecurity courses in multiple languages.",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <span className="text-red-500 font-bold">[{i + 1}]</span>
              <p className="text-sm">
                <span className="font-bold text-slate-900">{item.label}: </span>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionLayout>
    </DocLayout>
  );
}

export default About;
