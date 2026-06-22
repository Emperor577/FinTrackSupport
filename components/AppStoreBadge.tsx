// TODO: replace href with the real App Store URL once the app is approved.
export const APP_STORE_URL = "https://apps.apple.com/app/idTBD";

export default function AppStoreBadge({
  className = "",
}: {
  className?: string;
}) {
  return (
    <a
      href={APP_STORE_URL}
      className={`inline-flex items-center gap-3 rounded-xl bg-black text-white px-5 py-3 hover:opacity-90 transition-opacity ${className}`}
      aria-label="Download FinTrack on the App Store"
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M16.365 1.43c0 1.14-.43 2.27-1.14 3.07-.77.86-2.02 1.52-3.05 1.45-.13-1.1.42-2.27 1.13-3.04.78-.86 2.1-1.5 3.06-1.48zM20.6 17.36c-.34.78-.5 1.13-.94 1.83-.6.96-1.45 2.16-2.5 2.17-.94.01-1.18-.61-2.45-.61-1.27 0-1.54.6-2.48.62-1.05.03-1.85-1.04-2.45-2-1.7-2.7-1.88-5.86-.83-7.55.74-1.18 1.9-1.86 3-1.86 1.12 0 1.82.61 2.74.61.9 0 1.45-.61 2.74-.61 1.04 0 2.14.56 2.92 1.53-2.57 1.4-2.15 5.07.25 5.87z" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-wider opacity-80">
          Download on the
        </span>
        <span className="text-base font-semibold -mt-0.5">App Store</span>
      </span>
    </a>
  );
}
