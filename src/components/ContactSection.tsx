import { useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultContactContent = {
  subtitle: "Kontakt",
  title: "Napisz do nas",
  description: "Masz pytania? Chętnie pomożemy dobrać odpowiednie zajęcia.",
  email: "korkizklasa.boleslawiec@gmail.com",
  phone: "+48 797 239 237",
  address: "Łokietka 8, Bolesławiec",
  brand_name: "Korki z Klasą Sandra Wilczyńska",
  brand_tagline: "Zajęcia stacjonarne i online",
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { content } = useSiteContent("home_contact");
  const contact = {
    ...defaultContactContent,
    ...(content?.content ?? {}),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="kontakt" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
            {contact.subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            {contact.title}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            {contact.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Imię i nazwisko</label>
              <input
                type="text"
                required
                maxLength={100}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Jan Kowalski"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input
                type="email"
                required
                maxLength={255}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="jan@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Telefon (opcjonalnie)</label>
              <input
                type="tel"
                maxLength={15}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="+48 123 456 789"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Wiadomość</label>
              <textarea
                required
                maxLength={1000}
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="W czym mogę pomóc?"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Send size={18} />
              Wyślij wiadomość
            </button>
            {submitted && (
              <p className="text-sm text-accent font-medium text-center animate-fade-in">
                ✓ Dziękujemy! Odpowiemy najszybciej jak to możliwe.
              </p>
            )}
          </form>

          <div className="flex flex-col justify-center gap-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-4">Dane kontaktowe</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Telefon</p>
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Adres</p>
                    <p className="text-sm text-muted-foreground">
                      {contact.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <p className="text-sm font-semibold text-foreground">
                {contact.brand_name}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {contact.brand_tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
