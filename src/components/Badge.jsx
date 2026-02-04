import { useMemo } from 'react';
import { Lock } from 'lucide-react';

const formatDate = (value) => {
  if (!value) return '';
  const date = value?.toDate ? value.toDate() : new Date(value);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export default function Badge({ badge, isEarned, earnedDate }) {
  const tooltip = useMemo(() => badge?.description || '', [badge]);
  const earnedText = useMemo(() => formatDate(earnedDate), [earnedDate]);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border px-4 py-5 text-center transition ${
        isEarned
          ? 'border-disney-yellow/40 bg-white shadow-md'
          : 'border-slate-200 bg-slate-50 text-slate-400'
      }`}
    >
      {isEarned && (
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-60 group-hover:animate-[shimmer_1.5s_linear_infinite]" />
      )}

      <div className="flex flex-col items-center gap-2">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${
            isEarned ? 'bg-disney-yellow/20 text-slate-900' : 'bg-slate-200'
          }`}
        >
          {isEarned ? badge?.icon : <Lock className="h-5 w-5 text-slate-400" />}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {badge?.name ?? 'Badge'}
          </p>
          <p className="text-xs text-slate-500">
            {isEarned ? earnedText || 'Unlocked' : 'Locked'}
          </p>
        </div>
      </div>

      {tooltip && (
        <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-48 -translate-x-1/2 rounded-lg bg-slate-900 px-3 py-2 text-xs text-white opacity-0 transition group-hover:opacity-100">
          {tooltip}
        </div>
      )}
    </div>
  );
}
