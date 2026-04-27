import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  Clock,
  MessageCircle,
  PartyPopper,
  Smartphone,
  Sparkles,
} from "lucide-react";

type PlanKey = "starter" | "pro" | "unknown";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const PLAN_DETAILS: Record<Exclude<PlanKey, "unknown">, { name: string; sessions: string; defaultPrice: string }> = {
  starter: { name: "Starter Plan — 4 Sessions", sessions: "4 sessions per month", defaultPrice: "699" },
  pro: { name: "Pro Plan — 8 Sessions", sessions: "8 sessions per month", defaultPrice: "1199" },
};

const SUNDAY_SLOTS_STARTER = ["4:00 PM – 5:00 PM", "8:15 PM – 9:15 PM"];
const WEEKEND_SLOTS_PRO = ["5:30 PM – 6:30 PM", "7:00 PM – 8:00 PM"];

const Confetti = () => {
  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        duration: 2.5 + Math.random() * 2,
        color: ["bg-magenta", "bg-pink-400", "bg-emerald-400", "bg-amber-400", "bg-primary"][i % 5],
        size: 6 + Math.random() * 8,
      })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden z-40">
      {pieces.map((p) => (
        <span
          key={p.id}
          className={`absolute top-[-20px] ${p.color} rounded-sm opacity-90`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const SlotCard = ({ time }: { time: string }) => (
  <div className="flex items-center gap-3 rounded-xl border-2 border-primary/15 bg-white p-4 shadow-soft hover:border-magenta/40 hover:shadow-pink transition-all">
    <div className="w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center text-white flex-shrink-0">
      <Clock className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xs uppercase tracking-wider font-bold text-magenta">Slot</p>
      <p className="font-display font-black text-lg text-foreground leading-tight">{time}</p>
    </div>
  </div>
);

const ThankYou = () => {
  const [params] = useSearchParams();
  const rawPlan = params.get("plan");
  // Support both new (4 / 8) and legacy (starter / pro) values
  let planKey: PlanKey;
  if (rawPlan === "4" || rawPlan === "starter") planKey = "starter";
  else if (rawPlan === "8" || rawPlan === "pro") planKey = "pro";
  else planKey = "unknown";

  const planMeta = planKey === "unknown" ? null : PLAN_DETAILS[planKey];
  const rawPrice = params.get("price")?.replace(/[^\d]/g, "");
  const priceDisplay = rawPrice
    ? `₹${Number(rawPrice).toLocaleString("en-IN")}`
    : planMeta
      ? `₹${Number(planMeta.defaultPrice).toLocaleString("en-IN")}`
      : "—";
  const planName = planMeta?.name ?? "Your Dance Plan";
  const planSessions = planMeta?.sessions ?? "Sessions per month";
  const studentName = params.get("name")?.trim() || "";

  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (planKey === "unknown") return;
    const priceNum = rawPrice
      ? Number(rawPrice)
      : Number(PLAN_DETAILS[planKey].defaultPrice);
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "Purchase", {
        value: priceNum,
        currency: "INR",
        content_name: planKey === "pro" ? "Pro Plan" : "Starter Plan",
      });
    }
  }, [planKey, rawPrice]);

  const waLink =
    "https://wa.me/917719917935?text=Hi%20Disha%20Ma'am!%20Maine%20payment%20kar%20di%20hai.%20Mujhe%20is%20slot%20mein%20add%20karo%3A%20";

  return (
    <main className="min-h-screen bg-background">
      {showConfetti && <Confetti />}

      {/* Top bar */}
      <header className="border-b border-border/60 bg-white/90 backdrop-blur sticky top-0 z-30">
        <div className="container max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="font-display font-black text-base md:text-lg text-foreground hover:opacity-80 transition-opacity"
          >
            Disha's <span className="text-magenta italic">Dance</span> Academy 💃
          </Link>
          <div className="flex items-center gap-1.5 text-[11px] md:text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Payment Confirmed
          </div>
        </div>
      </header>

      <div className="container max-w-2xl mx-auto px-4 py-8 md:py-12 space-y-6">
        {/* Success */}
        <section className="text-center space-y-4 animate-fade-in">
          <div className="mx-auto w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center animate-scale-in shadow-soft">
            <CheckCircle2 className="w-14 h-14 text-emerald-500" strokeWidth={2.5} />
          </div>
          <h1 className="font-display font-black text-2xl md:text-4xl text-foreground leading-tight">
            🎉 Payment Successful!
            <br />
            <span className="text-magenta">
              {studentName ? `Welcome ${studentName}!` : "Welcome to Disha's Dance Academy!"}
            </span>
          </h1>
          <p className="text-base md:text-lg text-foreground/75 max-w-lg mx-auto">
            Aapki seat pakki ho gayi hai! Hum bahut excited hain aapko welcome karne ke liye 💃
          </p>
        </section>

        {/* Plan card */}
        <section className="rounded-2xl border-2 border-emerald-200 bg-gradient-card p-5 md:p-6 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-magenta">
              Your Plan
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Payment Confirmed
            </span>
          </div>
          <h2 className="font-display font-black text-xl md:text-2xl text-foreground leading-tight">
            {planName}
          </h2>
          <p className="text-sm text-foreground/70 mt-1">{planSessions}</p>
          <div className="mt-4 pt-4 border-t border-primary/10 flex items-end justify-between">
            <span className="text-sm text-muted-foreground">Amount Paid</span>
            <span className="font-display font-black text-3xl md:text-4xl text-emerald-600">
              {priceDisplay}
            </span>
          </div>
        </section>

        {/* Schedule */}
        <section className="rounded-2xl bg-white border border-border p-5 md:p-6 shadow-soft">
          <h3 className="font-display font-black text-xl md:text-2xl text-foreground">
            Apna Slot Dekho 📅
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Neeche apna plan ka schedule dekho aur jo slot suit kare woh humein WhatsApp karo!
          </p>

          <div className="mt-5">
            {planKey === "starter" ? (
              <Tabs defaultValue="sunday" className="w-full">
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="sunday">Sunday</TabsTrigger>
                </TabsList>
                <TabsContent value="sunday" className="mt-4 space-y-3 animate-fade-in">
                  {SUNDAY_SLOTS_STARTER.map((s) => (
                    <SlotCard key={s} time={s} />
                  ))}
                </TabsContent>
              </Tabs>
            ) : (
              <Tabs defaultValue="saturday" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="saturday">Saturday</TabsTrigger>
                  <TabsTrigger value="sunday">Sunday</TabsTrigger>
                </TabsList>
                <TabsContent value="saturday" className="mt-4 space-y-3 animate-fade-in">
                  {WEEKEND_SLOTS_PRO.map((s) => (
                    <SlotCard key={`sat-${s}`} time={s} />
                  ))}
                </TabsContent>
                <TabsContent value="sunday" className="mt-4 space-y-3 animate-fade-in">
                  {WEEKEND_SLOTS_PRO.map((s) => (
                    <SlotCard key={`sun-${s}`} time={s} />
                  ))}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="rounded-2xl bg-gradient-card border-2 border-primary/15 p-5 md:p-6 shadow-soft">
          <h3 className="font-display font-black text-xl md:text-2xl text-foreground">
            Next Step 👇
          </h3>
          <div className="mt-3 rounded-xl bg-amber-50 border-2 border-amber-200 p-4 text-sm md:text-base text-foreground/85 leading-relaxed">
            Jo slot aapko suit kare, woh humein WhatsApp kar ke batao. Hum aapko us group mein add kar denge! 😊
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold py-4 text-base md:text-lg shadow-lg transition-colors animate-pulse-glow"
          >
            <MessageCircle className="w-5 h-5" />
            📱 DM Us on WhatsApp
          </a>
        </section>

        {/* What happens next */}
        <section className="rounded-2xl bg-white border border-border p-5 md:p-6 shadow-soft">
          <h3 className="font-display font-black text-xl md:text-2xl text-foreground mb-4">
            Aage Kya Hoga? 🤔
          </h3>
          <ol className="space-y-4">
            {[
              { icon: "✅", title: "Step 1: Payment confirmed", desc: "Done!", done: true },
              { icon: "📱", title: "Step 2: WhatsApp pe apna slot bhejo", desc: "Choose your preferred timing" },
              { icon: "🎓", title: "Step 3: Google Meet group mein add", desc: "Hum aapko group mein add karenge" },
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
                    step.done
                      ? "bg-emerald-50 border-2 border-emerald-300"
                      : "bg-pink-50 border-2 border-primary/20"
                  }`}
                >
                  {step.icon}
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-display font-bold text-base text-foreground leading-tight">
                    {step.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Bottom */}
        <section className="text-center space-y-2 pt-2">
          <p className="text-sm text-muted-foreground">Koi problem? Humse baat karo</p>
          <a
            href="https://wa.me/917719917935"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-magenta hover:underline"
          >
            <Smartphone className="w-4 h-4" /> +91 77199 17935
          </a>
          <p className="text-[11px] text-muted-foreground pt-3">
            Disha's Dance Academy • © 2025 All rights reserved
          </p>
        </section>
      </div>
    </main>
  );
};

export default ThankYou;
