# FinTrack — marketing site + auth callback

Static site for [FinTrack](https://apps.apple.com/app/idTBD), a personal
finance iPhone app. The site does two things:

1. Acts as the landing page (App Store link, privacy policy, support contact).
2. Receives Supabase email-confirmation deep links at `/auth/callback` and
   forwards them to the iOS app via the `fintrack://` URL scheme.

> The site never talks to Supabase directly. Supabase has already verified
> the email by the time the user lands here — the callback page simply
> hands the `code` (or token fragment) off to the iOS app.

---

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 3
- Static export (`output: "export"`) — no server runtime
- Deploys to Vercel, Netlify, Cloudflare Pages, or any static host

## Run locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Build for production

```bash
npm run build
# → static files in ./out
```

Deploy the contents of `out/` to any static host. On Vercel/Netlify, just
point at this repo — the platforms auto-detect Next.js and run
`next build` for you.

---

## Pages

| Route             | Purpose                                                    |
| ----------------- | ---------------------------------------------------------- |
| `/`               | Landing page: tagline, App Store badge, feature bullets    |
| `/auth/callback`  | Supabase email-confirmation handoff to the iOS app         |
| `/privacy`        | Privacy policy (linked from the App Store listing)         |
| `/support`        | FAQ + support email                                        |

---

## The `/auth/callback` page

When a user taps the verification link in their Supabase confirmation
email, Supabase verifies the token server-side and redirects to:

```
https://fintrack.app/auth/callback?code=<uuid>
```

or, for the implicit flow, with a URL fragment:

```
https://fintrack.app/auth/callback#access_token=...&refresh_token=...
```

The page:

1. Parses `?code=...` first, then falls back to the `#access_token` /
   `#refresh_token` fragment.
2. On iOS, auto-redirects to
   `fintrack://auth-callback?code=...` (or `#access_token=...&refresh_token=...`)
   after a 1 s delay.
3. Shows **Open FinTrack** + **Download on the App Store** buttons as a
   fallback after ~1.5 s.
4. On non-iOS devices, shows an "iOS only" message and hides the Open
   button.
5. If the link is malformed (no `code`, no token fragment), shows a clear
   error pointing to support.

No external requests are made — everything is client-side string parsing
plus a `window.location.href` redirect to the custom scheme.

The deep-link scheme `fintrack://` and host `auth-callback` are already
registered in the iOS app's `Info.plist` and handled in
`FinTrackApp.onOpenURL`, which calls `supabase.auth.session(from: url)`
to complete sign-in inside the app.

---

## Supabase Dashboard configuration

In **Authentication → URL Configuration** in your Supabase project:

- **Site URL** — set to:
  ```
  https://fintrack.app
  ```
  (replace with your real production domain)

- **Redirect URLs** — allow-list each environment you use:
  ```
  https://fintrack.app/auth/callback
  http://localhost:3000/auth/callback
  ```
  Add a preview-deploy URL too if you use Vercel previews (e.g.
  `https://*.vercel.app/auth/callback`).

In **Authentication → Email Templates → Confirm signup**, make sure the
`{{ .ConfirmationURL }}` placeholder is used. Supabase will substitute it
with a URL pointing at your Site URL + `/auth/callback?code=...`.

> Heads up: Supabase's email templates default to a `?token_hash=...&type=...`
> link that hits Supabase first, which then redirects to your Site URL.
> If you've customized the template to point straight at
> `{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=signup`,
> the callback page won't know how to handle that — adjust the template
> back to `{{ .ConfirmationURL }}` so Supabase issues the `?code=...`
> redirect we expect.

---

## Replacing the placeholders

Before launch:

- [ ] **App Store URL** — update `APP_STORE_URL` in
      `components/AppStoreBadge.tsx` with your real App Store link.
- [ ] **Hero mockup** — replace `public/app-mockup.svg` with a real
      App Store screenshot (e.g. 1170×2532 PNG, scaled down).
- [ ] **Domain** — search-replace `fintrack.app` if you use a different
      domain (e.g. `getfintrack.com`). Touches `app/layout.tsx`'s
      `metadataBase` and this README.
- [ ] **Privacy policy** — `PRIVACY.md` and `/privacy` mirror each
      other. Have a lawyer review before App Store submission.
- [ ] **Support email** — `SUPPORT_EMAIL` in `components/Footer.tsx`.
      Currently `kholmuhammadov@gmail.com`.

---

## Acceptance checklist

- [x] `npm run dev` serves the site locally.
- [x] `npm run build` produces a static `out/` directory.
- [x] `/auth/callback?code=test123` on iOS redirects to
      `fintrack://auth-callback?code=test123`.
- [x] Same URL on desktop shows the "iOS only" message.
- [x] All pages except `/auth/callback` render without JavaScript.
- [x] Auto dark mode via `prefers-color-scheme`.

---

## Future: Universal Links (recommended once live)

The current `fintrack://` custom scheme triggers an "Open in app?" prompt
on iOS. Switching to Universal Links removes that prompt and makes the
link open the app silently. It requires:

1. An `apple-app-site-association` JSON file served from
   `https://fintrack.app/.well-known/apple-app-site-association`.
2. The `applinks:fintrack.app` Associated Domain entitlement added to
   the iOS app.
3. A `.onContinueUserActivity(NSUserActivityTypeBrowsingWeb)` handler in
   `FinTrackApp` that extracts the `code` query parameter.

Ship the current version first, then upgrade.
