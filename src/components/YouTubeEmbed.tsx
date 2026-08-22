import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  /** YouTube video id — the `rXoIt_SVlOQ` in youtu.be/rXoIt_SVlOQ. */
  youtubeId: string;
  title: string;
  className?: string;
}

/**
 * Click-to-load YouTube facade.
 *
 * Renders a thumbnail until the viewer presses play, then swaps in the iframe.
 * The player is ~1MB of third-party JS, and this video appears on three
 * surfaces (demos, cockpit, portfolio) — loading it eagerly would cost the
 * homepage its Lighthouse budget for a video most visitors never start.
 *
 * Uses youtube-nocookie.com so no tracking cookie is set until playback.
 */
const YouTubeEmbed = ({ youtubeId, title, className = "" }: YouTubeEmbedProps) => {
  const [playing, setPlaying] = useState(false);
  // maxresdefault is absent on some uploads; hqdefault always exists.
  const [thumb, setThumb] = useState(
    `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`
  );

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={`w-full h-full border-0 ${className}`}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className={`group/yt relative w-full h-full block bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      <img
        src={thumb}
        alt=""
        loading="lazy"
        onError={() =>
          setThumb(`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`)
        }
        className="w-full h-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-background/20 transition-colors group-hover/yt:bg-background/10">
        <span className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg transition-transform group-hover/yt:scale-110">
          <Play className="w-7 h-7 text-primary-foreground fill-current ml-1" />
        </span>
      </span>
    </button>
  );
};

export default YouTubeEmbed;
