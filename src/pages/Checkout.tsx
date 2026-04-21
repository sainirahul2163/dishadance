import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Clock,
  Lock,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

type PlanKey = "starter" | "pro";

const PLANS: Record<PlanKey, {
  name: string;
  sessions: string;
  timings: string;
  price: string;
}> = {
  starter: {
    name: "Starter Plan — 4 Sessions",
    sessions: "4 sessions per month",
    timings: "Every Sunday • 4–5 PM or 8:15–9:15 PM",
    price: "₹699",
  },
  pro: {
    name: "Pro Plan — 8 Sessions",
    sessions: "8 sessions per month",
    timings: "Sat + Sun • 5:30–6:30 PM or 7–8 PM",
    price: "₹1,199",
  },
};

const checkoutSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Naam kam se kam 2 letters ka ho" })
    .max(80, { message: "Naam 80 letters se kam ho" }),
  email: z
    .string()
    .trim()
    .email({ message: "Sahi email daalo" })
    .max(150, { message: "Email bahut lamba hai" }),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{10,15}$/, { message: "Sahi WhatsApp number daalo" }),
});

const Checkout = () => {
  const [params] = useSearchParams();
  const planKey: PlanKey = params.get("plan") === "pro" ? "pro" : "starter";
  const plan = PLANS[planKey];
  const { toast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", whatsapp: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkoutSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const message = encodeURIComponent(
      `Hi Disha Ma'am! 💃\n\nMujhe seat book karni hai:\n\n📦 Plan: ${plan.name}\n💰 Price: ${plan.price}\n\n👤 Name: ${result.data.name}\n📧 Email: ${result.data.email}\n📱 WhatsApp: ${result.data.whatsapp}\n\nPayment link bhejo please!`,
    );
    const url = `https://wa.me/917719917935?text=${message}`;

    toast({
      title: "Seat hold ho gayi! 🎉",
      description: "WhatsApp pe payment link bhej rahe hain...",
    });

    const planParam = planKey === "pro" ? "8" : "4";
    const priceParam = planKey === "pro" ? "1199" : "699";
    const nameParam = encodeURIComponent(result.data.name);
    const thankYouUrl = `/thank-you?plan=${planParam}&price=${priceParam}&name=${nameParam}`;

    // Open WhatsApp in a new tab, then route the user to the Thank You page
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      navigate(thankYouUrl);
      setSubmitting(false);
    }, 600);
  };

  const trustBadges = useMemo(
    () => [
      { icon: ShieldCheck, label: "Secure Payment" },
      { icon: MessageCircle, label: "WhatsApp Support" },
      { icon: Star, label: "500+ Happy Students" },
      { icon: Sparkles, label: "Trusted Academy" },
    ],
    [],
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Top trust bar */}
      <header className="border-b border-border/60 bg-white/90 backdrop-blur sticky top-0 z-30">
        <div className="container max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="font-display font-black text-base md:text-lg text-foreground hover:opacity-80 transition-opacity"
          >
            Disha's <span className="text-magenta italic">Dance</span> Academy 💃
          </Link>
          <div className="flex items-center gap-1.5 text-[11px] md:text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            100% Secure Checkout
          </div>
        </div>
      </header>

      <div className="container max-w-2xl mx-auto px-4 py-6 md:py-10 space-y-6">
        {/* Order summary */}
        <section className="rounded-2xl border-2 border-primary/15 bg-gradient-card p-5 md:p-6 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-magenta">
              Order Summary
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              ✅ Spot Confirmed on Payment
            </span>
          </div>
          <h2 className="font-display font-black text-xl md:text-2xl text-foreground leading-tight">
            {plan.name}
          </h2>
          <Link
            to="/#pricing"
            className="inline-block mt-1 text-xs text-muted-foreground underline hover:text-magenta transition-colors"
          >
            🔄 Change Plan
          </Link>
          <div className="mt-3 space-y-1.5 text-sm text-foreground/80">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-magenta" />
              {plan.sessions}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-magenta" />
              {plan.timings}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-primary/10 flex items-end justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-display font-black text-4xl md:text-5xl text-magenta">
              {plan.price}
            </span>
          </div>
        </section>

        {/* Form */}
        <section className="rounded-2xl bg-white border border-border p-5 md:p-6 shadow-soft">
          <h3 className="font-display font-black text-xl md:text-2xl text-foreground">
            Apni Details Bharo 📝
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Sirf 30 seconds mein done! Class link WhatsApp pe milega.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={update("name")}
                placeholder="Aapka poora naam"
                maxLength={80}
                className="h-12 focus-visible:ring-magenta focus-visible:ring-4 focus-visible:ring-offset-0 focus-visible:border-magenta transition-all"
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="Aapka email"
                maxLength={150}
                className="h-12 focus-visible:ring-magenta focus-visible:ring-4 focus-visible:ring-offset-0 focus-visible:border-magenta transition-all"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input
                id="whatsapp"
                type="tel"
                inputMode="tel"
                value={form.whatsapp}
                onChange={update("whatsapp")}
                placeholder="Aapka WhatsApp number"
                maxLength={15}
                className="h-12 focus-visible:ring-magenta focus-visible:ring-4 focus-visible:ring-offset-0 focus-visible:border-magenta transition-all"
              />
              {errors.whatsapp && <p className="text-xs text-destructive">{errors.whatsapp}</p>}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full bg-gradient-primary hover:opacity-95 text-primary-foreground font-bold rounded-full py-7 text-base md:text-lg shadow-pink animate-pulse-glow h-auto"
            >
              {submitting ? "Processing..." : "🎉 Meri Seat Pakki Karo!"}
            </Button>

            <p className="text-center text-xs md:text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-full py-2 px-3">
              ⚠️ Sirf limited seats available hain! Abhi secure karo.
            </p>

            <ul className="space-y-1.5 text-xs text-muted-foreground pt-2">
              <li className="flex items-center gap-2"><Lock className="w-3.5 h-3.5 text-emerald-600" /> 100% Secure Payment via Razorpay</li>
              <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-amber-500" /> Class link turant WhatsApp pe milega</li>
              <li className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-magenta" /> Expert instructor — Disha Ma'am</li>
            </ul>
          </form>
        </section>

        {/* Trust badges */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 justify-center text-[11px] md:text-xs font-semibold text-foreground/80 bg-muted border border-border rounded-full px-3 py-2"
            >
              <Icon className="w-3.5 h-3.5 text-magenta" />
              {label}
            </div>
          ))}
        </section>

        {/* Testimonial */}
        <section className="rounded-2xl bg-gradient-card border border-primary/15 p-5 md:p-6 shadow-soft">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-white font-display font-black text-xl flex-shrink-0">
              P
            </div>
            <div>
              <p className="text-sm md:text-base text-foreground/85 leading-relaxed">
                "Maine socha nahi tha ghar baithe itna accha dance seekh sakti hoon! Disha Ma'am bahut accha sikhati hain. ⭐⭐⭐⭐⭐"
              </p>
              <p className="mt-2 text-xs md:text-sm font-semibold text-magenta">
                — Priya S., Mumbai
              </p>
            </div>
          </div>
        </section>

        <a
          href="https://wa.me/917719917935"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-[11px] text-muted-foreground hover:text-magenta transition-colors flex items-center justify-center gap-1.5 pt-2"
        >
          <Smartphone className="w-3 h-3" /> WhatsApp support: +91 77199 17935
        </a>
      </div>
    </main>
  );
};

export default Checkout;
