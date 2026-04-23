import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { VideoPlaceholder } from "@/components/dance/VideoPlaceholder";
import { Button } from "@/components/ui/button";
import heroDancer from "@/assets/hero-dancer.jpg";
import {
  Calendar,
  Check,
  GraduationCap,
  Instagram,
  Music2,
  Smartphone,
  Sparkles,
  Star,
} from "lucide-react";

const trustStats = [
  { icon: GraduationCap, label: "500+", sub: "Happy Students 🎓" },
  { icon: Music2, label: "Bollywood + Hip-Hop", sub: "Multiple Styles 💃" },
  { icon: Smartphone, label: "100% Online", sub: "via Google Meet 📱" },
  { icon: Star, label: "Disha Ma'am", sub: "Expert Instructor ⭐" },
];

const features = [
  "100% online classes via Google Meet — koi travel nahi!",
  "Bollywood, Hip-Hop aur multiple dance styles seekho",
  "Women of all ages aur kids ke liye perfect",
  "Koi prior experience nahi chahiye — bilkul beginner friendly",
  "Apne ghar ke comfort se seekho 🏡",
  "Flexible weekend timings — busy schedule mein bhi fit",
];

const testimonials = [
  {
    name: "Seema",
    quote: "Disha ma'am ke saath dance karna bahut maza aata hai! 💃",
    videoSrc: "https://drive.google.com/file/d/1ivp_B8RVQX6hC7om6mkAlm8UjZ3yGUi_/preview",
  },
  {
    name: "Mansi",
    quote: "Mere bachche ko Bollywood dance bahut pasand aaya 🌟",
    videoSrc: "https://drive.google.com/file/d/1ivp_B8RVQX6hC7om6mkAlm8UjZ3yGUi_/preview",
  },
  {
    name: "Diya",
    quote: "Ghar baithe seekhna itna easy hoga, socha nahi tha! ❤️",
    videoSrc: "https://drive.google.com/file/d/1ivp_B8RVQX6hC7om6mkAlm8UjZ3yGUi_/preview",
  },
];

