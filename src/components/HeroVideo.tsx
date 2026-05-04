import { useRef, useState } from "react";

interface HeroVideoProps {
  src?: string;
}

const DEFAULT_SRC =
  "https://res.cloudinary.com/dj9ps03eq/video/upload/v1777886579/Dishadance.com_1st_review_y3gddm.mp4";

export const HeroVideo = ({ src = DEFAULT_SRC }: HeroVideoProps) => {
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
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "560px",
        margin: "0 auto",
        aspectRatio: "1 / 1",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#000",
        cursor: "pointer",
      }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "16px",
        }}
        playsInline
        preload="metadata"
        controls={false}
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
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#E91E8C">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};