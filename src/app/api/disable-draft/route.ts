import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// biome-ignore lint/style/useNamingConvention: Next.js API handler
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  draftMode().disable();

  redirect(searchParams.get("redirect") || "/");
}
