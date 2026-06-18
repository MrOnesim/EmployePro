import HeroSection from '../components/landing/HeroSection';
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
import FooterSection from '../components/landing/FooterSection';

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
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
      <FooterSection />
    </div>
  );
}
