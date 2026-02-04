import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-disney-blue/5 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-disney-blue/20 mb-4">404</div>
          <div className="text-6xl mb-4">🏰</div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg text-slate-600 mb-8">
          Oops! It looks like you've wandered off the map. This page doesn't exist in the Disney Food Quest realm.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-disney-blue hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            <Home size={20} />
            Back to Home
          </Link>
          <Link
            to="/browse"
            className="inline-flex items-center justify-center gap-2 border-2 border-disney-blue text-disney-blue hover:bg-disney-blue hover:text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Browse Food
          </Link>
        </div>

        {/* Fun Message */}
        <p className="text-sm text-slate-500 mt-12">
          Pro tip: Try exploring the app to find amazing Disney food items!
        </p>
      </div>
    </div>
  );
}
