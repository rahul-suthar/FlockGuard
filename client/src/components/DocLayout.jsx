function DocLayout({ title, subtitle, children }) {
  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-16 font-mono">
      <header className="mb-16 border-b border-slate-200 pb-8">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm font-bold text-red-500 uppercase tracking-widest">
            {`// `} {subtitle}
          </p>
        )}
      </header>

      <div className="space-y-12 text-slate-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default DocLayout;
