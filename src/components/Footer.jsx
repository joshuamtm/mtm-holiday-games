import { Link } from 'react-router-dom';
import { TreePine, Snowflake, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-holiday-pine text-white relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-2 bg-gradient-to-r from-holiday-red via-holiday-gold to-holiday-green" />

      <div className="max-w-[1200px] mx-auto px-5 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/mtm-logo.png"
                alt="Meet the Moment"
                className="h-10 brightness-0 invert"
              />
              <Snowflake size={20} className="text-holiday-gold" />
            </div>
            <p className="text-sm text-white/80 mb-4">
              AI-powered party games for families, friends, and teams.
              Copy a prompt, paste into your favorite AI, and let the holiday fun begin!
            </p>
            <div className="flex items-center gap-1 text-holiday-gold text-sm">
              <TreePine size={16} />
              <span>Happy Holidays 2025!</span>
              <TreePine size={16} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-holiday-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-white/80 hover:text-holiday-gold transition-colors">
                  All Games
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-white/80 hover:text-holiday-gold transition-colors">
                  About This Project
                </Link>
              </li>
              <li>
                <a
                  href="https://together.mtm.now"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-holiday-gold transition-colors"
                >
                  MTM Together Community
                </a>
              </li>
              <li>
                <a
                  href="https://mtm.now"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-holiday-gold transition-colors"
                >
                  Meet the Moment
                </a>
              </li>
            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h4 className="font-semibold text-holiday-gold mb-4">Recommended AI Tools</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://chat.openai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-holiday-gold transition-colors"
                >
                  ChatGPT
                </a>
              </li>
              <li>
                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-holiday-gold transition-colors"
                >
                  Claude
                </a>
              </li>
              <li>
                <a
                  href="https://gemini.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-holiday-gold transition-colors"
                >
                  Gemini
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-white/80">
            Built with <Heart size={14} className="inline text-holiday-red" /> and AI by{' '}
            <a
              href="https://mtm.now"
              target="_blank"
              rel="noopener noreferrer"
              className="text-holiday-gold hover:underline"
            >
              Meet the Moment
            </a>
            {' '}&mdash; Building technology that serves your mission.
          </p>
          <p className="text-xs text-white/60 mt-2">
            &copy; {new Date().getFullYear()} Meet the Moment. All rights reserved.
          </p>
        </div>
      </div>

      {/* Decorative snowflakes */}
      <div className="absolute top-8 right-8 text-white/10">
        <Snowflake size={60} />
      </div>
      <div className="absolute bottom-12 left-8 text-white/10">
        <Snowflake size={40} />
      </div>
    </footer>
  );
}
