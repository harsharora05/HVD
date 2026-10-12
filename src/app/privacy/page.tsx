import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects personal information.`,
  path: "/privacy",
});

// TODO: Have this policy reviewed by a qualified legal professional before launch.
export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="bg-white py-20">
        <Container className="max-w-3xl">
          <div className="space-y-8 text-[17px] leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink">
            <p>
              This policy explains how {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal information collected through this
              website.
            </p>
            <div>
              <h2>Information we collect</h2>
              <p>
                When you submit our contact form we collect the details you provide: your name, business email, company name, the service
                you&apos;re interested in, optional budget and timeline, and your project description. We do not use advertising trackers on
                this website.
              </p>
            </div>
            <div>
              <h2>How we use it</h2>
              <p>
                We use this information only to respond to your enquiry and discuss potential work with you. We do not sell your personal
                information or use it for unrelated marketing.
              </p>
            </div>
            <div>
              <h2>How it is processed and stored</h2>
              <p>
                Form submissions are delivered to our team through trusted service providers (such as email delivery services). These providers
                process data on our behalf and are not permitted to use it for their own purposes. We keep enquiries only as long as needed to
                respond and maintain business records.
              </p>
            </div>
            <div>
              <h2>Your rights</h2>
              <p>
                You may ask us to access, correct or delete the personal information we hold about you. Contact us at{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-600 underline underline-offset-2">
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </div>
            <div>
              <h2>Changes</h2>
              <p>We may update this policy from time to time. The latest version will always be available on this page.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
