import React from 'react';

type Props = {
  onHome: () => void;
  onSearch: (q: string) => void;
};

export default function Header({ onHome, onSearch }: Props) {
  const [q, setQ] = React.useState('');
  const bingeIcon = new URL('../../images/binge.jpg', import.meta.url).href;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) onHome(); else onSearch(trimmed);
  }

  return (
    <header className="header">
      <a className="nav-center" href="#" onClick={(e) => { e.preventDefault(); onHome(); }}>
        <img className="binge_img" src={bingeIcon} alt="binge icon" />
        <span className="nav-title">BINGE</span>
      </a>
      <form className="nav-search" onSubmit={submit}>
        <input
          className="search"
          placeholder="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </form>
    </header>
  );
}
