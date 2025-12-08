import { useState } from 'react';
import { Link } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';
import {
  ChevronDown,
  ChevronUp,
  Users,
  Clock,
  Sparkles,
  Search,
  Lightbulb,
  Trophy,
  Quote,
  ArrowRight
} from 'lucide-react';

function CaseStudyCard({ study, isExpanded, onToggle }) {
  return (
    <div className="bg-white rounded-xl border border-mtm-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header - Always visible */}
      <div
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {/* Game badge */}
            <span className="inline-flex items-center gap-1 text-xs font-medium text-holiday-green bg-holiday-green/10 px-2 py-1 rounded-full mb-3">
              <Search size={12} />
              {study.game}
            </span>

            <h3 className="text-xl font-semibold text-holiday-pine mb-2">
              "{study.title}"
            </h3>
            <p className="text-mtm-text-secondary mb-4">
              {study.tagline}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 text-sm text-mtm-text-secondary">
              <span className="flex items-center gap-1">
                <Users size={14} className="text-holiday-green" />
                {study.players} players
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} className="text-holiday-green" />
                {study.duration}
              </span>
              <span className="flex items-center gap-1">
                <Sparkles size={14} className="text-holiday-gold" />
                {study.ageRange}
              </span>
            </div>
          </div>

          <button
            className="p-2 text-mtm-text-secondary hover:text-holiday-green transition-colors"
            aria-label={isExpanded ? "Collapse case study" : "Expand case study"}
          >
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-mtm-border">
          {/* The Crime */}
          <div className="p-6 bg-holiday-pine/5">
            <h4 className="font-semibold text-holiday-pine mb-2 flex items-center gap-2">
              <Search size={16} />
              The Crime
            </h4>
            <p className="text-mtm-text">
              {study.crime}
            </p>
          </div>

          {/* Evidence */}
          <div className="p-6">
            <h4 className="font-semibold text-holiday-pine mb-3 flex items-center gap-2">
              <Lightbulb size={16} />
              The Evidence
            </h4>
            <ul className="space-y-2">
              {study.evidence.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-mtm-text">
                  <span className="text-holiday-gold font-bold mt-0.5">{idx + 1}.</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Breakthroughs */}
          <div className="p-6 bg-holiday-gold/5 border-t border-mtm-border">
            <h4 className="font-semibold text-holiday-pine mb-4 flex items-center gap-2">
              <Sparkles size={16} />
              Key Breakthroughs
            </h4>
            <div className="space-y-4">
              {study.breakthroughs.map((breakthrough, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 border border-holiday-gold/20">
                  <p className="font-medium text-holiday-pine mb-1">
                    "{breakthrough.question}"
                  </p>
                  <p className="text-sm text-mtm-text-secondary mb-2">
                    <span className="font-medium text-holiday-green">Insight:</span> {breakthrough.insight}
                  </p>
                  <p className="text-sm text-mtm-text">
                    <span className="font-medium text-holiday-gold">Reveal:</span> {breakthrough.reveal}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Solution */}
          <div className="p-6 bg-holiday-green/5 border-t border-mtm-border">
            <h4 className="font-semibold text-holiday-pine mb-3 flex items-center gap-2">
              <Trophy size={16} />
              The Solution
            </h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium text-holiday-pine">Perpetrator:</span> {study.solution.perpetrator}</p>
              <p><span className="font-medium text-holiday-pine">Motive:</span> {study.solution.motive}</p>
              <p><span className="font-medium text-holiday-pine">How it worked:</span> {study.solution.mechanism}</p>
            </div>
          </div>

          {/* What Made It Work */}
          <div className="p-6 border-t border-mtm-border">
            <h4 className="font-semibold text-holiday-pine mb-3">What Made It Work</h4>
            <ul className="space-y-2">
              {study.successFactors.map((factor, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-mtm-text">
                  <span className="text-holiday-green mt-1">&#10003;</span>
                  {factor}
                </li>
              ))}
            </ul>
          </div>

          {/* Highlight Quote */}
          <div className="p-6 bg-holiday-pine text-white">
            <div className="flex gap-3">
              <Quote size={24} className="text-holiday-gold flex-shrink-0" />
              <div>
                <p className="italic mb-3">"{study.highlightQuote}"</p>
                <p className="text-sm text-white/80">{study.feedback}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="p-6 bg-holiday-snow border-t border-mtm-border">
            <Link
              to={`/game/${study.gameSlug}`}
              className="inline-flex items-center gap-2 btn-holiday-secondary px-4 py-2 rounded-lg text-sm font-medium"
            >
              Try {study.game}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CaseStudies() {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (caseStudies.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-holiday-snow">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-holiday-gold bg-holiday-gold/10 px-3 py-1 rounded-full mb-3">
            <Trophy size={14} />
            Real Playtest Stories
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-holiday-pine mb-3">
            Case Studies: Games in Action
          </h2>
          <p className="text-mtm-text-secondary max-w-2xl mx-auto">
            See how real groups solved mysteries, made connections, and had a blast.
            These stories show what makes AI-hosted games special.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-6">
          {caseStudies.map((study) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              isExpanded={expandedId === study.id}
              onToggle={() => handleToggle(study.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
