import { NextResponse } from "next/server";
import { getAllEvents, getEventById } from "@/lib/content";
import { buildIcs } from "@/lib/calendar";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllEvents().map((e) => ({ id: e.id }));
}

export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/ics/[id]">,
) {
  const { id } = await ctx.params;
  const event = getEventById(id);
  if (!event) {
    return new NextResponse("Not found", { status: 404 });
  }
  return new NextResponse(buildIcs(event), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.id}.ics"`,
    },
  });
}
