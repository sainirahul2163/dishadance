import { useRef, useState } from "react";
import { Play } from "lucide-react";

interface HeroVideoProps {
  src: string;
}

export const HeroVideo = ({ src }: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };

  return (
    <div
      className="relative mx-auto block w-full overflow-hidden shadow-pink ring-1 ring-primary/20"
      style={{ aspectRatio: "1 / 1", maxWidth: 560, borderRadius: 16, background: "#000" }}
    >
      <video
        ref={videoRef}
        src={src}
        className="block h-full w-full object-cover"
        playsInline
        preload="metadata"
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        aria-label={playing ? "Pause video" : "Play video"}
        onClick={togglePlay}
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          playing ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-2xl transition-transform hover:scale-110 md:h-24 md:w-24">
          <Play className="ml-1 h-8 w-8 fill-primary text-primary md:h-10 md:w-10" />
        </span>
      </button>
    </div>
  );
};