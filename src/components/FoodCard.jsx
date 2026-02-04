import { useMemo } from 'react';
import { Award, Gem, Star } from 'lucide-react';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value ?? 0);

export default function FoodCard({
  foodItem,
  isCaptured,
  isCapturing = false,
  onCapture,
  onClick,
}) {
  const {
    name,
    price,
    location,
    imageUrl,
    xp,
    isBossFood,
    isLegend,
    isHiddenGem,
  } = foodItem;

  const badges = useMemo(() => {
    const items = [];
    if (isBossFood) {
      items.push({ label: 'Boss Food', icon: Award, color: 'text-disney-red' });
    }
    if (isLegend) {
      items.push({ label: 'Legend', icon: Star, color: 'text-disney-yellow' });
    }
    if (isHiddenGem) {
      items.push({ label: 'Hidden Gem', icon: Gem, color: 'text-disney-purple' });
    }
    return items;
  }, [isBossFood, isHiddenGem, isLegend]);

  const fallbackImage = 'https://placehold.co/600x400?text=Disney+Food';

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <button
        type="button"
        onClick={() => onClick?.(foodItem)}
        className="w-full text-left"
      >
        <div className="relative">
          <img
            src={imageUrl || fallbackImage}
            alt={name}
            className="h-40 w-full object-cover"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src = fallbackImage;
            }}
          />
          <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow">
            {formatCurrency(price)}
          </div>
        </div>

        <div className="space-y-2 px-4 pb-4 pt-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{name}</h3>
            <span className="flex items-center gap-1 rounded-full bg-disney-blue/10 px-2 py-1 text-xs font-semibold text-disney-blue">
              {xp} XP
            </span>
          </div>

          <p className="text-sm text-slate-500 line-clamp-2">{location}</p>

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
        </div>
      </button>

      <div className="border-t border-slate-100 px-4 py-3">
        {isCaptured ? (
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Captured
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onCapture?.(foodItem.id)}
            disabled={isCapturing}
            className="w-full rounded-lg bg-disney-blue px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isCapturing ? 'Capturing...' : 'Capture'}
          </button>
        )}
      </div>
    </div>
  );
}
