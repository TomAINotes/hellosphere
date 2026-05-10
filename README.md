# SHON FLASH — Cinematic Scroll Hero

Premium scroll-driven video hero built with Next.js 14, Tailwind CSS, Framer Motion, and GSAP ScrollTrigger.

## 1. Place your video

Copy your downloaded video into the project's `public/` folder and rename it to `hero-video.mp4`:

```bash
# From Windows PowerShell
copy "C:\Users\dadon\Downloads\hero-video.mp4" "C:\Users\dadon\Projects\shon-flash-hero\public\hero-video.mp4"
```

> The video MUST live in `public/` (not anywhere else on your disk). Browsers cannot scrub a video served from `C:\Users\...` — Next.js serves files in `public/` at the root URL, so `public/hero-video.mp4` becomes `/hero-video.mp4`.

To use a different file later, just replace `public/hero-video.mp4` or change the `VIDEO_SRC` constant at the top of `components/HeroScrollVideo.tsx`.

## 2. Install dependencies

```bash
cd C:\Users\dadon\Projects\shon-flash-hero
npm install
```

## 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 4. Customize

All text, colors, and the video path are edit-points clearly marked at the top of `components/HeroScrollVideo.tsx`:

```ts
const VIDEO_SRC   = "/hero-video.mp4";
const BRAND       = "SHON FLASH";
const HEADLINE    = "Experience the Sound. Feel the Moment.";
const SUBHEADLINE = "Premium DJ experiences for weddings, private events…";
const CTA_PRIMARY   = { label: "Book an Event",        href: "#book"  };
const CTA_SECONDARY = { label: "Watch the Experience", href: "#watch" };
```

## How the scroll effect works

1. Outer wrapper is `300vh` tall — it gives ScrollTrigger room to scrub through.
2. Inner stage is `100vh` and **pinned** for the whole 300vh of scroll.
3. As you scroll, ScrollTrigger maps progress (0 → 1) onto the video's `currentTime`, so the video plays in sync with the scrollbar.
4. A timeline fades in the brand → headline → subheadline → CTAs → glass info cards at staggered points along that progress, then fades the whole hero out before the next section appears.

## Tech notes

- The video is muted, `playsInline`, and `preload="auto"` — required for scrubbing on iOS/Safari.
- ScrollTrigger waits for the `loadedmetadata` event before reading `video.duration`.
- All GSAP animations live inside `useGSAP()` with a scoped ref, so cleanup is automatic on unmount.
