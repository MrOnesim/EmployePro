import HeroSection from '../components/landing/HeroSection';
import ClientsSection from '../components/landing/ClientsSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import DashboardSection from '../components/landing/DashboardSection';
import ComparisonSection from '../components/landing/ComparisonSection';
import GlobalSection from '../components/landing/GlobalSection';
import AISection from '../components/landing/AISection';
import MeetingsSection from '../components/landing/MeetingsSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import PricingSection from '../components/landing/PricingSection';
import FAQSection from '../components/landing/FAQSection';
import CTASection from '../components/landing/CTASection';

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <ClientsSection />
      <FeaturesSection />
      <DashboardSection />
      <ComparisonSection />
      <GlobalSection />
      <AISection />
      <MeetingsSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
