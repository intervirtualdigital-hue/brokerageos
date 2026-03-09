
import { HeroSection } from '../components/home/HeroSection';
import { ComparisonSection } from '../components/home/ComparisonSection';
import { InfrastructureMapSection } from '../components/home/InfrastructureMapSection';
import { ValuationFunnelPanel } from '../components/home/ValuationFunnelPanel';
import { BuyerQualPanel } from '../components/home/BuyerQualPanel';
import { SystemOverviewSection } from '../components/home/SystemOverviewSection';
import { ListingsDashPanel } from '../components/home/ListingsDashPanel';
import { AudienceSection } from '../components/home/AudienceSection';
import { AdvisorRoutingPanel } from '../components/home/AdvisorRoutingPanel';
import { ClosingCTASection } from '../components/home/ClosingCTASection';

export const Home = () => {
  return (
    <>
      <HeroSection />
      <ComparisonSection />
      <InfrastructureMapSection />
      <ValuationFunnelPanel />
      <BuyerQualPanel />
      <SystemOverviewSection />
      <ListingsDashPanel />
      <AudienceSection />
      <AdvisorRoutingPanel />
      <ClosingCTASection />
    </>
  );
};
