import { useEffect, useMemo } from 'react';
import { Award, Gem, Star, X } from 'lucide-react';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value ?? 0);

export default function FoodDetail({
  foodItem,
  isCaptured,
  onCapture,
  onClose,
  isOpen,
}) {
  const badges = useMemo(() => {
    if (!foodItem) return [];
    const items = [];
    if (foodItem.isBossFood) {
      items.push({ label: 'Boss Food', icon: Award, color: 'text-disney-red' });
    }
    if (foodItem.isLegend) {
      items.push({ label: 'Legend', icon: Star, color: 'text-disney-yellow' });
    }
    if (foodItem.isHiddenGem) {
      items.push({ label: 'Hidden Gem', icon: Gem, color: 'text-disney-purple' });
    }
    return items;
  }, [foodItem]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !foodItem) {
    return null;
  }

  const fallbackImage = 'https://placehold.co/800x600?text=Disney+Food';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur"
      role="dialog"
      aria-modal="true"
      onClick={() => onClose?.()}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onClose?.()}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-slate-600 shadow hover:text-disney-blue"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="h-full">
            <img
              src={foodItem.imageUrl || fallbackImage}
              alt={foodItem.name}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.src = fallbackImage;
              }}
            />
          </div>

          <div className="flex flex-col gap-4 p-6">
            <div>
              <p className="text-sm font-semibold uppercase text-disney-blue">
                {foodItem.park}
              </p>
              <h2 className="text-2xl font-bold text-slate-900">{foodItem.name}</h2>
              <p className="mt-2 text-sm text-slate-500">{foodItem.location}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-disney-blue/10 px-3 py-1 text-xs font-semibold text-disney-blue">
                {foodItem.xp} XP
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {foodItem.category}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {formatCurrency(foodItem.price)}
              </span>
            </div>

            {badges.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {badges.map(({ label, icon: Icon, color }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700"
                  >
                    <Icon className={`h-3.5 w-3.5 ${color}`} />
                    {label}
                  </span>
                ))}
              </div>
            ) : null}

            <p className="text-sm text-slate-600">{foodItem.description}</p>

            <div className="mt-auto">
              {isCaptured ? (
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Captured
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onCapture?.(foodItem.id)}
                  className="w-full rounded-lg bg-disney-blue px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
                >
                  Capture
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
