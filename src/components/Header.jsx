import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white border-b border-mtm-border sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/mtm-logo.png"
            alt="Meet the Moment"
            className="h-10"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-mtm-navy leading-tight">Holiday Games</h1>
            <p className="text-xs text-mtm-text-secondary">AI-Powered Party Games</p>
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-mtm-text hover:text-mtm-primary transition-colors"
          >
            Games
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-mtm-text hover:text-mtm-primary transition-colors"
          >
            About
          </Link>
          <a
            href="https://together.mtm.now"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex bg-mtm-accent text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Join MTM Together
          </a>
        </nav>
      </div>
    </header>
  );
}
