import type { Metadata } from "next";
import HeroCard from "@/components/HeroCard";
import SplitLayout from "@/components/SplitLayout";
import { ContentCard, SubCard } from "@/components/ContentCard";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Practice times, contact info, and where to find Stanford Club Golf.",
};

export default function ContactPage() {
  return (
    <SplitLayout
      hero={
        <HeroCard
          image="/images/hero-contact.jpg"
          alt="Club member smiling on the practice green"
          title={
            <>
              Connect
              <br />
              With Us
            </>
          }
        />
      }
    >
      <ContentCard>
        <div className="grid gap-4">
          <div className="grid gap-4 tablet:grid-cols-2">
            <SubCard title="Practice Times">
              <dl className="flex flex-col gap-3">
                {site.practiceTimes.map((t) => (
                  <div key={t.label}>
                    <dt className="text-xs text-ink-muted">{t.label}</dt>
                    <dd className="text-sm font-medium text-cardinal">{t.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-ink-muted">
                Practices are at {site.address.line1}. Times shift by quarter; the
                Schedule page is always current.
              </p>
            </SubCard>

            <SubCard title="Contact">
              <dl className="flex flex-col gap-3">
                {site.phone && (
                  <div>
                    <dt className="text-xs text-ink-muted">Phone</dt>
                    <dd>
                      <a href={`tel:${site.phone}`} className="text-sm font-medium text-cardinal hover:underline">
                        {site.phone}
                      </a>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs text-ink-muted">Email</dt>
                  <dd>
                    <a href={`mailto:${site.email}`} className="text-sm font-medium text-cardinal hover:underline">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-muted">Address</dt>
                  <dd className="text-sm font-medium text-cardinal">
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                    <br />
                    {site.address.city}
                  </dd>
                </div>
              </dl>
            </SubCard>
          </div>

          <SubCard>
            <div className="flex items-center justify-between gap-4">
              <h2 className="section-title text-2xl">Socials</h2>
              <SocialLinks />
            </div>
          </SubCard>

          <div className="overflow-hidden rounded-card bg-cream-2">
            <iframe
              title={`Map to ${site.address.line1}`}
              src={site.mapEmbedUrl}
              width="100%"
              height="360"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full border-0"
            />
          </div>
        </div>
      </ContentCard>
    </SplitLayout>
  );
}
