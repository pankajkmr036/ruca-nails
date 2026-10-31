import fs from 'node:fs';
import { parse } from 'yaml';

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  whatsapp: string;
  instagram: string;
  instagramHandle: string;
  email: string;
  currency: string;
  announcement: string;
  hero: { title: string; subtitle: string; image: string; ctaText: string; ctaLink: string };
  delivery: { area: string; note: string };
  howItWorks: { title: string; text: string }[];
  filters: { shapes: string[]; lengths: string[]; styles: string[] };
}

export const site: SiteConfig = parse(fs.readFileSync('./src/config/site.yaml', 'utf8'));
site.whatsapp = String(site.whatsapp ?? '').replace(/\D/g, '');

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an internal path with the deploy base (e.g. /ruca-nails). */
export const url = (path: string) => (/^https?:/.test(path) ? path : `${base}/${path.replace(/^\//, '')}`);

export const img = (folder: string, name: string) => url(`images/${folder ? folder + '/' : ''}${name}`);

export const money = (n: number) => `${site.currency}${n.toLocaleString('en-IN')}`;

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** WhatsApp link with a pre-filled message. Falls back to Instagram if no number is set. */
export function orderLink(message: string) {
  if (!site.whatsapp) return site.instagram;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const hasWhatsApp = () => Boolean(site.whatsapp);
