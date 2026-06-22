"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { APP_STORE_URL } from "@/components/AppStoreBadge";
import { SUPPORT_EMAIL } from "@/components/Footer";

type Status = "loading" | "ready" | "missing";

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<Status>("loading");
  const [deepLink, setDeepLink] = useState<string | null>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Platform detection
    const ua =
      typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
    const iOSLike = /iPhone|iPad|iPod/i.test(ua);
    setIsIOS(iOSLike);

    // Parse `?code=...` first, then fall back to `#access_token=...&refresh_token=...`
    const search = new URLSearchParams(window.location.search);
    const code = search.get("code");

    let link: string | null = null;

    if (code) {
      link = `fintrack://auth-callback?code=${encodeURIComponent(code)}`;
    } else if (window.location.hash) {
      const hash = window.location.hash.startsWith("#")
        ? window.location.hash.slice(1)
        : window.location.hash;
      const frag = new URLSearchParams(hash);
      const access = frag.get("access_token");
      const refresh = frag.get("refresh_token");
      if (access && refresh) {
        link = `fintrack://auth-callback#${hash}`;
      }
    }

    if (!link) {
      setStatus("missing");
      return;
    }

    setDeepLink(link);

    // Auto-redirect to the iOS app after a brief delay so the platform
    // sheet has time to render and the user sees the "Verifying…" UI.
    const autoOpen = window.setTimeout(() => {
      if (iOSLike) {
        window.location.href = link!;
      }
    }, 1000);

    const showReady = window.setTimeout(() => setStatus("ready"), 1500);

    return () => {
      window.clearTimeout(autoOpen);
      window.clearTimeout(showReady);
    };
  }, []);

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <noscript>
        <p className="text-sm muted">
          JavaScript is required to complete email confirmation. Please
          re-open this link in a browser with JavaScript enabled, or
          contact{" "}
          <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </noscript>

      {status === "loading" && (
        <div className="fade-in flex flex-col items-center text-center gap-4">
          <div className="spinner" aria-hidden />
          <h1 className="text-xl font-semibold">Verifying your email…</h1>
          <p className="muted text-sm">Hang tight, almost done.</p>
        </div>
      )}

      {status === "ready" && (
        <div className="fade-in flex flex-col items-center text-center gap-5">
          <CheckBadge />
          <h1 className="text-2xl font-semibold tracking-tight">
            Email confirmed
          </h1>
          {isIOS ? (
            <>
              <p className="muted text-[15px] max-w-sm">
                Tap{" "}
                <span className="font-medium text-current">Open FinTrack</span>{" "}
                if the app didn't open automatically.
              </p>
              <div className="mt-2 flex flex-col gap-3 w-full">
                {deepLink && (
                  <a
                    href={deepLink}
                    className="block w-full text-center rounded-xl px-5 py-3 font-medium text-white"
                    style={{ background: "var(--brand)" }}
                  >
                    Open FinTrack
                  </a>
                )}
                <a
                  href={APP_STORE_URL}
                  className="block w-full text-center rounded-xl px-5 py-3 font-medium border hairline"
                >
                  Download on the App Store
                </a>
              </div>
            </>
          ) : (
            <>
              <p className="muted text-[15px] max-w-sm">
                FinTrack is iOS-only. Open this link on your iPhone, or
                download the app from the App Store on iOS.
              </p>
              <a
                href={APP_STORE_URL}
                className="mt-2 block w-full text-center rounded-xl px-5 py-3 font-medium border hairline"
              >
                Download on the App Store
              </a>
            </>
          )}
        </div>
      )}

      {status === "missing" && (
        <div className="fade-in text-center">
          <h1 className="text-xl font-semibold">
            We couldn't read your confirmation link
          </h1>
          <p className="mt-3 muted text-[15px]">
            Try opening it again from your email, or contact{" "}
            <a
              className="underline"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </div>
      )}

      <div className="mt-12 text-center">
        <Link href="/" className="text-sm muted hover:text-current">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

function CheckBadge() {
  return (
    <div
      aria-hidden
      className="grid place-items-center size-12 rounded-full"
      style={{ background: "rgba(10,132,255,0.12)", color: "var(--brand)" }}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path
          d="M5 12.5l4.5 4.5L19 7.5"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
