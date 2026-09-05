import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "./Icons";

type Props = {
  href: string;
  image: string;
  alt: string;
  label: string;
};

/** Photo tile with a serrated postage-stamp edge, used in the home grid. */
export default function StampTile({ href, image, alt, label }: Props) {
  return (
    <Link href={href} className="group block h-full min-h-0">
      <div className="stamp h-full transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative aspect-[16/11] w-full overflow-hidden desktop:aspect-auto desktop:h-full">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1200px) 26vw, (min-width: 810px) 45vw, 92vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 text-white">
            <span className="text-xs font-medium drop-shadow">{label}</span>
            <span className="grid h-5 w-5 place-items-center rounded-full border border-white/90 transition group-hover:bg-white group-hover:text-cardinal">
              <ArrowUpRightIcon width={12} height={12} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
