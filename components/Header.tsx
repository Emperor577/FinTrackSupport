import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b hairline">
      <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold tracking-tight text-base"
          aria-label="FinTrack home"
        >
          FinTrack
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link href="/" className="muted hover:text-current">
                Home
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="muted hover:text-current">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/support" className="muted hover:text-current">
                Support
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
