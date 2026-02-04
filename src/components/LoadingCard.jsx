const SIZE_MAP = {
  sm: 'h-56',
  md: 'h-64',
  lg: 'h-72',
};

const LoadingCard = ({ size = 'md', className = '' }) => {
  const heightClass = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <div
      className={`rounded-2xl bg-white shadow-md p-4 animate-pulse ${heightClass} ${className}`}
      aria-busy="true"
    >
      <div className="h-32 w-full rounded-xl bg-gray-200 mb-4" />
      <div className="h-4 w-3/4 rounded bg-gray-200 mb-2" />
      <div className="h-4 w-1/2 rounded bg-gray-200 mb-4" />
      <div className="flex items-center justify-between mt-auto">
        <div className="h-4 w-16 rounded bg-gray-200" />
        <div className="h-8 w-20 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
};

export default LoadingCard;
