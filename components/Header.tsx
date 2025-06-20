import Link from 'next/link';
import { useState, useEffect } from 'react';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';

export default function Header() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setLoggedIn(true);
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUserEmail(payload.email || '');
        } catch {
          setUserEmail('');
        }
      } else {
        setLoggedIn(false);
        setUserEmail('');
      }
    };

    checkAuth();

    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChange')); // notify logout
    setMobileMenuOpen(false);
    window.location.href = '/';
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 backdrop-blur-md shadow"
        style={{
          backgroundColor: '#0F2027',
          WebkitBackdropFilter: 'blur(10px)', // Safari support
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold hover:no-underline text-white">
            <span className="text-blue-400">MyGlobe</span>
          </Link>

          <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-200">
            <Link href="/">Home</Link>
            <Link href="/plans">Subscription</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/about">About</Link>
            {!loggedIn && (
              <>
                <button onClick={() => setShowSignIn(true)} className="text-blue-400 hover:underline">
                  Sign In
                </button>
                <button onClick={() => setShowSignUp(true)} className="text-green-400 hover:underline">
                  Sign Up
                </button>
              </>
            )}
            {loggedIn && (
              <div className="flex items-center gap-4">
                <Link
                  href="/account"
                  className="text-white truncate max-w-xs hover:underline"
                >
                  {userEmail}
                </Link>
                <button onClick={handleLogout} className="text-red-500 hover:underline">
                  Logout
                </button>
              </div>
            )}
          </nav>

          <button
            className="md:hidden p-2 rounded hover:bg-gray-700 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden bg-[#0F2027] bg-opacity-95 border-t border-gray-700 text-gray-200">
            <div className="flex flex-col px-4 py-3 space-y-2">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/plans" onClick={() => setMobileMenuOpen(false)}>
                Subscription
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              {!loggedIn && (
                <>
                  <button
                    onClick={() => {
                      setShowSignIn(true);
                      setMobileMenuOpen(false);
                    }}
                    className="text-blue-400 hover:underline text-left"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setShowSignUp(true);
                      setMobileMenuOpen(false);
                    }}
                    className="text-green-400 hover:underline text-left"
                  >
                    Sign Up
                  </button>
                </>
              )}
              {loggedIn && (
                <div className="flex items-center justify-between">
                  <Link
                    href="/account"
                    className="truncate max-w-xs hover:underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {userEmail}
                  </Link>
                  <button onClick={handleLogout} className="text-red-500 hover:underline">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        )}
      </header>

      {showSignIn && <SignInModal closeModal={() => setShowSignIn(false)} />}
      {showSignUp && <SignUpModal closeModal={() => setShowSignUp(false)} />}
    </>
  );
}
