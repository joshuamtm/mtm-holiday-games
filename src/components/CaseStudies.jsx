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
  ArrowRight,
  Zap,
  Star,
  Target,
  Brain,
  CheckCircle,
  XCircle,
  HelpCircle
} from 'lucide-react';

// Trivia-style case study (like My Category)
function TriviaContent({ study }) {
  return (
    <div className="border-t border-mtm-border">
      {/* Score Summary */}
      <div className="p-6 bg-gradient-to-r from-holiday-gold/10 to-holiday-pine/10">
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-holiday-gold">{study.finalScore.playersWhoScored}</div>
            <div className="text-sm text-mtm-text-secondary">players scored</div>
          </div>
          <div className="text-2xl font-bold text-mtm-text-secondary">of</div>
          <div className="text-center">
            <div className="text-3xl font-bold text-holiday-pine">{study.finalScore.totalPlayers}</div>
            <div className="text-sm text-mtm-text-secondary">total players</div>
          </div>
        </div>
        <p className="text-center text-sm text-mtm-text-secondary mt-2">
          Leader: <span className="font-semibold text-holiday-gold">{study.finalScore.leader}</span> with {study.finalScore.leaderPoints} points
        </p>
      </div>

      {/* The Setup */}
      <div className="p-6 bg-holiday-pine/5">
        <h4 className="font-semibold text-holiday-pine mb-2 flex items-center gap-2">
          <Brain size={16} />
          The Setup
        </h4>
        <p className="text-mtm-text">
          {study.setup}
        </p>
      </div>

      {/* Highlight Rounds */}
      <div className="p-6">
        <h4 className="font-semibold text-holiday-pine mb-4 flex items-center gap-2">
          <Zap size={16} />
          Highlight Rounds
        </h4>
        <div className="space-y-4">
          {study.highlights.map((highlight, idx) => (
            <div key={idx} className="bg-holiday-snow rounded-lg p-4 border border-mtm-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-holiday-pine">{highlight.player}</span>
                  <span className="text-xs bg-holiday-pine/10 text-holiday-pine px-2 py-0.5 rounded">
                    {highlight.difficulty}
                  </span>
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded ${
                  highlight.result === 'CORRECT'
                    ? 'bg-holiday-green/20 text-holiday-green'
                    : highlight.result.includes('GAVE UP')
                    ? 'bg-holiday-gold/20 text-holiday-gold'
                    : 'bg-holiday-red/20 text-holiday-red'
                }`}>
                  {highlight.result === 'CORRECT' && <CheckCircle size={12} />}
                  {highlight.result.includes('GAVE UP') && <HelpCircle size={12} />}
                  {highlight.result.includes('WRONG') && <XCircle size={12} />}
                  {highlight.result}
                </span>
              </div>
              <p className="text-xs text-mtm-text-secondary mb-2">
                Category: <span className="italic">{highlight.category}</span>
              </p>
              <p className="text-sm font-medium text-holiday-pine mb-1">
                "{highlight.question}"
              </p>
              <p className="text-sm text-mtm-text-secondary mb-2">
                <span className="font-medium text-holiday-gold">Answer:</span> {highlight.answer}
              </p>
              <p className="text-sm text-mtm-text italic">
                {highlight.moment}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* The Lesson */}
      {study.theLesson && (
        <div className="p-6 bg-holiday-gold/5 border-t border-mtm-border">
          <h4 className="font-semibold text-holiday-pine mb-2 flex items-center gap-2">
            <Lightbulb size={16} />
            The Lesson
          </h4>
          <p className="text-mtm-text">
            {study.theLesson}
          </p>
        </div>
      )}

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
  );
}

// Competition-style case study (like Kids Win)
function CompetitionContent({ study }) {
  return (
    <div className="border-t border-mtm-border">
      {/* Final Score Banner */}
      <div className="p-6 bg-gradient-to-r from-holiday-green/10 to-holiday-gold/10">
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-holiday-green">{study.finalScore.kids}</div>
            <div className="text-sm text-mtm-text-secondary">Kids</div>
          </div>
          <div className="text-2xl font-bold text-mtm-text-secondary">vs</div>
          <div className="text-center">
            <div className="text-3xl font-bold text-holiday-red">{study.finalScore.adults}</div>
            <div className="text-sm text-mtm-text-secondary">Adults</div>
          </div>
        </div>
      </div>

      {/* The Setup */}
      <div className="p-6 bg-holiday-pine/5">
        <h4 className="font-semibold text-holiday-pine mb-2 flex items-center gap-2">
          <Target size={16} />
          The Setup
        </h4>
        <p className="text-mtm-text">
          {study.setup}
        </p>
      </div>

      {/* Key Moments / Highlights */}
      <div className="p-6">
        <h4 className="font-semibold text-holiday-pine mb-4 flex items-center gap-2">
          <Zap size={16} />
          Highlight Riddles
        </h4>
        <div className="space-y-4">
          {study.highlights.map((highlight, idx) => (
            <div key={idx} className="bg-holiday-gold/5 rounded-lg p-4 border border-holiday-gold/20">
              <p className="font-medium text-holiday-pine mb-2">
                "{highlight.riddle}"
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                  highlight.winner.includes('Kids')
                    ? 'bg-holiday-green/20 text-holiday-green'
                    : 'bg-holiday-red/20 text-holiday-red'
                }`}>
                  {highlight.winner}
                </span>
                <span className="text-sm font-medium text-holiday-gold">
                  Answer: {highlight.answer}
                </span>
              </div>
              <p className="text-sm text-mtm-text">
                {highlight.moment}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MVP Breakdown */}
      {study.mvpBreakdown && (
        <div className="p-6 bg-holiday-green/5 border-t border-mtm-border">
          <h4 className="font-semibold text-holiday-pine mb-4 flex items-center gap-2">
            <Star size={16} />
            MVP Breakdown
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {study.mvpBreakdown.map((mvp, idx) => (
              <div key={idx} className="bg-white rounded-lg p-3 border border-holiday-green/20">
                <div className="flex items-center gap-2 mb-1">
                  {idx === 0 && <span className="text-lg">🥇</span>}
                  {idx === 1 && <span className="text-lg">🥈</span>}
                  {idx > 1 && <span className="text-lg">🏅</span>}
                  <span className="font-semibold text-holiday-pine">{mvp.name}</span>
                  <span className="text-xs text-holiday-gold font-medium">"{mvp.title}"</span>
                </div>
                <p className="text-sm text-mtm-text-secondary">{mvp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

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
  );
}

// Mystery-style case study (like Crime Scene Chaos)
function MysteryContent({ study }) {
  return (
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
              {/* Detective Question - prominently displayed */}
              <div className="bg-holiday-pine/5 -mx-4 -mt-4 px-4 py-3 mb-3 rounded-t-lg border-b border-holiday-gold/20">
                <p className="text-xs font-semibold text-holiday-green uppercase tracking-wide mb-1">
                  🔍 Detective Asked:
                </p>
                <p className="font-medium text-holiday-pine text-lg">
                  "{breakthrough.question}"
                </p>
              </div>
              <p className="text-sm text-mtm-text-secondary mb-2">
                <span className="font-medium text-holiday-green">Why it mattered:</span> {breakthrough.insight}
              </p>
              <p className="text-sm text-mtm-text">
                <span className="font-medium text-holiday-gold">What it revealed:</span> {breakthrough.reveal}
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
  );
}

function CaseStudyCard({ study, isExpanded, onToggle }) {
  const getIcon = () => {
    switch (study.type) {
      case 'competition': return Trophy;
      case 'trivia': return Brain;
      case 'mystery': return Search;
      default: return Search;
    }
  };
  const IconComponent = getIcon();

  const renderContent = () => {
    switch (study.type) {
      case 'competition':
        return <CompetitionContent study={study} />;
      case 'trivia':
        return <TriviaContent study={study} />;
      case 'mystery':
      default:
        return <MysteryContent study={study} />;
    }
  };

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
              <IconComponent size={12} />
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
                {typeof study.players === 'number' ? `${study.players} players` : study.players}
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

      {/* Expanded content - render based on type */}
      {isExpanded && renderContent()}
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
    <section id="case-studies" className="py-12 bg-holiday-snow scroll-mt-20">
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
            See how real groups solved mysteries, dominated riddle battles, and had a blast.
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
