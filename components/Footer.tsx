import Link from "next/link";

export const SUPPORT_EMAIL = "kholmuhammadov@gmail.com";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="border-t hairline mt-20">
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm muted">
        <p>© {year} FinTrack. All rights reserved.</p>
        <ul className="flex items-center gap-5">
          <li>
            <Link href="/privacy" className="hover:text-current">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/support" className="hover:text-current">
              Support
            </Link>
          </li>
          <li>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="hover:text-current"
            >
              {SUPPORT_EMAIL}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
