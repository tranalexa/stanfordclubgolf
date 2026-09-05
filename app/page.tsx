import HeroCard from "@/components/HeroCard";
import StampTile from "@/components/StampTile";

const tiles = [
  {
    href: "/about",
    label: "About",
    image: "/images/tile-about.jpg",
    alt: "Members of Stanford Club Golf on the course",
  },
  {
    href: "/membership",
    label: "Membership",
    image: "/images/tile-membership.jpg",
    alt: "A golfer lining up a putt",
  },
  {
    href: "/team",
    label: "Competitive Team",
    image: "/images/tile-team.jpg",
    alt: "The competitive travel team at a tournament",
  },
  {
    href: "/schedule",
    label: "Schedule",
    image: "/images/tile-schedule.jpg",
    alt: "A tee box at sunrise",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1500px] flex-1 p-3 tablet:p-4 desktop:p-5">
      <div className="grid gap-3 tablet:gap-4 desktop:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] desktop:gap-4">
        <div className="desktop:h-[calc(100vh-2.5rem)]">
          <HeroCard
            image="/images/hero-home.jpg"
            alt="Stanford Club Golf team at the NCCGA National Finals"
            title={
              <>
                stanford
                <br />
                club golf
              </>
            }
            titleSize="lg"
            showSocials
          />
        </div>

        <nav
          aria-label="Explore the club"
          className="grid grid-cols-1 gap-3 tablet:grid-cols-2 tablet:gap-4 desktop:grid-cols-1 desktop:grid-rows-4 desktop:gap-3 desktop:h-[calc(100vh-2.5rem)]"
        >
          {tiles.map((t) => (
            <StampTile key={t.href} {...t} />
          ))}
        </nav>
      </div>
    </main>
  );
}
