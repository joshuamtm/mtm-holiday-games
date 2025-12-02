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
  Gift,
  Star,
  Sparkles,
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
      <div className="min-h-screen bg-holiday-snow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-holiday-pine mb-4">Game Not Found</h1>
          <Link
            to="/"
            className="text-holiday-green hover:underline inline-flex items-center gap-2"
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
    <div className="min-h-screen bg-holiday-snow">
      {/* Back Navigation */}
      <div className="max-w-[1200px] mx-auto px-5 py-4">
        <Link
          to="/"
          className="text-holiday-green hover:text-holiday-pine transition-colors inline-flex items-center gap-2 text-sm font-medium"
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
                <span className="bg-holiday-gold text-holiday-pine text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Gift size={12} />
                  FREE
                </span>
              )}
              <span
                className={`text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 ${
                  game.age === 'kids' ? 'bg-holiday-green' : 'bg-holiday-red'
                }`}
              >
                {game.age === 'kids' ? (
                  <>
                    <Gift size={12} />
                    Family Friendly
                  </>
                ) : (
                  <>
                    <Star size={12} />
                    Adults
                  </>
                )}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-holiday-pine mb-2">{game.title}</h1>
            <p className="text-lg text-holiday-red font-medium mb-4">{game.subtitle}</p>

            {/* Description */}
            <p className="text-mtm-text-secondary mb-6">{game.description}</p>

            {/* Tip */}
            {game.tip && (
              <div className="bg-holiday-gold/10 border border-holiday-gold/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-holiday-pine">
                  <strong className="flex items-center gap-1">
                    <Sparkles size={14} className="text-holiday-gold" />
                    Tip:
                  </strong>{' '}
                  {game.tip}
                </p>
              </div>
            )}

            {/* Metadata */}
            <div className="bg-white rounded-xl p-4 mb-6 border border-holiday-green/20 shadow-sm">
              <h3 className="font-semibold text-holiday-pine mb-3">Game Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users size={18} className="text-holiday-green" />
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
                  <Clock size={18} className="text-holiday-green" />
                  <span className="text-sm text-mtm-text">{game.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-holiday-green" />
                  <span className="text-sm text-mtm-text">
                    {locationLabels[game.location]}
                  </span>
                </div>
                {game.requirements.length > 0 && (
                  <div className="flex items-start gap-3">
                    <FileText size={18} className="text-holiday-green flex-shrink-0 mt-0.5" />
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
              <h4 className="text-sm font-medium text-holiday-pine/70 mb-2">
                Game Modes
              </h4>
              <div className="flex flex-wrap gap-2">
                {game.modes.map((mode) => (
                  <span
                    key={mode}
                    className="text-sm bg-holiday-snow border border-holiday-green/20 text-holiday-pine px-3 py-1 rounded-full"
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
                <h3 className="text-lg font-semibold text-holiday-pine">The Prompt</h3>
                <button
                  onClick={handleCopyPrompt}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    copied
                      ? 'bg-holiday-green text-white'
                      : canAccess
                      ? 'btn-holiday-gold'
                      : 'bg-holiday-red text-white hover:bg-holiday-red-dark'
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
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-10">
                    <div className="bg-holiday-red/10 p-4 rounded-full mb-3">
                      <Gift size={32} className="text-holiday-red" />
                    </div>
                    <h4 className="font-semibold text-holiday-pine mb-2">
                      This prompt is locked
                    </h4>
                    <p className="text-sm text-mtm-text-secondary mb-4 text-center max-w-xs">
                      Enter your email to unwrap all 12 games instantly
                    </p>
                    <button
                      onClick={() => setShowEmailModal(true)}
                      className="btn-holiday-gold px-6 py-2 rounded-lg font-semibold"
                    >
                      Unlock All Games
                    </button>
                  </div>
                )}

                <div
                  className={`bg-white border border-holiday-green/20 rounded-xl p-6 max-h-[600px] overflow-y-auto shadow-sm ${
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
                    className="text-holiday-green hover:underline"
                  >
                    ChatGPT
                  </a>
                  ,{' '}
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-holiday-green hover:underline"
                  >
                    Claude
                  </a>
                  , or{' '}
                  <a
                    href="https://gemini.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-holiday-green hover:underline"
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
