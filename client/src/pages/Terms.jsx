import React from "react";
import DocLayout from "../components/DocLayout";

function Terms() {
  return (
    <DocLayout
      title="Terms of Service"
      subtitle="Standard Operating Procedures"
    >
      <section className="space-y-4">
        <h2 className="text-xl font-black text-slate-900 uppercase">
          01. Acceptance of Terms
        </h2>
        <p>
          By downloading or using the FlockGuard APK, you agree to follow the
          guidelines set forth in this document.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-red-500 uppercase">02. Medical Disclaimer</h2>
        <div className="border border-slate-200 p-6 rounded-2xl bg-slate-50">
          <p className="text-sm italic">
            "FlockGuard is an AI-powered tool. It is NOT a substitute
            for professional veterinary diagnosis. Always consult a certified
            veterinarian before making major health decisions for your
            livestock."
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-slate-900 uppercase">03. Open Source Usage</h2>
        <p>This project is open-source. You may contribute to or fork the repository under the terms of the project's license (refer to GitHub for license specifics).</p>
      </section>
    </DocLayout>
  );
}

export default Terms;
