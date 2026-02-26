const AwardsSection = () => {
  return (
    <section id="wyroznienia" className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-secondary/45 bg-secondary/15 p-4 text-center shadow-xl sm:p-6">
            <img
              src="/images/orly-edukacji-2025.png"
              alt="Orły Edukacji 2025"
              className="mx-auto h-auto w-full max-w-[280px] rounded-2xl object-contain"
              loading="lazy"
            />
          </div>

          <div className="rounded-2xl border border-secondary/45 bg-secondary/15 p-4 text-center shadow-xl sm:p-6">
            <img
              src="/images/orly-edukacji-2026.png"
              alt="Orły Edukacji 2026"
              className="mx-auto h-auto w-full max-w-[280px] rounded-2xl object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
