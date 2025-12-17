import React from 'react';
import type { Movie } from '../types';

type Props = { movie: Movie };

export default function MovieCard({ movie }: Props) {
  const poster = movie.yid
    ? `https://img.youtube.com/vi/${movie.yid}/hqdefault.jpg`
    : 'https://via.placeholder.com/280x180?text=BINGE';

  return (
    <div className="box">
      <img className="img" src={poster} alt={movie.title} />
      <div className="description">
        <div className="name">{movie.title}</div>
        <div className="hidden">
          {movie.yid && (
            <iframe
              className="video-player"
              src={`https://www.youtube.com/embed/${movie.yid}`}
              title={movie.title}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          <div className="overview">{movie.overview}</div>
        </div>
        <div className="bottom">
          <span className="rating">N/A</span>
          <span className="year">—</span>
        </div>
      </div>
    </div>
  );
}
