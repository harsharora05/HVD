import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/sections/page-header";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata = createMetadata({
  title: "Contact Us",
  description: "Have a project in mind? Tell HVD Technologies about your goals, and let's explore how technology can help.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s engineer something <span className="text-gradient">extraordinary.</span>
          </>
        }
        description="Have a project in mind? Tell us about your goals, and let's explore how technology can help."
      />
      <div className="-mt-px">
        <ContactSection heading={false} />
      </div>
    </>
  );
}
