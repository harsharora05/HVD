import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { WhyHVD } from "@/components/sections/why-hvd";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { AIInnovation } from "@/components/sections/ai-innovation";
import { AboutPreview } from "@/components/sections/about-preview";
import { ContactSection } from "@/components/sections/contact-section";

/**
 * Section order follows the navbar (Home → Services → Solutions → Our Work → About → Contact)
 * so the scroll-spy highlight always moves left to right. Why HVD sits inside the Services group.
 * Tech stack and process live on the Services and About pages.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyHVD />
      <AIInnovation />
      <FeaturedProjects />
      <AboutPreview />
      <ContactSection />
    </>
  );
}
