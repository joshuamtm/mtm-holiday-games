import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-holiday-gold/30 sticky top-0 z-50 shadow-sm">
      {/* Festive accent bar */}
      <div className="h-1 holiday-gradient" />

      <div className="max-w-[1200px] mx-auto px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/assets/mtm-logo.png"
            alt="Meet the Moment"
            className="h-10"
          />
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-holiday-pine leading-tight">
                Holiday Games
              </h1>
              <Sparkles size={16} className="text-holiday-gold" />
            </div>
            <p className="text-xs text-mtm-text-secondary">AI-Powered Party Games</p>
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-mtm-text hover:text-holiday-green transition-colors"
          >
            Games
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-mtm-text hover:text-holiday-green transition-colors"
          >
            About
          </Link>
          <a
            href="https://together.mtm.now"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex btn-holiday-secondary px-4 py-2 rounded-md text-sm font-medium"
          >
            Join MTM Together
          </a>
        </nav>
      </div>
    </header>
  );
}
