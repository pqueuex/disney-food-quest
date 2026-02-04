const SIZE_MAP = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-4',
  lg: 'h-12 w-12 border-4',
};

const LoadingSpinner = ({ size = 'md', className = '', label = 'Loading' }) => {
  const sizeClasses = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-live="polite">
      <div
        className={`rounded-full animate-spin ${sizeClasses}`}
        style={{
          borderColor: 'rgba(0, 99, 178, 0.2)',
          borderTopColor: 'rgb(0, 99, 178)',
        }}
        aria-label={label}
      />
    </div>
  );
};

export default LoadingSpinner;
