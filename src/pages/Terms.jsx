import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
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
            Terms of Service
          </h1>
          <p className="text-slate-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Agreement to Terms</h2>
            <p>
              By accessing and using the Disney Food Quest application, you accept and agree to be
              bound by the terms and provision of this agreement. If you do not agree to abide by
              the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information
              or software) on Disney Food Quest for personal, non-commercial transitory viewing only.
              This is the grant of a license, not a transfer of title, and under this license you
              may not:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Disclaimer</h2>
            <p>
              The materials on Disney Food Quest are provided on an 'as is' basis. Disney Food Quest
              makes no warranties, expressed or implied, and hereby disclaims and negates all other
              warranties including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or non-infringement of intellectual
              property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitations</h2>
            <p>
              In no event shall Disney Food Quest or its suppliers be liable for any damages
              (including, without limitation, damages for loss of data or profit, or due to business
              interruption) arising out of the use or inability to use the materials on Disney Food
              Quest, even if we or our authorized representative has been notified orally or in
              writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Accuracy of Materials</h2>
            <p>
              The materials appearing on Disney Food Quest could include technical, typographical,
              or photographic errors. Disney Food Quest does not warrant that any of the materials
              on the Service are accurate, complete, or current. We may make changes to the
              materials contained on our Service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Links</h2>
            <p>
              Disney Food Quest has not reviewed all of the sites linked to its website and is not
              responsible for the contents of any such linked site. The inclusion of any link does
              not imply endorsement by us of the site. Use of any such linked website is at the
              user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Modifications</h2>
            <p>
              Disney Food Quest may revise these terms of service for the website at any time
              without notice. By using this website, you are agreeing to be bound by the then
              current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at
              support@disneyfoodquest.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
