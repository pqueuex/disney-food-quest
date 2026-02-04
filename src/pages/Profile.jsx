import { useContext, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, MapPin, DollarSign, Flame } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { getUserProfile, getUserCaptures, getUserBadges, getUserStats } from '../services/userService';
import { getFoodItemById } from '../services/foodService';
import { calculateLevel, getLevelProgress } from '../utils/xpCalculator';
import { BADGES } from '../utils/constants';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, signOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [captures, setCaptures] = useState([]);
  const [badges, setBadges] = useState([]);
  const [capturedItems, setCapturedItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user profile
        const profile = await getUserProfile(currentUser.uid);
        if (!profile) {
          setError('User profile not found');
          setLoading(false);
          return;
        }
        setUserProfile(profile);

        // Fetch user captures
        const captureIds = await getUserCaptures(currentUser.uid);
        setCaptures(captureIds || []);

        // Fetch user badges
        const userBadges = await getUserBadges(currentUser.uid);
        setBadges(userBadges || []);

        // Fetch user stats
        const userStats = await getUserStats(currentUser.uid);
        setStats(userStats);

        // Fetch captured food items for the list
        if (captureIds && captureIds.length > 0) {
          const items = await Promise.all(
            captureIds.slice(0, 10).map(id => getFoodItemById(id))
          );
          setCapturedItems(items.filter(Boolean));
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError(err.message || 'Failed to load profile');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to logout');
    }
  };

  const userLevel = userProfile ? calculateLevel(userProfile.totalXP) : 0;
  const levelProgress = userProfile ? getLevelProgress(userProfile.totalXP) : null;

  const badgeMap = useMemo(() => {
    return BADGES.reduce((acc, badge) => {
      acc[badge.id] = badge;
      return acc;
    }, {});
  }, []);

  const earnedBadgeIds = useMemo(() => {
    return new Set(badges.map(b => b.badgeId));
  }, [badges]);

  const favoritePark = stats?.favoritePark || 'N/A';
  const totalSpent = stats?.totalSpent || 0;
  const totalCaptured = captures.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-disney-blue-50 to-white p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-disney-blue-50 to-white p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-disney-red mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error || 'Failed to load profile'}</p>
          <button
            onClick={() => navigate('/browse')}
            className="bg-disney-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-disney-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* User Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-disney-blue mb-2">
                {userProfile.username}
              </h1>
              <div className="flex items-center gap-4">
                <div className="text-lg">
                  <span className="text-gray-600">Level </span>
                  <span className="text-3xl font-bold text-disney-yellow">{userLevel}</span>
                </div>
                <div className="text-lg">
                  <span className="text-gray-600">Total XP: </span>
                  <span className="font-semibold text-disney-blue">{userProfile.totalXP.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-disney-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

          {/* Progress Bar */}
          {levelProgress && (
            <div className="mt-6">
              <ProgressBar
                current={levelProgress.currentLevelXP}
                max={levelProgress.nextLevelXP}
                label={`Level ${userLevel} Progress`}
                color="blue"
              />
            </div>
          )}
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Captured */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="text-gray-600 text-sm font-semibold mb-2">Total Captured</div>
            <div className="text-4xl font-bold text-disney-blue">{totalCaptured}</div>
            <div className="text-xs text-gray-500 mt-2">items collected</div>
          </div>

          {/* Favorite Park */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
              <MapPin size={16} />
              Favorite Park
            </div>
            <div className="text-2xl font-bold text-disney-purple truncate">{favoritePark}</div>
            <div className="text-xs text-gray-500 mt-2">most captures</div>
          </div>

          {/* Total Spent */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
              <DollarSign size={16} />
              Total Spent
            </div>
            <div className="text-4xl font-bold text-disney-yellow">${totalSpent.toFixed(2)}</div>
            <div className="text-xs text-gray-500 mt-2">on food</div>
          </div>

          {/* Current Streak */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
              <Flame size={16} />
              Current Streak
            </div>
            <div className="text-4xl font-bold text-disney-red">0</div>
            <div className="text-xs text-gray-500 mt-2">days in a row</div>
          </div>
        </div>

        {/* Badge Showcase */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold text-disney-blue mb-6">Badge Showcase</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {BADGES.map(badge => {
              const earnedBadge = badges.find(b => b.badgeId === badge.id);
              return (
                <div key={badge.id}>
                  <Badge
                    badge={badge}
                    isEarned={earnedBadgeIds.has(badge.id)}
                    earnedDate={earnedBadge?.earnedAt || null}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Captured Items List */}
        {capturedItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-disney-blue mb-6">Recent Captures</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {capturedItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition border-l-4 border-disney-blue"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <div className="text-sm text-gray-600">
                      <span>{item.park}</span> • <span>${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-disney-yellow">
                      +{item.xp} XP
                    </div>
                    <div className="text-xs text-gray-500 capitalize">{item.category}</div>
                  </div>
                </div>
              ))}
            </div>
            {totalCaptured > 10 && (
              <div className="text-center mt-4 text-sm text-gray-600">
                Showing 10 of {totalCaptured} captured items
              </div>
            )}
          </div>
        )}

        {/* Empty Captures State */}
        {capturedItems.length === 0 && totalCaptured === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 mb-4">No captures yet! Start your Disney food quest.</p>
            <button
              onClick={() => navigate('/browse')}
              className="bg-disney-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Browse Foods
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
