import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-mtm-cream border-t border-mtm-border">
      <div className="max-w-[1200px] mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img
              src="/assets/mtm-logo.png"
              alt="Meet the Moment"
              className="h-10 mb-4"
            />
            <p className="text-sm text-mtm-text-secondary mb-4">
              AI-powered party games for families, friends, and teams.
              Copy a prompt, paste into your favorite AI, and play!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-mtm-navy mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-mtm-text-secondary hover:text-mtm-primary transition-colors">
                  All Games
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-mtm-text-secondary hover:text-mtm-primary transition-colors">
                  About This Project
                </Link>
              </li>
              <li>
                <a
                  href="https://together.mtm.now"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-mtm-text-secondary hover:text-mtm-primary transition-colors"
                >
                  MTM Together Community
                </a>
              </li>
              <li>
                <a
                  href="https://mtm.now"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-mtm-text-secondary hover:text-mtm-primary transition-colors"
                >
                  Meet the Moment
                </a>
              </li>
            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h4 className="font-semibold text-mtm-navy mb-4">Recommended AI Tools</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://chat.openai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-mtm-text-secondary hover:text-mtm-primary transition-colors"
                >
                  ChatGPT
                </a>
              </li>
              <li>
                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-mtm-text-secondary hover:text-mtm-primary transition-colors"
                >
                  Claude
                </a>
              </li>
              <li>
                <a
                  href="https://gemini.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-mtm-text-secondary hover:text-mtm-primary transition-colors"
                >
                  Gemini
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-mtm-border mt-8 pt-8 text-center">
          <p className="text-sm text-mtm-text-secondary">
            Built with AI by{' '}
            <a
              href="https://mtm.now"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mtm-primary hover:underline"
            >
              Meet the Moment
            </a>
            {' '}&mdash; Building technology that serves your mission.
          </p>
          <p className="text-xs text-mtm-text-secondary mt-2">
            &copy; {new Date().getFullYear()} Meet the Moment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
