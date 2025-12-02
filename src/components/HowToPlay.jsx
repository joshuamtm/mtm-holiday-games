import { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function HowToPlay({ collapsible = false, defaultExpanded = true }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const content = (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-holiday-green text-white rounded-full flex items-center justify-center font-bold text-sm">
          1
        </div>
        <div>
          <h4 className="font-semibold text-holiday-pine">Copy the Prompt</h4>
          <p className="text-sm text-mtm-text-secondary">
            Click the "Copy Prompt" button below
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-holiday-green text-white rounded-full flex items-center justify-center font-bold text-sm">
          2
        </div>
        <div>
          <h4 className="font-semibold text-holiday-pine">Open Your AI Assistant</h4>
          <p className="text-sm text-mtm-text-secondary mb-2">
            Go to one of these free AI tools:
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://chat.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-holiday-green hover:underline"
            >
              ChatGPT <ExternalLink size={12} />
            </a>
            <span className="text-mtm-text-secondary">|</span>
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-holiday-green hover:underline"
            >
              Claude <ExternalLink size={12} />
            </a>
            <span className="text-mtm-text-secondary">|</span>
            <a
              href="https://gemini.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-holiday-green hover:underline"
            >
              Gemini <ExternalLink size={12} />
            </a>
          </div>
          <p className="text-xs text-mtm-text-secondary mt-1 italic">
            Use Groq, DeepSeek or others at your own risk
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-holiday-green text-white rounded-full flex items-center justify-center font-bold text-sm">
          3
        </div>
        <div>
          <h4 className="font-semibold text-holiday-pine">Paste & Send</h4>
          <p className="text-sm text-mtm-text-secondary">
            Paste the prompt into the chat box and press Enter
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-holiday-green text-white rounded-full flex items-center justify-center font-bold text-sm">
          4
        </div>
        <div>
          <h4 className="font-semibold text-holiday-pine">Follow the AI's Instructions</h4>
          <p className="text-sm text-mtm-text-secondary">
            The AI will host your game! Just answer its questions and follow along.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-holiday-gold text-holiday-pine rounded-full flex items-center justify-center font-bold text-sm">
          5
        </div>
        <div>
          <h4 className="font-semibold text-holiday-pine">Have Fun!</h4>
          <p className="text-sm text-mtm-text-secondary">
            Gather your group, share the screen or read aloud, and let the AI run your game night.
          </p>
        </div>
      </div>

      <div className="bg-holiday-gold/10 border border-holiday-gold/30 rounded-lg p-4 mt-4 space-y-2">
        <p className="text-sm text-holiday-pine flex items-center gap-1">
          <Sparkles size={14} className="text-holiday-gold" />
          <strong>Tip:</strong> Any of these AI tools work great with a free account!
        </p>
        <p className="text-sm text-mtm-text-secondary">
          Don't have an account yet? Signing up takes about 30 seconds — just an email address.
        </p>
        <p className="text-sm text-mtm-text-secondary">
          <strong>On mobile?</strong> ChatGPT, Claude, and Gemini all have apps, or use the website in your browser. Works great on phones and tablets!
        </p>
      </div>
    </div>
  );

  if (collapsible) {
    return (
      <div className="bg-white border border-holiday-green/20 rounded-xl overflow-hidden shadow-sm">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-holiday-snow transition-colors"
        >
          <span className="font-semibold text-holiday-pine flex items-center gap-2">
            <Sparkles size={16} className="text-holiday-gold" />
            First time? Here's how it works
          </span>
          {isExpanded ? (
            <ChevronUp size={20} className="text-holiday-green" />
          ) : (
            <ChevronDown size={20} className="text-holiday-green" />
          )}
        </button>
        {isExpanded && <div className="px-6 pb-6">{content}</div>}
      </div>
    );
  }

  return (
    <div className="bg-white border border-holiday-green/20 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-holiday-pine mb-4 flex items-center gap-2">
        <Sparkles size={18} className="text-holiday-gold" />
        How to Play
      </h3>
      {content}
    </div>
  );
}
