import { useMemo } from 'react';

const COLOR_MAP = {
  blue: 'from-disney-blue to-blue-500',
  yellow: 'from-disney-yellow to-yellow-400',
  purple: 'from-disney-purple to-purple-500',
};

export default function ProgressBar({ current, max, label, color = 'blue' }) {
  const safeMax = Math.max(1, Number(max) || 0);
  const safeCurrent = Math.min(safeMax, Math.max(0, Number(current) || 0));

  const percentage = useMemo(
    () => Math.round((safeCurrent / safeMax) * 100),
    [safeCurrent, safeMax]
  );

  const gradient = COLOR_MAP[color] || COLOR_MAP.blue;

  return (
    <div className="w-full">
      {label ? (
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
          <span>{label}</span>
          <span className="text-slate-500">
            {safeCurrent} / {safeMax}
          </span>
        </div>
      ) : null}
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
          aria-valuenow={safeCurrent}
          aria-valuemin={0}
          aria-valuemax={safeMax}
          role="progressbar"
        />
      </div>
      <div className="mt-2 text-right text-xs text-slate-500">{percentage}%</div>
    </div>
  );
}
