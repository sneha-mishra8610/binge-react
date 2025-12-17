import React from 'react';
import Header from './components/Header';
import MovieGrid from './components/MovieGrid';
import { fetchSeeds, searchTasteDive } from './api/tastedive';
import type { Movie } from './types';

const HOME_SEEDS = [
  'Inception',
  'Interstellar',
  'The Dark Knight',
  'Avengers',
  'Titanic',
  'Harry Potter',
  'Avatar',
  'The Matrix',
];
const HOME_TARGET = 60;

function correctSpelling(q: string): string {
  const map: Record<string, string> = {
    avenger: 'avengers',
    harrypotter: 'harry potter',
    intersteller: 'interstellar',
    titanicc: 'titanic',
  };
  const lower = q.toLowerCase();
  return map[lower] || lower;
}

export default function App() {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  const loadHome = React.useCallback(async () => {
    setLoading(true); setError(undefined);
    try {
      const res = await fetchSeeds(HOME_SEEDS, HOME_TARGET);
      setMovies(res);
    } catch (e: any) {
      setError(e?.message || 'Failed to load homepage movies.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { loadHome(); }, [loadHome]);

  async function onSearch(q: string) {
    const term = correctSpelling(q.trim());
    if (!term) { await loadHome(); return; }
    setLoading(true); setError(undefined);
    try {
      const res = await searchTasteDive(term);
      setMovies(res);
    } catch (e: any) {
      setError(e?.message || 'Search failed.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header onHome={loadHome} onSearch={onSearch} />
      <MovieGrid movies={movies} loading={loading} error={error} />
    </div>
  );
}
