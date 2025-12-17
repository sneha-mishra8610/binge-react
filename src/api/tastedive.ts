import type { TasteDiveResponse, TasteDiveItem, Movie } from '../types';

const API_KEY = (import.meta as any).env?.VITE_TASTEDIVE_KEY || '1064679-BINGE-38404E94';
const BASE = 'https://tastedive.com/api/similar';
const PROXY = 'https://api.allorigins.win/raw?url=';

function buildUrl(q: string, limit: number = 20) {
  const url = `${BASE}?q=${encodeURIComponent(q)}&type=movie&info=1&limit=${limit}&k=${API_KEY}`;
  return PROXY + encodeURIComponent(url);
}

async function fetchJson(url: string): Promise<TasteDiveResponse> {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.json();
}

function extractItems(data: TasteDiveResponse): TasteDiveItem[] {
  const a = (data as any).similar?.results as TasteDiveItem[] | undefined;
  const b = (data as any).Similar?.Results as TasteDiveItem[] | undefined;
  return a && Array.isArray(a) ? a : b && Array.isArray(b) ? b : [];
}

function normalize(items: TasteDiveItem[]): Movie[] {
  const out: Movie[] = [];
  for (const it of items) {
    const title = it.Name || it.name || 'Untitled';
    const overview = it.wTeaser || it.wUrl || (it as any).url || 'Movie recommendation from TasteDive';
    const yid = it.yID;
    const id = (yid || title).toLowerCase();
    out.push({ id, title, overview, yid });
  }
  return out;
}

function dedupe(movies: Movie[]): Movie[] {
  const m = new Map<string, Movie>();
  for (const mv of movies) {
    if (!m.has(mv.id)) m.set(mv.id, mv);
  }
  return Array.from(m.values());
}

export async function searchTasteDive(query: string): Promise<Movie[]> {
  const url = buildUrl(query, 20);
  const json = await fetchJson(url);
  const items = extractItems(json);
  return normalize(items);
}

export async function fetchSeeds(seeds: string[], target = 60): Promise<Movie[]> {
  const acc: Movie[] = [];
  for (const seed of seeds) {
    try {
      const json = await fetchJson(buildUrl(seed, 20));
      acc.push(...normalize(extractItems(json)));
      const unique = dedupe(acc);
      if (unique.length >= target) return unique.slice(0, target);
    } catch (e) {
      console.warn('Seed fetch failed:', seed, e);
    }
  }
  return dedupe(acc).slice(0, target);
}
