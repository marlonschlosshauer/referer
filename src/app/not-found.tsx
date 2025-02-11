import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function NotFound() {
  const list = await headers();
  const host = list.get("host");
  const protocol = list.get("x-forwarded-proto");
  const referer = list.get("referer");

  if (!host || !referer || !protocol) {
    return (
      <div>
        <h1>NotFound: No host, referrer or protocol found</h1>
      </div>
    );
  }

  const url = referer.slice(protocol.length + 3 + host.length, -1);

  if (!url) {
    return (
      <div>
        <h1>NotFound: No url found</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Url: {url}</h1>
    </div>
  );
}
