import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EnrollmentSection from "@/components/EnrollmentSection";
import LocationSection from "@/components/LocationSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import AwardsSection from "@/components/AwardsSection";
import PricingSection from "@/components/PricingSection";
import CoursePlatformSection from "@/components/CoursePlatformSection";
import FreeMaterialsSection from "@/components/FreeMaterialsSection";
import OpinionsSection from "@/components/OpinionsSection";
import SocialSection from "@/components/SocialSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <AwardsSection />
      <PricingSection />
      <CoursePlatformSection />
      <SocialSection />
      <OpinionsSection />
      <EnrollmentSection />
      <LocationSection />
      <FreeMaterialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
