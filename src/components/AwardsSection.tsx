import { useState } from "react";

const AwardsSection = () => {
  const imageCandidates = [
    "/images/wyroznienie-glowne.png",
    "/images/wyroznienie-glowne.jpg",
    "/images/wyroznienie-glowne.jpeg",
    "/images/wyroznienie-glowne.webp",
  ];
  const [imageIndex, setImageIndex] = useState(0);
  const [imageUnavailable, setImageUnavailable] = useState(false);

  return (
    <section id="wyroznienia" className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-6xl">
        {!imageUnavailable ? (
          <img
            src={imageCandidates[imageIndex]}
            alt="Wyróżnienie"
            className="mx-auto h-auto w-full max-w-5xl rounded-2xl object-contain"
            loading="lazy"
            onError={() => {
              const nextIndex = imageIndex + 1;
              if (nextIndex < imageCandidates.length) {
                setImageIndex(nextIndex);
                return;
              }
              setImageUnavailable(true);
            }}
          />
        ) : (
          <div className="mx-auto max-w-5xl rounded-2xl border border-secondary/45 bg-secondary/10 px-6 py-12 text-center">
            <p className="text-sm text-primary-foreground/80">
              Nie znaleziono grafiki wyróżnienia. Dodaj plik: /public/images/wyroznienie-glowne.(png|jpg|jpeg|webp)
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AwardsSection;
