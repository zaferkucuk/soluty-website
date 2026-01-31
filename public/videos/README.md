# Hero Videos

This folder contains video assets for the hero section.

## Expected Files

- `hero.webm` - Main hero video (WebM format, preferred)
- `hero.mp4` - Fallback for Safari/iOS (optional)
- `hero-poster.webp` - Static poster image (shown before video loads)

## Video Specifications

Based on Wealthsimple reference:

| Property | Value |
|----------|-------|
| Resolution | 2048x1280 (16:10 aspect ratio) |
| Duration | 3-5 seconds |
| Format | WebM (VP9) or MP4 (H.265/HEVC) |
| Size | Aim for < 2MB |
| Behavior | Autoplay, muted, no loop |

## How to Add Video

1. Download or create your video
2. Place it in this folder as `hero.webm`
3. Update `page.tsx` to include `videoSrc="/videos/hero.webm"`

## Test Video Source (Wealthsimple)

For testing purposes, you can download Wealthsimple's hero video:

```
https://videos.ctfassets.net/v44fuld738we/4O1t1pDSSIGGfpEYqXKyrR/e8939ff9d413bdb3864e10178ef80921/homeHeroEvoEvergreen-en-CA.webm
```

**Note:** This is only for internal testing. Do not use in production.
