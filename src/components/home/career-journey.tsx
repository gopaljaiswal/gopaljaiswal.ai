import { getProfileContent } from "@/data/profile";
import { JourneyTimeline } from "@/components/home/journey-timeline";

export async function CareerJourney() {
  const { careerJourney } = await getProfileContent();
  if (careerJourney.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-center text-sm font-medium text-primary">The journey</p>
      <h2 className="mt-1 text-center font-heading text-xl tracking-tight sm:text-2xl">
        <span className="text-gradient-brand">10 years</span>, campus to Microsoft
      </h2>

      <JourneyTimeline steps={careerJourney} />
    </section>
  );
}
