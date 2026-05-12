import { useRef, useState } from "react";

interface TestimonialVideoProps {
  src: string;
  poster?: string;
  title?: string;
}

export const TestimonialVideo = ({ src, poster, title }: TestimonialVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div
      onClick={togglePlay}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "9 / 16",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#000",
        cursor: "pointer",
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        title={title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "16px",
        }}
        playsInline
        preload="auto"
        controls={false}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      {!playing && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.25)",
            borderRadius: "16px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#E91E8C">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};