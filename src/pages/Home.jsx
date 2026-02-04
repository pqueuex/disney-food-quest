import { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { Sparkles, Crown, Gem, Users } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { db } from '../services/firebase';
import { getAllFoodItems, getHiddenGems, getLegends } from '../services/foodService';
import FoodCard from '../components/FoodCard';
import LoadingCard from '../components/LoadingCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [legends, setLegends] = useState([]);
  const [hiddenGems, setHiddenGems] = useState([]);
  const [stats, setStats] = useState({
    totalFoodItems: 0,
    totalCaptures: 0,
    activeUsersToday: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [legendItems, gemItems, allItems] = await Promise.all([
          getLegends(),
          getHiddenGems(),
          getAllFoodItems(),
        ]);

        setLegends(legendItems || []);
        setHiddenGems(gemItems || []);

        const capturesCollection = collection(db, 'userCaptures');
        const capturesSnapshot = await getDocs(capturesCollection);
        const totalCaptures = capturesSnapshot.size;

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const todayQuery = query(
          capturesCollection,
          where('capturedAt', '>=', Timestamp.fromDate(startOfDay))
        );
        const todaySnapshot = await getDocs(todayQuery);
        const activeUsersToday = new Set(
          todaySnapshot.docs.map((docSnap) => docSnap.data().userId)
        ).size;

        setStats({
          totalFoodItems: allItems.length,
          totalCaptures,
          activeUsersToday,
        });

        setLoading(false);
      } catch (err) {
        console.error('Failed to load home data:', err);
        setError(err.message || 'Failed to load home data');
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const ctaLabel = currentUser ? 'Browse Foods' : 'Sign Up';
  const ctaRoute = currentUser ? '/browse' : '/signup';

  const legendCards = useMemo(() => {
    return legends.slice(0, 8);
  }, [legends]);

  const gemCards = useMemo(() => {
    return hiddenGems.slice(0, 6);
  }, [hiddenGems]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-disney-blue-50 to-white p-6 md:p-10">
        <div className="max-w-4xl mx-auto text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-disney-red mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/browse')}
            className="bg-disney-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-disney-blue-50 to-white">
      {/* Hero Section */}
      <section className="px-6 md:px-10 py-12 md:py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-disney-yellow" size={28} />
              <span className="text-sm uppercase tracking-widest text-disney-blue font-semibold">
                Disney Food Quest
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-disney-blue leading-tight mb-4">
              Track, Capture, Level Up!
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-xl">
              Discover legendary bites, collect hidden gems, and level up your Disney foodie journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to={ctaRoute}
                className="bg-disney-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {ctaLabel}
              </Link>
              <Link
                to="/browse"
                className="border border-disney-blue text-disney-blue px-6 py-3 rounded-lg font-semibold hover:bg-disney-blue hover:text-white transition"
              >
                Explore Foods
              </Link>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-3xl shadow-xl p-6 md:p-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-disney-blue/10 to-white p-4 rounded-xl">
                <div className="text-sm text-gray-500">Total Foods</div>
                {loading ? (
                  <LoadingSpinner size="sm" className="justify-start" />
                ) : (
                  <div className="text-3xl font-bold text-disney-blue">{stats.totalFoodItems}</div>
                )}
              </div>
              <div className="bg-gradient-to-br from-disney-yellow/10 to-white p-4 rounded-xl">
                <div className="text-sm text-gray-500">Total Captures</div>
                {loading ? (
                  <LoadingSpinner size="sm" className="justify-start" />
                ) : (
                  <div className="text-3xl font-bold text-disney-yellow">{stats.totalCaptures}</div>
                )}
              </div>
              <div className="bg-gradient-to-br from-disney-purple/10 to-white p-4 rounded-xl">
                <div className="text-sm text-gray-500">Active Today</div>
                {loading ? (
                  <LoadingSpinner size="sm" className="justify-start" />
                ) : (
                  <div className="text-3xl font-bold text-disney-purple">{stats.activeUsersToday}</div>
                )}
              </div>
              <div className="bg-gradient-to-br from-disney-red/10 to-white p-4 rounded-xl">
                <div className="text-sm text-gray-500">Your Quest</div>
                <div className="text-lg font-semibold text-disney-red">
                  {currentUser ? 'Continue' : 'Start now'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Legends Carousel */}
      <section className="px-6 md:px-10 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Crown className="text-disney-yellow" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-disney-blue">Nearby Legends</h2>
          </div>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 snap-x snap-mandatory">
              {loading &&
                Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="min-w-[260px] snap-start">
                    <LoadingCard size="sm" />
                  </div>
                ))}
              {!loading && legendCards.map((item) => (
                <div key={item.id} className="min-w-[260px] snap-start">
                  <FoodCard
                    foodItem={item}
                    isCaptured={false}
                    onCapture={() => navigate('/browse')}
                    onClick={() => navigate('/browse')}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Gems Grid */}
      <section className="px-6 md:px-10 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Gem className="text-disney-purple" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-disney-blue">Hidden Gems</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading &&
              Array.from({ length: 6 }).map((_, idx) => (
                <LoadingCard key={idx} size="md" />
              ))}
            {!loading && gemCards.map((item) => (
              <FoodCard
                key={item.id}
                foodItem={item}
                isCaptured={false}
                onCapture={() => navigate('/browse')}
                onClick={() => navigate('/browse')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="px-6 md:px-10 pb-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-disney-blue" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-disney-blue">Quick Stats</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-sm text-gray-500 mb-2">Total Food Items</div>
              {loading ? (
                <LoadingSpinner size="sm" className="justify-start" />
              ) : (
                <div className="text-4xl font-bold text-disney-blue">{stats.totalFoodItems}</div>
              )}
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-sm text-gray-500 mb-2">Total Captures</div>
              {loading ? (
                <LoadingSpinner size="sm" className="justify-start" />
              ) : (
                <div className="text-4xl font-bold text-disney-yellow">{stats.totalCaptures}</div>
              )}
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-sm text-gray-500 mb-2">Active Users Today</div>
              {loading ? (
                <LoadingSpinner size="sm" className="justify-start" />
              ) : (
                <div className="text-4xl font-bold text-disney-purple">{stats.activeUsersToday}</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Disney Food Quest
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/" className="text-gray-600 hover:text-disney-blue">Home</Link>
            <Link to="/browse" className="text-gray-600 hover:text-disney-blue">Browse</Link>
            <Link to="/leaderboard" className="text-gray-600 hover:text-disney-blue">Leaderboard</Link>
            <Link to="/profile" className="text-gray-600 hover:text-disney-blue">Profile</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
