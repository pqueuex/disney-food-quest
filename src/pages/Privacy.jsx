import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-disney-blue hover:text-blue-700 font-semibold mb-8 transition"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
            <p>
              Disney Food Quest ("we", "us", "our", or "Company") operates the Disney Food Quest
              application. This page informs you of our policies regarding the collection, use, and
              disclosure of personal data when you use our Service and the choices you have
              associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Information Collection</h2>
            <p>We collect information you provide directly to us, such as when you:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Create an account (email, username, password)</li>
              <li>Use the app features (food captures, badges earned)</li>
              <li>Interact with other users (leaderboard data)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Use of Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Provide, maintain, and improve our Service</li>
              <li>Send you technical notices and support messages</li>
              <li>Display your profile and achievements</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures designed to protect
              personal information against unauthorized access, alteration, disclosure, or destruction.
              However, no method of transmission over the internet or electronic storage is completely
              secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at
              support@disneyfoodquest.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