const scrollToPricing = () => {
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
};

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);
  const showStickyCta = !heroVisible && !footerVisible;

  useEffect(() => {
    const hero = heroRef.current;
    const footer = footerRef.current;
    if (!hero || !footer) return;
    const heroObs = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    const footerObs = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    heroObs.observe(hero);
    footerObs.observe(footer);
    return () => {
      heroObs.disconnect();
      footerObs.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* ============== HERO ============== */}
      <section ref={heroRef} className="relative bg-gradient-hero pt-8 pb-16 md:pt-14 md:pb-24">
        {/* Floating decorations */}
        <div className="absolute top-20 left-4 text-4xl md:text-6xl animate-float-slow opacity-70">💃</div>
        <div className="absolute top-32 right-6 text-4xl md:text-6xl animate-float-slow opacity-70" style={{ animationDelay: "1.5s" }}>🎵</div>
        <div className="absolute bottom-20 left-10 text-3xl md:text-5xl animate-float-slow opacity-60" style={{ animationDelay: "3s" }}>✨</div>

        <div className="container max-w-5xl mx-auto px-4 relative">
          {/* Mini badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-primary/20 shadow-soft">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">For Women & Kids 💃</span>
            </div>
          </div>

          {/* Brand */}
          <h1 className="text-center text-4xl sm:text-5xl md:text-7xl text-foreground mb-3 leading-[1.05]">
            Disha's <span className="text-magenta italic">Dance</span> Academy
          </h1>

          <p className="text-center text-xl md:text-3xl font-semibold text-foreground/80 mb-2">
            Ghar Baithe Seekho Dance! 💃
          </p>
          <p className="text-center text-sm md:text-base text-muted-foreground mb-10">
            (Learn Dance from Home — Bollywood, Hip-Hop & More)
          </p>

          {/* VSL VIDEO */}
          <div className="max-w-3xl mx-auto mb-8 relative">
            <div className="absolute -top-4 -left-4 w-20 h-20 md:w-28 md:h-28 hidden md:block">
              <img src={heroDancer} alt="Disha dance teacher" width={1024} height={1024}
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-pink animate-wiggle" />
            </div>
            <div className="w-full overflow-hidden shadow-pink aspect-video bg-black" style={{ borderRadius: 16 }}>
              <iframe
                className="w-full h-full border-0"
                src="https://drive.google.com/file/d/1Tml0QCgjVSr5DCufq0NfLjqKAZG08Ugj/preview"
                title="Disha Ma'am Ka Message"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3">
            <Button
              onClick={scrollToPricing}
              size="lg"
              className="bg-gradient-primary hover:opacity-95 text-primary-foreground text-lg md:text-xl font-bold px-10 md:px-14 py-7 md:py-8 rounded-full shadow-pink hover:scale-105 transition-all animate-pulse-glow h-auto"
            >
              Abhi Join Karo 💖
            </Button>
            <p className="text-xs md:text-sm text-muted-foreground">
              ⚡ Limited seats — Aaj hi book karo!
            </p>
          </div>
        </div>
      </section>

      {/* ============== TRUST BAR ============== */}
      <section className="py-10 md:py-14 bg-white border-y border-primary/10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trustStats.map((s, i) => (
              <div
                key={i}
                className="text-center p-5 md:p-6 rounded-2xl bg-gradient-card border border-primary/10 hover:border-primary/40 hover:-translate-y-1 transition-all shadow-soft"
              >
                <div className="inline-flex w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-primary items-center justify-center mb-3 shadow-pink">
                  <s.icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                </div>
                <div className="font-display font-bold text-base md:text-xl text-foreground leading-tight">
                  {s.label}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== ABOUT ============== */}
      <section className="py-16 md:py-24 bg-blush relative overflow-hidden">
        <div className="absolute -top-10 -right-10 text-9xl opacity-10">💃</div>
        <div className="container max-w-5xl mx-auto px-4 relative">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold mb-2 text-sm md:text-base uppercase tracking-wider">
              ✨ How It Works
            </p>
            <h2 className="text-3xl md:text-5xl text-foreground mb-3">
              Classes Kaise Hoti Hain?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground italic">
              (How do classes work?)
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-soft border border-primary/10">
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-6">
              Hi sweetie! 👋 Disha's Dance Academy mein aapka swagat hai. Yahan hum sab kuch{" "}
              <span className="font-semibold text-magenta">100% online</span> sikhate hain — bas aapka phone ya laptop chahiye!
              Saare classes <span className="font-semibold text-magenta">Google Meet</span> par hote hain, toh aap apne ghar ke comfort se hi seekh sakte hain.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-blush/50">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />
                  </div>
                  <span className="text-sm md:text-base text-foreground/80">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============== TESTIMONIALS ============== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold mb-2 text-sm md:text-base uppercase tracking-wider">
              🌟 Real Stories
            </p>
            <h2 className="text-3xl md:text-5xl text-foreground mb-3">
              Hamari Students Ki Baatein
            </h2>
            <p className="text-base md:text-lg text-muted-foreground italic">
              (What our students say)
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="group">
                <div className="w-full overflow-hidden rounded-xl shadow-pink bg-black aspect-[9/16]">
                  <iframe
                    src={t.videoSrc}
                    title={`${t.name} testimonial`}
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
                <div className="mt-4 text-center">
                  <div className="font-display font-bold text-lg text-foreground">{t.name}</div>
                  <p className="text-sm md:text-base text-muted-foreground mt-1 italic">
                    "{t.quote}"
                  </p>
                  <div className="flex justify-center gap-0.5 mt-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== SCHEDULE ============== */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold mb-2 text-sm md:text-base uppercase tracking-wider">
              📅 Timings
            </p>
            <h2 className="text-3xl md:text-5xl text-foreground mb-3">Class Schedule</h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Apne hisaab se timing chuno 🕐
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 4 Sessions */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft border-2 border-primary/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-blush flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-magenta" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">4 Sessions Plan</h3>
                  <p className="text-sm text-muted-foreground">Every Sunday</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-blush">
                  <span className="font-semibold text-foreground">🌞 Sunday</span>
                  <span className="font-bold text-magenta">4:00 – 5:00 PM</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-blush">
                  <span className="font-semibold text-foreground">🌙 Sunday</span>
                  <span className="font-bold text-magenta">8:15 – 9:15 PM</span>
                </div>
              </div>
            </div>

            {/* 8 Sessions */}
            <div className="bg-gradient-popular rounded-3xl p-6 md:p-8 shadow-pink border-2 border-[hsl(var(--gold))] relative">
              <div className="absolute -top-3 right-6 bg-gradient-gold text-foreground text-xs font-bold px-3 py-1 rounded-full shadow-gold">
                ⭐ POPULAR
              </div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white">8 Sessions Plan</h3>
                  <p className="text-sm text-white/80">Every Saturday & Sunday</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/15 backdrop-blur">
                  <span className="font-semibold text-white">🎵 Sat & Sun</span>
                  <span className="font-bold text-white">5:30 – 6:30 PM</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/15 backdrop-blur">
                  <span className="font-semibold text-white">💃 Sat & Sun</span>
                  <span className="font-bold text-white">7:00 – 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== PRICING ============== */}
      <section id="pricing" className="py-16 md:py-24 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold mb-2 text-sm md:text-base uppercase tracking-wider">
              💰 Pricing
            </p>
            <h2 className="text-3xl md:text-5xl text-foreground mb-3">
              Plans & Pricing
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Apna Plan Chuno! 💖
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Starter */}
            <div className="bg-gradient-card rounded-3xl p-6 md:p-8 border-2 border-primary/15 shadow-soft hover:-translate-y-1 transition-all">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-1 rounded-full bg-blush text-magenta text-xs font-bold uppercase tracking-wide mb-3">
                  Starter Plan
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-black text-foreground mb-1">
                  4 Sessions
                </h3>
                <p className="text-sm text-muted-foreground">Per Month</p>
              </div>

              <div className="text-center mb-6 py-4 border-y border-primary/10">
                <div className="font-display font-black text-5xl md:text-6xl text-magenta">
                  ₹2
                </div>
                <p className="text-sm text-muted-foreground mt-1">/ month</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Every Sunday classes",
                  "Choose: 4–5 PM or 8:15–9:15 PM",
                  "Bollywood + basics",
                  "Google Meet sessions",
                  "Beginner friendly 🌸",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm md:text-base text-foreground/80">
                    <Check className="w-5 h-5 text-magenta flex-shrink-0 mt-0.5" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                className="w-full bg-gradient-primary hover:opacity-95 text-primary-foreground font-bold rounded-full py-6 text-base shadow-pink"
              >
                <Link to="/checkout?plan=starter">Abhi Join Karo 💃</Link>
              </Button>
            </div>

            {/* Pro Popular */}
            <div className="bg-gradient-popular rounded-3xl p-6 md:p-8 border-2 border-[hsl(var(--gold))] shadow-pink hover:-translate-y-1 transition-all relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-gold text-foreground text-xs font-bold px-5 py-1.5 rounded-full shadow-gold whitespace-nowrap">
                ⭐ MOST POPULAR
              </div>

              <div className="text-center mb-6 mt-2">
                <div className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-bold uppercase tracking-wide mb-3">
                  Pro Plan
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-1">
                  8 Sessions
                </h3>
                <p className="text-sm text-white/80">Per Month</p>
              </div>

              <div className="text-center mb-6 py-4 border-y border-white/20">
                <div className="font-display font-black text-5xl md:text-6xl text-white">
                  ₹4
                </div>
                <p className="text-sm text-white/80 mt-1">/ month</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Saturday + Sunday — dono din!",
                  "Choose: 5:30–6:30 PM or 7–8 PM",
                  "Bollywood + Hip-Hop + more",
                  "Personal attention 💕",
                  "Best value — save more!",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm md:text-base text-white">
                    <Check className="w-5 h-5 text-[hsl(var(--gold))] flex-shrink-0 mt-0.5" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                className="w-full bg-white hover:bg-white/95 text-magenta font-bold rounded-full py-6 text-base shadow-gold"
              >
                <Link to="/checkout?plan=pro">Abhi Join Karo 💖</Link>
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            💬 Koi confusion hai? WhatsApp par message karo — hum help karenge!
          </p>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer ref={footerRef} className="bg-gradient-to-br from-[hsl(330_60%_20%)] to-[hsl(320_70%_15%)] text-white py-12 md:py-16">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <h3 className="font-display font-black text-3xl md:text-4xl mb-2">
            Disha's <span className="text-[hsl(var(--gold))] italic">Dance</span> Academy
          </h3>
          <p className="text-white/80 mb-8 text-sm md:text-base">
            For Women & Kids Only 💃 — Ghar baithe seekho!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <a
              href="https://wa.me/917719917935"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[hsl(140_70%_45%)] hover:bg-[hsl(140_70%_40%)] text-white font-bold transition-all hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
              WhatsApp Karo
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold transition-all hover:scale-105"
            >
              <Instagram className="w-5 h-5" />
              Instagram Follow
            </a>
          </div>

          {/* Footer nav links */}
          <div className="border-t border-white/15 pt-8">
            <nav className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-x-8 gap-y-3 text-sm md:text-base mb-6">
              <Link to="/" className="text-white/90 hover:text-[hsl(var(--gold))] transition-colors">🏠 Home</Link>
              <Link to="/terms" className="text-white/90 hover:text-[hsl(var(--gold))] transition-colors">📋 Terms & Conditions</Link>
              <Link to="/privacy" className="text-white/90 hover:text-[hsl(var(--gold))] transition-colors">🔒 Privacy Policy</Link>
              <Link to="/contact" className="text-white/90 hover:text-[hsl(var(--gold))] transition-colors">📞 Contact Us</Link>
            </nav>

            <div className="text-xs md:text-sm text-white/60 space-y-1">
              <p>© 2025 Disha's Dance Academy. All rights reserved.</p>
              <p>Made with 💃 for Women & Kids</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA — hidden while hero is in view */}
      <div
        className={`fixed bottom-4 left-4 right-4 z-50 md:hidden transition-all duration-300 ${
          showStickyCta
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-hidden={!showStickyCta}
      >
        <Button
          onClick={scrollToPricing}
          size="lg"
          className="w-full bg-gradient-primary text-primary-foreground font-bold rounded-full py-6 shadow-pink animate-pulse-glow"
        >
          💃 Abhi Join Karo
        </Button>
      </div>
    </div>
  );
};

export default Index;
