import { getCollection } from 'astro:content';

export async function getProducts() {
  const all = await getCollection('products');
  return all.sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
}

export async function getServices() {
  const all = await getCollection('services');
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Group a list into an ordered map by key, keeping first-seen order. */
export function groupBy<T>(items: T[], key: (t: T) => string) {
  const map = new Map<string, T[]>();
  for (const it of items) {
    const k = key(it);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(it);
  }
  return map;
}
