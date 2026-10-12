import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: `Terms governing use of the ${siteConfig.name} website.`,
  path: "/terms",
});

// TODO: Have these terms reviewed by a qualified legal professional before launch.
export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <section className="bg-white py-20">
        <Container className="max-w-3xl">
          <div className="space-y-8 text-[17px] leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink">
            <p>By using this website you agree to the following terms.</p>
            <div>
              <h2>Use of this website</h2>
              <p>
                This website provides information about {siteConfig.name} and its services. You agree not to misuse the site, attempt to
                disrupt it, or submit false or malicious information through its forms.
              </p>
            </div>
            <div>
              <h2>Content</h2>
              <p>
                Website content is provided for general information and may change without notice. Projects labelled as demonstration projects
                are illustrative concepts and do not describe client engagements or measured results.
              </p>
            </div>
            <div>
              <h2>Intellectual property</h2>
              <p>
                The {siteConfig.name} name, logo, design and content of this website are our property unless otherwise stated, and may not be
                reused without permission.
              </p>
            </div>
            <div>
              <h2>Engagements</h2>
              <p>
                Any project work is governed by a separate written agreement. Nothing on this website constitutes an offer or a binding
                commitment.
              </p>
            </div>
            <div>
              <h2>Contact</h2>
              <p>
                Questions about these terms? Email{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-600 underline underline-offset-2">
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
