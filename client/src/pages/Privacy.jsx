import DocLayout from "../components/DocLayout";

function Privacy() {
  return (
    <DocLayout title="Privacy Policy" subtitle="Last updated: Jan 2026">
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 uppercase">
          01. Information Collection
        </h2>
        <p>
          FlockGuard collects image data provided by users for AI-driven disease
          detection. This data is processed to improve model accuracy and
          provide real-time feedback.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 uppercase">
          02. Data Usage
        </h2>
        <ul className="space-y-3 list-inside">
          <li className="flex gap-2">
            <span className="text-red-500">{`>`}</span> AI Analysis for disease
            prediction.
          </li>
          <li className="flex gap-2">
            <span className="text-red-500">{`>`}</span> Regional outbreak
            alerting.
          </li>
          <li className="flex gap-2">
            <span className="text-red-500">{`>`}</span> App performance and
            stability analytics.
          </li>
        </ul>
      </section>

      <section className="bg-red-50 p-6 rounded-md border-l-4 border-red-500">
        <p className="text-sm text-red-900 font-bold leading-relaxed">
          FlockGuard does not sell your personal data to third parties. We
          prioritize the biosecurity of your farm records.
        </p>
      </section>
    </DocLayout>
  );
}

export default Privacy;
