import { site } from "@/content/site";
import { FacebookIcon, InstagramIcon, MailIcon, XIcon } from "./Icons";

type Props = {
  /** "light" = white outline on photos; "dark" = cardinal outline on cream */
  tone?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
};

export default function SocialLinks({
  tone = "dark",
  size = "md",
  className = "",
}: Props) {
  const links = [
    { href: site.socials.email, label: "Email", Icon: MailIcon },
    { href: site.socials.x, label: "X", Icon: XIcon },
    { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  ].filter((l) => l.href);

  const ring =
    tone === "light"
      ? "border-white/80 text-white hover:bg-white/15"
      : "border-cardinal text-cardinal hover:bg-cardinal hover:text-white";
  const dim = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const icon = size === "sm" ? 14 : 17;

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            aria-label={label}
            className={`grid ${dim} place-items-center rounded-full border transition ${ring}`}
          >
            <Icon width={icon} height={icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
