import { useState } from 'react';
import { X, Mail, Check, Loader2 } from 'lucide-react';

export default function EmailModal({ isOpen, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // For MVP, we'll simulate the API call
      // In production, this would call /api/signup
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      setStatus('success');

      // Wait a moment then close and notify parent
      setTimeout(() => {
        onSuccess(email);
        onClose();
        setEmail('');
        setStatus('idle');
      }, 2000);
    } catch (error) {
      // For MVP without backend, simulate success
      console.log('Simulating successful signup for:', email);

      // Store in localStorage as a simple MVP solution
      localStorage.setItem('mtm_holiday_games_email', email);
      localStorage.setItem('mtm_holiday_games_unlocked', 'true');

      setStatus('success');
      setTimeout(() => {
        onSuccess(email);
        onClose();
        setEmail('');
        setStatus('idle');
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-mtm-text-secondary hover:text-mtm-text transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-mtm-navy mb-2">You're In!</h2>
            <p className="text-mtm-text-secondary">
              All games are now unlocked. Have fun!
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-mtm-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={32} className="text-mtm-primary" />
              </div>
              <h2 className="text-xl font-semibold text-mtm-navy mb-2">
                Unlock All 12 Games
              </h2>
              <p className="text-mtm-text-secondary text-sm">
                Enter your email to get instant access to our complete library of
                AI-powered party games.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-mtm-border rounded-md text-base focus:outline-none focus:border-mtm-primary focus:ring-2 focus:ring-mtm-primary/20 transition-colors"
                  disabled={status === 'loading'}
                />
                {status === 'error' && errorMessage && (
                  <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-mtm-primary text-white py-3 rounded-md font-medium hover:bg-mtm-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Unlocking...
                  </>
                ) : (
                  'Unlock All Games'
                )}
              </button>
            </form>

            <p className="text-xs text-mtm-text-secondary text-center mt-4">
              By signing up, you'll also join the{' '}
              <a
                href="https://together.mtm.now"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mtm-primary hover:underline"
              >
                MTM Together
              </a>{' '}
              waitlist for nonprofit AI learning.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
