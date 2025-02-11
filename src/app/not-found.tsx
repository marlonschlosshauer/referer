import { headers } from "next/headers";

export default async function NotFound() {
  const list = await headers();
  const host = list.get("host");
  const protocol = list.get("x-forwarded-proto");
  const referer = list.get("referer");

  const entries: Record<string, string | null> = {};

  list.forEach((k, v) => {
    entries[k] = v;
  });

  const Headers = <code>{JSON.stringify(entries)}</code>;

  if (!host || !referer || !protocol) {
    return (
      <div>
        <h1>NotFound: No host, referrer or protocol found</h1>
        {Headers}
      </div>
    );
  }

  const url = referer.slice(protocol.length + 3 + host.length, -1);

  if (!url) {
    return (
      <div>
        <h1>NotFound: No url found</h1>
        {Headers}
      </div>
    );
  }

  return (
    <div>
      <h1>Url: {url}</h1>
      {Headers}
    </div>
  );
}
