import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Special access key for ungated sharing (change this to any secret you want)
const SPECIAL_ACCESS_KEY = 'mtm-holiday-2025';

export function AuthProvider({ children }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing unlock status
    const savedUnlocked = localStorage.getItem('mtm_holiday_games_unlocked');
    const savedEmail = localStorage.getItem('mtm_holiday_games_email');

    // Check URL for magic link token or special access key
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const accessKey = params.get('access');

    // Check for special ungated access link
    if (accessKey === SPECIAL_ACCESS_KEY) {
      console.log('Special access granted');
      localStorage.setItem('mtm_holiday_games_unlocked', 'true');
      localStorage.setItem('mtm_holiday_games_email', 'special-access');
      setIsUnlocked(true);
      setEmail('special-access');
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
      setIsLoading(false);
      return;
    }

    if (token) {
      // Validate token with API (for now, just accept it)
      verifyToken(token);
    } else if (savedUnlocked === 'true') {
      setIsUnlocked(true);
      setEmail(savedEmail);
    }

    setIsLoading(false);
  }, []);

  const verifyToken = async (token) => {
    try {
      // In production, this would verify with the API
      // For MVP, we'll just accept the token
      const response = await fetch(`/api/verify?token=${token}`);

      if (response.ok) {
        const data = await response.json();
        if (data.valid) {
          localStorage.setItem('mtm_holiday_games_unlocked', 'true');
          localStorage.setItem('mtm_holiday_games_email', data.email || '');
          setIsUnlocked(true);
          setEmail(data.email);
        }
      }
    } catch (error) {
      // For MVP without backend, accept any token
      console.log('Token verification simulated');
      localStorage.setItem('mtm_holiday_games_unlocked', 'true');
      setIsUnlocked(true);
    }

    // Clean up URL
    window.history.replaceState({}, '', window.location.pathname);
    setIsLoading(false);
  };

  const unlock = (userEmail) => {
    localStorage.setItem('mtm_holiday_games_unlocked', 'true');
    localStorage.setItem('mtm_holiday_games_email', userEmail);
    setIsUnlocked(true);
    setEmail(userEmail);
  };

  const lock = () => {
    localStorage.removeItem('mtm_holiday_games_unlocked');
    localStorage.removeItem('mtm_holiday_games_email');
    setIsUnlocked(false);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isUnlocked, email, isLoading, unlock, lock }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
