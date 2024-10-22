import React from 'react';
import Head from 'next/head';

const TermsOfService: React.FC = () => {
    const effectiveDate = 'October 22, 2024'; 

  return (
    <>
      <Head>
        <title>Terms of Service - Helios Gallery</title>
        <meta name="description" content="Read the terms of service for Helios Gallery." />
      </Head>
      <div className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">
          <strong>Effective Date:</strong> {effectiveDate}
        </p>

        <p className="mb-6">
          Welcome to <strong>Helios Gallery</strong>, the celestial hub where AI artistry, cheeky humor,
          and a sprinkle of Greek mythology converge! Before you embark on this epic journey of creativity
          and fun, we must lay down some ground rules (the gods demand it). So, grab a comfy seat on Mount
          Olympus, and let&apos;s get started.
        </p>

        <blockquote className="mb-6 italic text-gray-600 border-l-4 border-gray-300 pl-4">
          Sua sponte: Hereto within, both for consideration and exemplification in abeyance subject to
          adjudication pro se and terms whereto superseding justifies the underscore until res judicata
          thusly relieving ALL satisfactions. All parties hereby agree to wit habeas corpus.
        </blockquote>

        <p className="mb-6">
          Now that we&apos;ve appeased the ancient legal deities, let&apos;s get down to the nitty-gritty.
        </p>

        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-6">
          By accessing or using Helios Gallery (the &quot;Service&quot;), you agree to be bound by these Terms of
          Service (&quot;Terms&quot;). If you disagree with any part of the terms, then you may not access the
          Service (but you&apos;ll be missing out on a lot of fun).
        </p>

        <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
        <p className="mb-6">
          You must be at least 13 years old (or a demigod of equivalent maturity) to use our Service. By
          using Helios Gallery, you represent and warrant that you meet the eligibility requirements.
        </p>

        <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Registration:</strong> You may need to create an account to access some features.
            Please provide accurate information (no, Zeus123 is not a valid email).
          </li>
          <li>
            <strong>Security:</strong> You&apos;re responsible for safeguarding your account. If your pet
            Cerberus learns your password and wreaks havoc, that&apos;s on you.
          </li>
          <li>
            <strong>Responsibility:</strong> Any activities that occur under your account are your
            responsibility. Use your powers wisely.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">4. Use of the Service</h2>
        <h3 className="text-xl font-semibold mb-2">a. AI Image Generator</h3>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Content Creation:</strong> Feel free to create AI-generated masterpieces or
            monstrosities (we don&apos;t judge).
          </li>
          <li>
            <strong>Ownership:</strong> You own the rights to the images you create. However, we reserve
            the right to feature your hilarious failed attempts in our Hall of Fame (with credit, of
            course).
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">b. Joke Bot</h3>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Laughter Not Guaranteed:</strong> Our Joke Bot tries its best, but humor is subjective.
            No refunds for bad puns.
          </li>
          <li>
            <strong>Contribution:</strong> Got a joke that&apos;s better? Share it with us! But be prepared for
            the possibility that we might groan.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">c. Rock-Paper-Scissors Game</h3>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Fair Play:</strong> Our AI is programmed to play fair (most of the time). If it wins,
            it&apos;s pure skill—or maybe just luck.
          </li>
          <li>
            <strong>Good Sportsmanship:</strong> Enjoy the witty banter. It&apos;s all in good fun. No throwing
            virtual rocks at the AI.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">5. User Conduct</h2>
        <p className="mb-6">You agree not to use the Service to:</p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Break the Law:</strong> No illegal activities, unless you&apos;re stealing fire from the
            gods (but even then, proceed with caution).
          </li>
          <li>
            <strong>Harass Others:</strong> Be kind. Even Apollo had bad days.
          </li>
          <li>
            <strong>Spam:</strong> No one likes spam—unless it&apos;s bacon-flavored.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">6. Content Guidelines</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Appropriate Content:</strong> Keep it PG-13. Remember, even demigods have standards.
          </li>
          <li>
            <strong>Intellectual Property:</strong> Only upload content you have the rights to. Don&apos;t make
            Hermes come after you for theft.
          </li>
          <li>
            <strong>Reporting:</strong> If you see something that violates these Terms, let us know. We&apos;ll
            handle it faster than Hermes on a caffeine high.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property Rights</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Our Rights:</strong> We own Helios Gallery, including all the code, design, and witty
            remarks (except those generated by the AI—we blame it for any bad jokes).
          </li>
          <li>
            <strong>Your Rights:</strong> You retain all rights to the content you create and upload. Just
            remember, with great power comes great responsibility.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
        <p className="mb-6">
          We reserve the right to suspend or terminate your access to the Service at any time, without
          notice, for any reason—including, but not limited to, a breach of these Terms or insulting the
          dignity of our AI.
        </p>

        <h2 className="text-2xl font-semibold mb-4">9. Disclaimers</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>&quot;As Is&quot; Service:</strong> Helios Gallery is provided &quot;as is&quot; and &quot;as available.&quot; We
            make no warranties, except that our AI will occasionally be sassy.
          </li>
          <li>
            <strong>No Liability:</strong> We&apos;re not liable for any damages, losses, or Greek tragedies
            that may occur from using our Service.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
        <p className="mb-6">
          In no event shall Helios Gallery, nor its creators, be liable for any indirect, incidental,
          special, consequential, or punitive damages, including without limitation, loss of profits,
          data, use, or goodwill (even if we&apos;ve been naughty and were advised of the possibility of such
          damages).
        </p>

        <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
        <p className="mb-6">
          These Terms shall be governed and construed in accordance with the laws of the State of
          California, without regard to its conflict of law provisions. Any disputes will be settled in
          the courts of Sunnyville, CA, unless Zeus intervenes.
        </p>

        <h2 className="text-2xl font-semibold mb-4">12. Changes to the Terms</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Notification:</strong> We&apos;ll notify you of any changes by posting the new Terms here.
          </li>
          <li>
            <strong>Acceptance of Changes:</strong> By continuing to access or use our Service after
            revisions become effective, you agree to be bound by the updated Terms.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
        <p className="mb-6">
          Questions? Concerns? Epic poems you&apos;d like to share? Reach out!
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:email@helios.gallery" className="text-blue-500 underline">
              email@helios.gallery
            </a>
          </li>
        </ul>

        <hr className="my-6" />

        <p className="italic">
          Thank you for being a part of Helios Gallery. May your creativity shine brighter than Apollo&apos;s
          chariot! Now, go forth and dazzle the world—or at least give our AI a run for its money.
        </p>
      </div>
    </>
  );
};

export default TermsOfService;