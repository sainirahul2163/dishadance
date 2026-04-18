import { Play } from "lucide-react";

interface VideoPlaceholderProps {
  label?: string;
  aspect?: "video" | "portrait";
  variant?: "hero" | "card";
}

export const VideoPlaceholder = ({
  label = "Play Video",
  aspect = "video",
  variant = "card",
}: VideoPlaceholderProps) => {
  const aspectClass = aspect === "portrait" ? "aspect-[9/16]" : "aspect-video";
  const sizeClass = variant === "hero" ? "w-24 h-24" : "w-16 h-16";

  return (
    <div
      className={`${aspectClass} relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 via-[hsl(var(--magenta))] to-[hsl(300_70%_40%)] shadow-pink group cursor-pointer`}
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 70%, white 1px, transparent 1px)',
        backgroundSize: '40px 40px, 60px 60px'
      }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <div className={`${sizeClass} rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform animate-pulse-glow`}>
          <Play className={`${variant === "hero" ? "w-10 h-10" : "w-6 h-6"} text-primary fill-primary ml-1`} />
        </div>
        <span className="text-white font-semibold text-sm md:text-base px-4 text-center drop-shadow-lg">
          {label}
        </span>
      </div>

      {/* Corner sparkles */}
      <div className="absolute top-4 right-4 text-2xl">✨</div>
      <div className="absolute bottom-4 left-4 text-2xl">💃</div>
    </div>
  );
};
