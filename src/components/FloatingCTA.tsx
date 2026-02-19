import { MessageCircle } from "lucide-react";

const FloatingCTA = () => (
  <a
    href="https://wa.me/48123456789"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent shadow-lg flex items-center justify-center hover:bg-accent/90 transition-all hover:scale-110"
    aria-label="Napisz na WhatsApp"
  >
    <MessageCircle size={26} className="text-accent-foreground" />
  </a>
);

export default FloatingCTA;
