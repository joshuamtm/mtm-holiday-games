import { Link } from 'react-router-dom';
import {
  Users,
  Lightbulb,
  Shield,
  Compass,
  ExternalLink,
  Code,
  Sparkles,
  FileText,
  Target,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-mtm-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-mtm-cream to-mtm-white py-12 md:py-16">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-mtm-navy mb-4">
            About This Project
          </h1>
          <p className="text-lg text-mtm-text-secondary">
            Holiday Games is more than a fun party tool — it's a demonstration of
            what's possible when AI meets creativity, community, and practical learning.
          </p>
        </div>
      </section>

      {/* What This Demonstrates */}
      <section className="max-w-[800px] mx-auto px-5 py-12">
        <h2 className="text-2xl font-semibold text-mtm-navy mb-6">
          AI in Action: A Case Study
        </h2>

        <div className="bg-white rounded-lg border border-mtm-border p-6 mb-8">
          <p className="text-mtm-text-secondary mb-4">
            This entire application demonstrates the practical power of AI for
            creating real, useful tools. Here's how it was built:
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-mtm-primary/10 rounded-lg flex items-center justify-center">
                <Code size={20} className="text-mtm-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-mtm-navy">Built with Claude Code</h4>
                <p className="text-sm text-mtm-text-secondary">
                  The entire web application — React components, styling, routing,
                  and functionality — was created using Claude Code, Anthropic's
                  AI coding assistant.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-mtm-accent/10 rounded-lg flex items-center justify-center">
                <Sparkles size={20} className="text-mtm-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-mtm-navy">Prompts Created with Multiple AIs</h4>
                <p className="text-sm text-mtm-text-secondary">
                  Each game prompt was crafted and refined using ChatGPT, Claude,
                  and Gemini — demonstrating how different AI tools excel at
                  different creative tasks.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-mtm-navy/10 rounded-lg flex items-center justify-center">
                <Target size={20} className="text-mtm-navy" />
              </div>
              <div>
                <h4 className="font-semibold text-mtm-navy">Tested with AI Personas</h4>
                <p className="text-sm text-mtm-text-secondary">
                  Before testing with real players, we created detailed user personas
                  to simulate different player types and identify potential issues.
                  This systematic approach to prompt testing is a valuable technique
                  for any AI project.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-mtm-cream rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-mtm-navy mb-4">Project Resources</h3>
          <div className="space-y-3">
            <a
              href="https://github.com/joshuamtm/wpti-ai-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-mtm-primary hover:text-mtm-navy transition-colors"
            >
              <Code size={18} />
              <span className="text-sm">WPTI AI Dashboard — Another MTM AI Case Study</span>
              <ExternalLink size={14} />
            </a>
            <a
              href="/assets/mtm-holiday-games-personas.csv"
              download
              className="flex items-center gap-3 text-mtm-primary hover:text-mtm-navy transition-colors"
            >
              <FileText size={18} />
              <span className="text-sm">Download Testing Personas (CSV)</span>
            </a>
          </div>
        </div>
      </section>

      {/* MTM Together Section */}
      <section className="bg-mtm-cream py-12">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-mtm-navy mb-4">
              Meet the Moment Together
            </h2>
            <p className="text-mtm-text-secondary">
              An online community for nonprofit professionals navigating AI
            </p>
          </div>

          <div className="bg-white rounded-lg border border-mtm-border p-6 mb-8">
            <p className="text-mtm-text-secondary mb-6">
              The promise of AI feels big. The path to using it feels isolating.
              Nonprofit leaders are often left to navigate the complexities of AI on
              their own — balancing immense potential against tight budgets, ethical
              questions, and the fear of making a mistake.
            </p>
            <p className="text-mtm-text-secondary">
              That's why we created <strong>MTM Together</strong>: a member-supported
              community built on peer learning, practical skills, safe experimentation,
              and values-driven innovation.
            </p>
          </div>

          {/* Four Pillars */}
          <h3 className="font-semibold text-mtm-navy text-center mb-6">
            Four Pillars to Support Your AI Journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-mtm-border p-5">
              <div className="flex items-center gap-3 mb-2">
                <Users size={20} className="text-mtm-primary" />
                <h4 className="font-semibold text-mtm-navy">Peer Learning</h4>
              </div>
              <p className="text-sm text-mtm-text-secondary">
                You're not figuring this out alone.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-mtm-border p-5">
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb size={20} className="text-mtm-accent" />
                <h4 className="font-semibold text-mtm-navy">Practical Skills</h4>
              </div>
              <p className="text-sm text-mtm-text-secondary">
                Quick wins you can use tomorrow.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-mtm-border p-5">
              <div className="flex items-center gap-3 mb-2">
                <Shield size={20} className="text-mtm-primary" />
                <h4 className="font-semibold text-mtm-navy">Safe to Experiment</h4>
              </div>
              <p className="text-sm text-mtm-text-secondary">
                No stupid questions here.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-mtm-border p-5">
              <div className="flex items-center gap-3 mb-2">
                <Compass size={20} className="text-mtm-accent" />
                <h4 className="font-semibold text-mtm-navy">Values-Driven</h4>
              </div>
              <p className="text-sm text-mtm-text-secondary">
                Innovation with integrity.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-sm text-mtm-text-secondary mb-4">
              Registration opens January 16, 2026. Founding members get the lowest rate
              locked in for life.
            </p>
            <a
              href="https://together.mtm.now"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-mtm-accent text-white px-6 py-3 rounded-md font-medium hover:bg-mtm-accent/90 transition-colors"
            >
              Learn More About MTM Together
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* About MTM */}
      <section className="max-w-[800px] mx-auto px-5 py-12">
        <h2 className="text-2xl font-semibold text-mtm-navy mb-6">
          About Meet the Moment
        </h2>

        <div className="bg-white rounded-lg border border-mtm-border p-6">
          <p className="text-mtm-text-secondary mb-4">
            Meet the Moment provides advisory and coaching services to help nonprofit
            organizations leverage technology for mission impact. Founded by Joshua
            Peskay (CISSP, CISM) and Kim Snyder (PMP, CIPP), we bring 30+ years of
            combined experience serving over 1,000 nonprofits.
          </p>
          <p className="text-mtm-text-secondary mb-6">
            As longtime teachers for TechSoup.org, NTEN.org, and other organizations,
            we've taught AI, Cybersecurity, Data Privacy, Project Management, and
            Technology Governance. We're also co-authors of the cybersecurity chapter
            in <em>AI for Nonprofits</em> and 2024 Nonprofit Trailblazer honorees.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://mtm.now"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-mtm-primary hover:text-mtm-navy transition-colors text-sm font-medium"
            >
              Visit mtm.now
              <ExternalLink size={14} />
            </a>
            <a
              href="mailto:together@mtm.now"
              className="inline-flex items-center gap-2 text-mtm-primary hover:text-mtm-navy transition-colors text-sm font-medium"
            >
              Contact: together@mtm.now
            </a>
          </div>
        </div>
      </section>

      {/* Back to Games */}
      <section className="max-w-[800px] mx-auto px-5 pb-12 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-mtm-primary text-white px-6 py-3 rounded-md font-medium hover:bg-mtm-primary/90 transition-colors"
        >
          Browse All Games
        </Link>
      </section>
    </div>
  );
}
