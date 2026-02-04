import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../services/userService';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/browse', label: 'Browse' },
  { to: '/profile', label: 'Profile' },
  { to: '/leaderboard', label: 'Leaderboard' },
];

const Navbar = () => {
  const { currentUser, signOut, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      if (!currentUser) {
        setProfile(null);
        return;
      }
      try {
        const userProfile = await getUserProfile(currentUser.uid);
        if (isMounted) setProfile(userProfile);
      } catch (error) {
        console.error('Failed to load user profile:', error);
      }
    };
    fetchProfile();
    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  const userInitials = useMemo(() => {
    const name = profile?.username || currentUser?.email || '';
    if (!name) return 'DQ';
    const parts = name.split(/\s+/).filter(Boolean);
    return parts.slice(0, 2).map((p) => p[0].toUpperCase()).join('');
  }, [profile?.username, currentUser?.email]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setMenuOpen(false);
      setMobileOpen(false);
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-medium transition ${
      isActive
        ? 'bg-disney-blue text-white'
        : 'text-gray-700 hover:text-disney-blue hover:bg-disney-blue/10'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-disney-blue">
          <div className="h-9 w-9 rounded-xl bg-disney-blue text-white flex items-center justify-center text-lg">
            DQ
          </div>
          <span className="text-lg md:text-xl">Disney Food Quest</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* User Menu / Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-28 bg-gray-200 rounded-lg animate-pulse" />
          ) : currentUser ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((open) => !open)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-disney-blue/10 transition"
              >
                <div className="h-9 w-9 rounded-full bg-disney-blue text-white flex items-center justify-center">
                  {userInitials}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-800">
                    {profile?.username || currentUser.email}
                  </div>
                  <div className="text-xs text-gray-500">Level {profile?.level ?? 1}</div>
                </div>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border overflow-hidden">
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-disney-red hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-disney-blue font-medium hover:bg-disney-blue/10"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-disney-blue text-white font-medium hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-disney-blue/10"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={navLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="border-t px-4 py-3">
            {loading ? (
              <div className="h-9 w-28 bg-gray-200 rounded-lg animate-pulse" />
            ) : currentUser ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-disney-blue text-white flex items-center justify-center">
                    {userInitials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">
                      {profile?.username || currentUser.email}
                    </div>
                    <div className="text-xs text-gray-500">Level {profile?.level ?? 1}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 px-4 py-2 rounded-lg bg-disney-blue/10 text-disney-blue text-center"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex-1 px-4 py-2 rounded-lg bg-red-50 text-disney-red"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 rounded-lg text-disney-blue text-center border border-disney-blue"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 rounded-lg bg-disney-blue text-white text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
