import type { Metadata } from "next";
import { SUPPORT_EMAIL } from "@/components/Footer";
import { APP_STORE_URL } from "@/components/AppStoreBadge";

export const metadata: Metadata = {
  title: "Support — FinTrack",
  description: "Help, FAQs, and how to contact FinTrack support.",
};

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "How do I import data from another app?",
    a: (
      <>
        Direct import isn't supported yet. For now you can add transactions
        manually — they only take a few taps each. We're considering CSV
        import for a future update; let us know what format you'd like to
        see at{" "}
        <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
          {SUPPORT_EMAIL}
        </a>
        .
      </>
    ),
  },
  {
    q: "How do I export my data?",
    a: (
      <>
        Export features will arrive in a future update. In the meantime,
        all of your data lives in your account and stays available to you
        across devices via secure cloud sync.
      </>
    ),
  },
  {
    q: "What happens if I lose my phone?",
    a: (
      <>
        If you signed in with email or Apple Sign-In, your data is safely
        stored in your account. Install FinTrack on your new iPhone, sign
        back in, and your records will sync down automatically.
      </>
    ),
  },
  {
    q: "How do I reset my PIN?",
    a: (
      <>
        You can reset your local PIN from the{" "}
        <strong>Settings</strong> screen inside the app.
      </>
    ),
  },
  {
    q: "How do I delete my account?",
    a: (
      <>
        Open the app, go to <strong>Settings → Account</strong>, and choose
        Delete Account. This permanently removes your account and all
        associated financial records from our systems. If you can't access
        the app, email us at{" "}
        <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
          {SUPPORT_EMAIL}
        </a>{" "}
        and we'll handle the request.
      </>
    ),
  },
];

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Support</h1>
      <p className="mt-3 muted">
        Questions, bug reports, or feature requests — we'd love to hear
        from you.
      </p>

      <div className="mt-8 surface hairline border rounded-xl p-5 flex flex-col gap-2">
        <p className="text-sm muted">Email us</p>
        <a
          className="font-medium brand text-lg"
          href={`mailto:${SUPPORT_EMAIL}`}
        >
          {SUPPORT_EMAIL}
        </a>
        <p className="text-sm muted mt-2">
          Include your iPhone model, iOS version, and a short description
          of the issue. Screenshots help a lot.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">
          Frequently asked
        </h2>
        <ul className="mt-5 divide-y hairline border-y">
          {FAQS.map(({ q, a }) => (
            <li key={q} className="py-5">
              <h3 className="font-medium">{q}</h3>
              <p className="mt-2 muted leading-relaxed text-[15px]">{a}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12">
        <a
          href={APP_STORE_URL}
          className="inline-flex items-center text-sm brand underline"
        >
          View FinTrack on the App Store →
        </a>
      </div>
    </div>
  );
}
