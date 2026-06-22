import Image from "next/image";
import AppStoreBadge from "@/components/AppStoreBadge";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-20 grid gap-12 sm:grid-cols-2 sm:items-center">
        <div className="fade-in">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
            Dead-simple finance
            <br />
            for iPhone.
          </h1>
          <p className="mt-5 text-lg muted max-w-md">
            Track expenses, income, and loans in seconds. Offline-first,
            with secure cloud sync.
          </p>
          <div className="mt-8">
            <AppStoreBadge />
          </div>

          <ul className="mt-10 space-y-3 text-[15px]">
            <li className="flex gap-3">
              <Dot />
              <span>
                <strong className="font-medium">Fast logging</strong>{" "}
                <span className="muted">
                  — record income, expenses, and loans in a few taps.
                </span>
              </span>
            </li>
            <li className="flex gap-3">
              <Dot />
              <span>
                <strong className="font-medium">Private by design</strong>{" "}
                <span className="muted">
                  — Face ID and PIN protection, no ads, no trackers.
                </span>
              </span>
            </li>
            <li className="flex gap-3">
              <Dot />
              <span>
                <strong className="font-medium">Sync when you want</strong>{" "}
                <span className="muted">
                  — optional encrypted cloud sync across your devices.
                </span>
              </span>
            </li>
          </ul>
        </div>

        <div className="flex justify-center sm:justify-end">
          {/* TODO: replace with a real App Store screenshot once available. */}
          <Image
            src="/app-mockup.svg"
            alt="FinTrack app shown on an iPhone"
            width={320}
            height={640}
            priority
            className="w-[260px] sm:w-[300px] h-auto select-none"
          />
        </div>
      </section>
    </div>
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      className="mt-2 inline-block size-1.5 rounded-full bg-current opacity-50 shrink-0"
    />
  );
}
