import React from "react";

function BrandText({ text }) {
  return <span className="text-red-500">FlockGuard{text}</span>;
}

function About() {
  return (
    <div className="flex flex-col flex-1 my-8 max-w-2xl mx-auto px-2 gap-6">
      <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
        🐖🐓 <BrandText /> - Smarter Farms. Safer Flocks.
      </h1>
      <section>
        <h2 className="text-lg font-semibold mb-1">Our Mission</h2>
        <p className="text-gray-700">
          <BrandText /> empowers pig & poultry farmers with innovative digital
          tools to prevent devastating disease outbreaks, boost productivity,
          and secure livelihoods. Our platform blends AI, real-time alerts, and
          intutive management for a healthier, more resilient livestock sector
          in India.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-1">The Challenge</h2>
        <p className="text-gray-700">
          Pig & poultry farms in India face severe threats from diseases like{" "}
          <span>Avian Influenza (Bird Flu)</span> and{" "}
          <span>African Swine Fever (ASF)</span>, causing mass culling, huge
          economic losses, and food insecurity.
        </p>
        <ul className="list-disc ml-6 mt-2 text-base text-gray-700">
          <li>₹25,000 crore annual from poultry disease (HPAI).</li>
          <li>
            ₹982 crore African Swine Fever losses (2021-25) across NE states.
          </li>
          <li>69,000+ pigs dead, 52,000+ culled in 2025.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-1">Our Solution</h2>
        <ul className="ml-4 mt-1 list-disc text-base text-gray-700">
          <li><b>User Roles: </b>Farmers, vets, pharmacies, admins for tailored experiences.</li>
          <li><b>Farm Profiles: </b>Set up farms, track livestock health and biosecurity.</li>
          <li><b>AI Disease Detection: </b> Farmers upload images; ML models predict disease instantly.</li>
          <li><b>Digital Health Reports: </b>Store health status, vet notes, and prescriptions.</li>
          <li><b>Alerts & Notifications: </b>Get outbreak alerts and important updates by region.</li>
          <li><b>Training Hub: </b>Biosecurity courses and tips in multiple languages - mobile-first.</li>
          <li><b>Marketplace Link: </b>Connect directly with vets/pharmacies for fast, reliable, support.</li>
        </ul>
      </section>
    </div>
  );
}

export default About;
