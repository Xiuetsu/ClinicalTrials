export const MAJOR_SPONSORS: Record<string, { ticker: string; logo?: string }> = {
  Pfizer: { ticker: "PFE" },
  Moderna: { ticker: "MRNA" },
  AstraZeneca: { ticker: "AZN" },
  "Johnson & Johnson": { ticker: "JNJ" },
  Janssen: { ticker: "JNJ" },
  Novartis: { ticker: "NVS" },
  Roche: { ticker: "RHHBY" },
  Genentech: { ticker: "RHHBY" },
  Bayer: { ticker: "BAYRY" },
  "Merck Sharp & Dohme": { ticker: "MRK" },
  "Merck & Co.": { ticker: "MRK" },
  "Eli Lilly": { ticker: "LLY" },
  "Bristol-Myers Squibb": { ticker: "BMY" },
  AbbVie: { ticker: "ABBV" },
  "Gilead Sciences": { ticker: "GILD" },
  Regeneron: { ticker: "REGN" },
  Sanofi: { ticker: "SNY" },
  Amgen: { ticker: "AMGN" },
  Biogen: { ticker: "BIIB" },
  Vertex: { ticker: "VRTX" },
  BioNTech: { ticker: "BNTX" },
  GlaxoSmithKline: { ticker: "GSK" },
  GSK: { ticker: "GSK" }
};

export function getSponsorMetadata(name: string) {
  const entry = Object.entries(MAJOR_SPONSORS).find(([label]) => label.toLowerCase() === name.toLowerCase());
  if (entry) {
    return { name: entry[0], ticker: entry[1].ticker, logo: entry[1].logo ?? null };
  }
  return { name, ticker: null, logo: null };
}
