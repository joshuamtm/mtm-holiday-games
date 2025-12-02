import { useState } from 'react';
import { Copy, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

export default function HowToPlay({ collapsible = false, defaultExpanded = true }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const content = (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-mtm-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
          1
        </div>
        <div>
          <h4 className="font-semibold text-mtm-navy">Copy the Prompt</h4>
          <p className="text-sm text-mtm-text-secondary">
            Click the "Copy Prompt" button below
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-mtm-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
          2
        </div>
        <div>
          <h4 className="font-semibold text-mtm-navy">Open Your AI Assistant</h4>
          <p className="text-sm text-mtm-text-secondary mb-2">
            Go to one of these free AI tools:
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://chat.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-mtm-primary hover:underline"
            >
              ChatGPT <ExternalLink size={12} />
            </a>
            <span className="text-mtm-text-secondary">|</span>
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-mtm-primary hover:underline"
            >
              Claude <ExternalLink size={12} />
            </a>
            <span className="text-mtm-text-secondary">|</span>
            <a
              href="https://gemini.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-mtm-primary hover:underline"
            >
              Gemini <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-mtm-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
          3
        </div>
        <div>
          <h4 className="font-semibold text-mtm-navy">Paste & Send</h4>
          <p className="text-sm text-mtm-text-secondary">
            Paste the prompt into the chat box and press Enter
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-mtm-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
          4
        </div>
        <div>
          <h4 className="font-semibold text-mtm-navy">Follow the AI's Instructions</h4>
          <p className="text-sm text-mtm-text-secondary">
            The AI will host your game! Just answer its questions and follow along.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-mtm-accent text-white rounded-full flex items-center justify-center font-bold text-sm">
          5
        </div>
        <div>
          <h4 className="font-semibold text-mtm-navy">Have Fun!</h4>
          <p className="text-sm text-mtm-text-secondary">
            Gather your group, share the screen or read aloud, and let the AI run your game night.
          </p>
        </div>
      </div>

      <div className="bg-mtm-cream rounded-lg p-4 mt-4 space-y-2">
        <p className="text-sm text-mtm-navy">
          <strong>Tip:</strong> Any of these AI tools work great with a free account!
        </p>
        <p className="text-sm text-mtm-text-secondary">
          Don't have an account yet? Signing up takes about 30 seconds — just an email address.
        </p>
        <p className="text-sm text-mtm-text-secondary">
          <strong>On mobile?</strong> ChatGPT and Claude have apps, or use the website in your browser. Works great on phones and tablets!
        </p>
      </div>
    </div>
  );

  if (collapsible) {
    return (
      <div className="bg-white border border-mtm-border rounded-lg overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <span className="font-semibold text-mtm-navy">
            First time? Here's how it works
          </span>
          {isExpanded ? (
            <ChevronUp size={20} className="text-mtm-text-secondary" />
          ) : (
            <ChevronDown size={20} className="text-mtm-text-secondary" />
          )}
        </button>
        {isExpanded && <div className="px-6 pb-6">{content}</div>}
      </div>
    );
  }

  return (
    <div className="bg-white border border-mtm-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-mtm-navy mb-4">How to Play</h3>
      {content}
    </div>
  );
}
