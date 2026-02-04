import { useEffect, useMemo, useState } from 'react';
import { toastInfo, toastSuccess, toastError, toastLevelUp, toastBadgeEarned } from '../utils/toast';
import FoodCard from '../components/FoodCard';
import LoadingCard from '../components/LoadingCard';
import { useAuth } from '../context/AuthContext';
import { BADGES, CATEGORIES, PARKS } from '../utils/constants';
import { getAllFoodItems } from '../services/foodService';
import {
  captureFood,
  getUserCaptures,
  getUserProfile,
  hasCaptured,
} from '../services/userService';

export default function Browse() {
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [park, setPark] = useState('All');
  const [category, setCategory] = useState('All');
  const [capturedIds, setCapturedIds] = useState([]);
  const [captureLoadingIds, setCaptureLoadingIds] = useState(new Set());
  const [userLevel, setUserLevel] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await getAllFoodItems();
        if (isMounted) {
          setItems(data);
        }
      } catch (error) {
        console.error('Failed to load food items:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchItems();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setCapturedIds([]);
      setUserLevel(1);
      return;
    }

    let isMounted = true;

    const fetchUserData = async () => {
      try {
        const [captures, profile] = await Promise.all([
          getUserCaptures(currentUser.uid),
          getUserProfile(currentUser.uid),
        ]);

        if (isMounted) {
          setCapturedIds(captures);
          setUserLevel(profile?.level ?? 1);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  const capturedIdSet = useMemo(() => new Set(capturedIds), [capturedIds]);

  const handleCapture = async (foodItemId) => {
    if (!currentUser) {
      toastError('Please sign in to capture items.');
      return;
    }

    if (captureLoadingIds.has(foodItemId)) {
      return;
    }

    if (capturedIdSet.has(foodItemId)) {
      toastInfo('Already captured!');
      return;
    }

    setCaptureLoadingIds((prev) => new Set(prev).add(foodItemId));

    try {
      const alreadyCaptured = await hasCaptured(currentUser.uid, foodItemId);
      if (alreadyCaptured) {
        setCapturedIds((prev) =>
          prev.includes(foodItemId) ? prev : [...prev, foodItemId]
        );
        toastInfo('Already captured!');
        return;
      }

      const result = await captureFood(currentUser.uid, foodItemId);
      setCapturedIds((prev) => [...prev, foodItemId]);
      toastSuccess(`Captured! +${result.xpAwarded} XP`);

      if (result.newLevel > userLevel) {
        toastLevelUp(`Level up! You reached Level ${result.newLevel}`);
      }
      setUserLevel(result.newLevel);

      if (Array.isArray(result.newBadges) && result.newBadges.length > 0) {
        result.newBadges.forEach((badgeId) => {
          const badge = BADGES.find((item) => item.id === badgeId);
          toastBadgeEarned(`Badge earned: ${badge?.name ?? 'New badge'}`);
        });
      }
    } catch (error) {
      toastError(error?.message || 'Unable to capture item. Please try again.');
    } finally {
      setCaptureLoadingIds((prev) => {
        const next = new Set(prev);
        next.delete(foodItemId);
        return next;
      });
    }
  };

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesPark = park === 'All' || item.park === park;
      const matchesCategory = category === 'All' || item.category === category;
      const matchesSearch =
        !normalizedSearch ||
        item.name?.toLowerCase().includes(normalizedSearch) ||
        item.description?.toLowerCase().includes(normalizedSearch);

      return matchesPark && matchesCategory && matchesSearch;
    });
  }, [items, park, category, search]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-disney-blue">Browse Disney Foods</h1>
          <p className="text-sm text-slate-500">
            Explore snacks, meals, and desserts across all four parks.
          </p>
        </header>

        <div className="grid gap-4 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-[1.5fr_1fr_1fr]">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Search
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or description"
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-disney-blue focus:outline-none focus:ring-2 focus:ring-disney-blue/30"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Park
            <select
              value={park}
              onChange={(event) => setPark(event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-disney-blue focus:outline-none focus:ring-2 focus:ring-disney-blue/30"
            >
              <option value="All">All Parks</option>
              {PARKS.map((parkName) => (
                <option key={parkName} value={parkName}>
                  {parkName}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-disney-blue focus:outline-none focus:ring-2 focus:ring-disney-blue/30"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((categoryName) => (
                <option key={categoryName} value={categoryName}>
                  {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingCard key={`skeleton-${index}`} size="md" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
            <h2 className="text-lg font-semibold text-slate-800">No items found</h2>
            <p className="mt-2 text-sm text-slate-500">
              Try adjusting your search or filters to find something tasty.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <FoodCard
                key={item.id}
                foodItem={item}
                isCaptured={capturedIdSet.has(item.id)}
                isCapturing={captureLoadingIds.has(item.id)}
                onCapture={handleCapture}
                onClick={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
