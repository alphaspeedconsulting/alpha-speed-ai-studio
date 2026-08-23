import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import YouTubeEmbed from "../YouTubeEmbed";
import {
  DEMO_VIDEOS,
  PORTFOLIO_ITEMS,
  COCKPIT_VIDEO_IDS,
  getDemoVideoByYouTubeId,
} from "@/lib/constants";

describe("YouTubeEmbed", () => {
  it("shows a play control and no iframe until the viewer asks for it", () => {
    const { container } = render(
      <YouTubeEmbed youtubeId="abc123" title="Test video" />
    );
    expect(
      screen.getByRole("button", { name: /play video: test video/i })
    ).toBeInTheDocument();
    // The player is ~1MB of third-party JS — it must not load on render.
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("swaps in a cookie-less player once played", () => {
    const { container } = render(
      <YouTubeEmbed youtubeId="abc123" title="Test video" />
    );
    fireEvent.click(screen.getByRole("button", { name: /play video/i }));

    const iframe = container.querySelector("iframe");
    expect(iframe).not.toBeNull();
    expect(iframe?.getAttribute("src")).toContain(
      "youtube-nocookie.com/embed/abc123"
    );
  });
});

describe("video media sources", () => {
  /**
   * `DemoVideo.src` is optional so YouTube-hosted entries can omit it. That
   * makes it possible to declare a video with no media at all, which would
   * render <video src="undefined"> and fail silently in production.
   */
  it("gives every demo video exactly one media source", () => {
    for (const video of DEMO_VIDEOS) {
      const sources = [video.src, video.youtubeId].filter(Boolean);
      expect(sources, `"${video.title}" must have one media source`).toHaveLength(1);
    }
  });

  it("resolves every cockpit and portfolio video id to a demo entry", () => {
    const referenced = [
      ...COCKPIT_VIDEO_IDS,
      ...PORTFOLIO_ITEMS.flatMap((item) => item.youtubeIds ?? []),
    ];
    for (const id of referenced) {
      expect(getDemoVideoByYouTubeId(id), `${id} has no DEMO_VIDEOS entry`).toBeDefined();
    }
  });

  it("keeps a single featured video, so the carousel cannot duplicate it", () => {
    expect(DEMO_VIDEOS.filter((video) => video.featured)).toHaveLength(1);
  });

  it("references only real YouTube ids", () => {
    const ids = [
      ...DEMO_VIDEOS.map((video) => video.youtubeId),
      ...PORTFOLIO_ITEMS.flatMap((item) => item.youtubeIds ?? []),
    ].filter(Boolean);

    expect(ids.length).toBeGreaterThan(0);
    for (const id of ids) {
      expect(id).toMatch(/^[A-Za-z0-9_-]{11}$/);
    }
  });
});
