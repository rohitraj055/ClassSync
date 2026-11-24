# ClassSync

**One campus. One connected experience.**

ClassSync is a campus platform initially being developed for IIEST Shibpur, bringing academic resources, attendance, timetables, deadlines and student coordination into one place.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase Auth (`@supabase/ssr`)
- Git and GitHub

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Local Authentication Setup

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in
`.env.local`. Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` to use an
explicit local callback origin. In Supabase Authentication > URL Configuration, allow
`http://localhost:3000/auth/confirm` as a redirect URL. Email confirmation and
the Before User Created hook should remain enabled.

## Testing Authentication

1. Run `npm run dev`, then open http://localhost:3000/signup.
2. Register with an `@students.iiests.ac.in` address, a name, and a password of
   at least 8 characters. The form rejects other email domains and mismatched
   passwords.
3. Open the verification email and follow its link. Complete the academic
   profile setup form before continuing to the student dashboard.
4. Choose **Sign out**, then log in at http://localhost:3000/login with the
   verified student account. Incomplete profiles are sent to `/profile/setup`.
5. To check expired/invalid-link handling, open
   http://localhost:3000/auth/confirm without a verification code; it returns
   to login with a helpful message.

## Project Status

The initial student dashboard and Supabase student authentication flow are in
place.

Upcoming modules:
- Attendance management
- Timetable
- Notes and resources
- Community
- Assignment deadlines

## Vision

Build a unified digital campus experience, starting with IIEST Shibpur and eventually expanding to other institutions.