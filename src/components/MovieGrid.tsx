import React from 'react';
import type { Movie } from '../types';
import MovieCard from './MovieCard';

type Props = {
  movies: Movie[];
  loading: boolean;
  error?: string;
};

export default function MovieGrid({ movies, loading, error }: Props) {
  if (loading) {
    return <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>Loading…</div>;
  }
  if (error) {
    return <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>{error}</div>;
  }
  if (!movies.length) {
    return <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>No results found.</div>;
  }
  return (
    <main>
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </main>
  );
}
