export type TasteDiveItem = {
  Name?: string;
  name?: string;
  yID?: string;
  wTeaser?: string;
  wUrl?: string;
  url?: string;
  Type?: string;
  type?: string;
};

export type TasteDiveResponse = {
  Similar?: { Results?: TasteDiveItem[] };
  similar?: { results?: TasteDiveItem[] };
};

export type Movie = {
  id: string; // yID or name fallback
  title: string;
  overview: string;
  yid?: string;
};
