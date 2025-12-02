import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGameBySlug, modeLabels, locationLabels } from '../data/games';
import { getPromptBySlug } from '../data/prompts';
import { useAuth } from '../context/AuthContext';
import HowToPlay from '../components/HowToPlay';
import EmailModal from '../components/EmailModal';
import {
  ArrowLeft,
  Users,
  Clock,
  MapPin,
  FileText,
  Copy,
  Check,
  Lock,
} from 'lucide-react';

export default function GameDetailPage() {
  const { slug } = useParams();
  const { isUnlocked, unlock } = useAuth();
  const [copied, setCopied] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const game = getGameBySlug(slug);
  const prompt = getPromptBySlug(slug);

  if (!game) {
    return (
      <div className="min-h-screen bg-mtm-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-mtm-navy mb-4">Game Not Found</h1>
          <Link
            to="/"
            className="text-mtm-primary hover:underline inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Games
          </Link>
        </div>
      </div>
    );
  }

  const canAccess = game.free || isUnlocked;

  const handleCopyPrompt = async () => {
    if (!canAccess) {
      setShowEmailModal(true);
      return;
    }

    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="min-h-screen bg-mtm-white">
      {/* Back Navigation */}
      <div className="max-w-[1200px] mx-auto px-5 py-4">
        <Link
          to="/"
          className="text-mtm-primary hover:text-mtm-navy transition-colors inline-flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to All Games
        </Link>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Game Info */}
          <div className="lg:col-span-1">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {game.free && (
                <span className="bg-mtm-accent text-white text-xs font-medium px-3 py-1 rounded">
                  FREE
                </span>
              )}
              <span
                className={`text-white text-xs font-medium px-3 py-1 rounded ${
                  game.age === 'kids' ? 'bg-mtm-primary' : 'bg-mtm-navy'
                }`}
              >
                {game.age === 'kids' ? 'Family Friendly' : 'Adults'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-mtm-navy mb-2">{game.title}</h1>
            <p className="text-lg text-mtm-primary font-medium mb-4">{game.subtitle}</p>

            {/* Description */}
            <p className="text-mtm-text-secondary mb-6">{game.description}</p>

            {/* Tip */}
            {game.tip && (
              <div className="bg-mtm-primary/10 border border-mtm-primary/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-mtm-navy">
                  <strong>Tip:</strong> {game.tip}
                </p>
              </div>
            )}

            {/* Metadata */}
            <div className="bg-mtm-cream rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-mtm-navy mb-3">Game Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users size={18} className="text-mtm-soft-blue" />
                  <div>
                    <span className="text-sm text-mtm-text">
                      {game.players.min}-{game.players.max} players
                    </span>
                    {game.optimalPlayers && (
                      <span className="text-xs text-mtm-text-secondary ml-2">
                        (best with {game.optimalPlayers})
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-mtm-soft-blue" />
                  <span className="text-sm text-mtm-text">{game.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-mtm-soft-blue" />
                  <span className="text-sm text-mtm-text">
                    {locationLabels[game.location]}
                  </span>
                </div>
                {game.requirements.length > 0 && (
                  <div className="flex items-start gap-3">
                    <FileText size={18} className="text-mtm-soft-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm text-mtm-text font-medium">
                        You'll need:
                      </span>
                      <ul className="text-sm text-mtm-text-secondary">
                        {game.requirements.map((req, i) => (
                          <li key={i}>• {req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mode Tags */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-mtm-text-secondary mb-2">
                Game Modes
              </h4>
              <div className="flex flex-wrap gap-2">
                {game.modes.map((mode) => (
                  <span
                    key={mode}
                    className="text-sm bg-white border border-mtm-border text-mtm-navy px-3 py-1 rounded"
                  >
                    {modeLabels[mode]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Prompt & Instructions */}
          <div className="lg:col-span-2">
            {/* How to Play */}
            <HowToPlay />

            {/* Prompt Section */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-mtm-navy">The Prompt</h3>
                <button
                  onClick={handleCopyPrompt}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                    copied
                      ? 'bg-green-500 text-white'
                      : canAccess
                      ? 'bg-mtm-primary text-white hover:bg-mtm-primary/90'
                      : 'bg-mtm-navy text-white hover:bg-mtm-navy/90'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={18} />
                      Copied!
                    </>
                  ) : canAccess ? (
                    <>
                      <Copy size={18} />
                      Copy Prompt
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      Unlock to Copy
                    </>
                  )}
                </button>
              </div>

              {/* Prompt Display */}
              <div className="relative">
                {!canAccess && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center z-10">
                    <Lock size={32} className="text-mtm-navy mb-3" />
                    <h4 className="font-semibold text-mtm-navy mb-2">
                      This prompt is locked
                    </h4>
                    <p className="text-sm text-mtm-text-secondary mb-4 text-center max-w-xs">
                      Enter your email to unlock all 12 games instantly
                    </p>
                    <button
                      onClick={() => setShowEmailModal(true)}
                      className="bg-mtm-accent text-white px-6 py-2 rounded-md font-medium hover:bg-mtm-accent/90 transition-colors"
                    >
                      Unlock All Games
                    </button>
                  </div>
                )}

                <div
                  className={`bg-gray-50 border border-mtm-border rounded-lg p-6 max-h-[600px] overflow-y-auto ${
                    !canAccess ? 'blur-sm select-none' : ''
                  }`}
                >
                  <pre className="prompt-text whitespace-pre-wrap text-sm text-mtm-text">
                    {prompt}
                  </pre>
                </div>
              </div>

              {/* Copy confirmation */}
              {canAccess && (
                <p className="text-sm text-mtm-text-secondary mt-3">
                  Click "Copy Prompt" then paste it into{' '}
                  <a
                    href="https://chat.openai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mtm-primary hover:underline"
                  >
                    ChatGPT
                  </a>
                  ,{' '}
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mtm-primary hover:underline"
                  >
                    Claude
                  </a>
                  , or{' '}
                  <a
                    href="https://gemini.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mtm-primary hover:underline"
                  >
                    Gemini
                  </a>{' '}
                  to start playing!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSuccess={unlock}
      />
    </div>
  );
}
