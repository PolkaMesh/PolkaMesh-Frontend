import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProblemStatement from '@/components/ProblemStatement';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Architecture from '@/components/Architecture';
import UseCases from '@/components/UseCases';
import Integrations from '@/components/Integrations';
import Metrics from '@/components/Metrics';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProblemStatement />
      <HowItWorks />
      <Features />
      <Architecture />
      <UseCases />
      <Integrations />
      <Metrics />
      <CTASection />
      <Footer />
    </main>
  );
}

