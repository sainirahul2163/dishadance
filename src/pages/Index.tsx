import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroDancer from "@/assets/hero-dancer.jpg";
import dishaInstructor from "@/assets/disha-instructor.jpg";
import { HeroVideo } from "@/components/HeroVideo";
import { TestimonialVideo } from "@/components/TestimonialVideo";
import {
  Calendar,
  Check,
  Instagram,
  Lock,
  MessageCircle,
  Sparkles,
  Star,
} from "lucide-react";

const credibilityStats = [
  {
    icon: "👩‍🎓",
    number: "500+",
    label: "Happy Students",
    sub: "Ladies aur bachche already seekh rahe hain",
  },
  {
    icon: "⭐",
    number: "4.9/5",
    label: "Student Rating",
    sub: "Real students ke real reviews",
  },
  {
    icon: "💃",
    number: "5+ Years",
    label: "Teaching Experience",
    sub: "Disha ma'am ka dance teaching journey",
  },
  {
    icon: "🎵",
    number: "10+",
    label: "Dance Styles",
    sub: "Bollywood, Hip-Hop, Semi-Classical & more",
  },
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
    name: "Narayani",
    quote: "Disha ma'am ke saath dance karna bahut maza aata hai! 💃",
    videoSrc:
      "https://res.cloudinary.com/dj9ps03eq/video/upload/v1778576754/testimonials_2_ncouts.mp4",
    poster:
      "https://res.cloudinary.com/dj9ps03eq/video/upload/so_0/v1778576754/testimonials_2_ncouts.jpg",
  },
  {
    name: "Sakshi",
    quote: "Mere bachche ko Bollywood dance bahut pasand aaya 🌟",
    videoSrc:
      "https://res.cloudinary.com/dj9ps03eq/video/upload/v1778576755/testimonials_fn67xb.mp4",
    poster:
      "https://res.cloudinary.com/dj9ps03eq/video/upload/so_0/v1778576755/testimonials_fn67xb.jpg",
  },
  {
    name: "Malika",
    quote: "Ghar baithe seekhna itna easy hoga, socha nahi tha! ❤️",
    videoSrc:
      "https://res.cloudinary.com/dj9ps03eq/video/upload/v1778576756/testimonials_3_hjwdfv.mp4",
    poster:
      "https://res.cloudinary.com/dj9ps03eq/video/upload/so_0/v1778576756/testimonials_3_hjwdfv.jpg",
  },
];

const writtenTestimonials = [
  { quote: "Pehli baar dance try kiya, bahut confidence mila!", name: "Pooja", city: "Jaipur" },
  { quote: "Meri 10-year-old beti ko bahut pasand aa raha hai.", name: "Meena", city: "Lucknow" },
  { quote: "Ghar baithe class itna easy hoga, socha nahi tha.", name: "Rekha", city: "Indore" },
];

const instructorPoints = [
  "5+ years teaching Bollywood & Hip-Hop",
  "500+ students trained online",
  "Specialized in beginner-friendly choreography",
];

const faqs = [
  {
    q: "Mujhe dance ka koi experience nahi, kya main join kar sakti hoon?",
    a: "Bilkul! Hamari classes 100% beginner-friendly hain. Disha Ma'am step-by-step sikhati hain, ekdum basics se.",
  },
  {
    q: "Class kaise attend karoongi?",
    a: "Payment ke baad aapko WhatsApp par Google Meet link mil jayega. Bas click karo aur join ho jao — phone ya laptop, dono se chalega.",
  },
  {
    q: "Agar class miss ho gayi toh?",
    a: "No worries! Har class ki recording 48 hours ke liye available hoti hai. Apne time pe dekh sakti ho.",
  },
  {
    q: "Kids ke liye kya age group hai?",
    a: "8 saal se 16 saal tak ke bachche easily join kar sakte hain. Mummy bhi saath mein enjoy kar sakti hain!",
  },
  {
    q: "Payment ke baad kya hoga?",
    a: "Payment confirm hote hi WhatsApp par welcome message milega, batch details, aur Google Meet link. Sab kuch 5 minutes ke andar.",
  },
  {
    q: "Refund milega kya agar pasand nahi aaya?",
    a: "Hum confident hain ki aapko mazaa aayega! Agar phir bhi koi issue ho, WhatsApp par message karo — hum help karenge.",
  },
];

const scrollToPricing = () => {
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
};

const scrollToFaq = () => {
  document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
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
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    const footerObs = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    heroObs.observe(hero);
    footerObs.observe(footer);
    return () => {
      heroObs.disconnect();
      footerObs.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden pb-[88px] md:pb-0">
      {/* ============== STICKY URGENCY BAR ============== */}
      <div className="sticky top-0 z-50 bg-[hsl(330_60%_20%)] text-white text-center text-xs md:text-sm font-medium flex items-center justify-center h-9 md:h-10 px-4 animate-marquee-pulse shadow-md">
        🔥 April Batch Filling Fast — Only 12 Seats Left!
      </div>

      {/* ============== HERO ============== */}
      <section ref={heroRef} className="relative bg-gradient-hero pt-8 pb-14 md:pt-14 md:pb-20">
        <div className="absolute top-20 left-4 text-4xl md:text-6xl animate-float-slow opacity-70">💃</div>
        <div className="absolute top-32 right-6 text-4xl md:text-6xl animate-float-slow opacity-70" style={{ animationDelay: "1.5s" }}>🎵</div>
        <div className="absolute bottom-20 left-10 text-3xl md:text-5xl animate-float-slow opacity-60" style={{ animationDelay: "3s" }}>✨</div>

        <div className="container max-w-5xl mx-auto px-4 relative">
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-primary/20 shadow-soft">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">For Women & Kids 💃</span>
            </div>
          </div>

          <h1 className="text-center text-4xl sm:text-5xl md:text-7xl text-foreground mb-3 leading-[1.05]">
            Disha's <span className="text-magenta italic">Dance</span> Academy
          </h1>

          <p className="text-center text-xl md:text-3xl font-semibold text-foreground/80 mb-2">
            Ghar Baithe Seekho Dance! 💃
          </p>
          <p className="text-center text-base md:text-base text-muted-foreground mb-8">
            (Learn Dance from Home — Bollywood, Hip-Hop & More)
          </p>

          {/* VSL VIDEO — 1:1 square, centered, max 560px */}
          <div className="mb-5 px-4 md:px-0">
            <HeroVideo src="https://res.cloudinary.com/dj9ps03eq/video/upload/v1777886579/Dishadance.com_1st_review_y3gddm.mp4" />
          </div>

          {/* Trust badges row */}
          <div className="mb-6 -mx-4 md:mx-0 overflow-x-auto md:overflow-visible no-scrollbar">
            <div className="flex md:justify-center items-center gap-2 md:gap-3 px-4 md:px-0 min-w-max md:min-w-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/90 backdrop-blur border border-primary/15 text-xs md:text-sm font-semibold text-foreground shadow-soft whitespace-nowrap">
                ✅ 500+ Happy Students
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/90 backdrop-blur border border-primary/15 text-xs md:text-sm font-semibold text-foreground shadow-soft whitespace-nowrap">
                ⭐ 4.9/5 Rating
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/90 backdrop-blur border border-primary/15 text-xs md:text-sm font-semibold text-foreground shadow-soft whitespace-nowrap">
                🔒 Secure Payment
              </span>
            </div>
          </div>

          {/* Primary CTA directly under video */}
          <div className="flex flex-col items-center gap-2 mx-auto" style={{ maxWidth: 480 }}>
            <Button
              asChild
              size="lg"
              className="w-full bg-gradient-primary hover:opacity-95 text-primary-foreground text-base md:text-lg font-bold px-6 py-7 md:py-8 rounded-full shadow-pink hover:scale-[1.02] transition-all animate-pulse-glow h-auto min-h-[56px]"
            >
              <Link to="/checkout?plan=starter">Abhi Join Karo — ₹699 se shuru 💖</Link>
            </Button>
            <p className="text-xs md:text-sm text-muted-foreground text-center">
              ⚡ Instant access after payment • 🔒 Razorpay secure
            </p>
          </div>
        </div>
      </section>

      {/* ============== CREDIBILITY STATS (4 cards) ============== */}
      <section className="py-8 md:py-12 bg-white border-y border-primary/10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-primary font-semibold mb-2 text-xs md:text-sm uppercase tracking-wider">
              📊 Numbers That Matter
            </p>
            <h2 className="text-2xl md:text-4xl text-foreground mb-2">
              Kyun Choose Karein Disha's Dance Academy?
            </h2>
            <p className="text-sm md:text-base text-muted-foreground italic">
              (Why hundreds of women trust us)
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {credibilityStats.map((s, i) => (
              <div
                key={i}
                className="text-center p-5 md:p-6 rounded-2xl bg-white border border-primary/15 shadow-soft transition-all duration-300 md:hover:scale-[1.03] md:hover:shadow-pink md:hover:border-primary/40"
              >
                <div className="mx-auto mb-3 md:mb-4 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-primary shadow-pink flex items-center justify-center text-2xl md:text-3xl">
                  <span aria-hidden="true">{s.icon}</span>
                </div>
                <div className="font-display font-black text-3xl md:text-[40px] leading-tight text-foreground mb-1">
                  {s.number}
                </div>
                <div className="text-[11px] md:text-xs uppercase tracking-wider font-semibold text-primary/80 mb-2">
                  {s.label}
                </div>
                <p className="text-[13px] md:text-sm text-muted-foreground leading-snug">
                  {s.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== MEET DISHA MA'AM ============== */}
      <section className="py-16 md:py-24 bg-blush relative overflow-hidden">
        <div className="absolute -bottom-10 -left-10 text-9xl opacity-10">💃</div>
        <div className="container max-w-5xl mx-auto px-4 relative">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold mb-2 text-sm md:text-base uppercase tracking-wider">
              👩‍🏫 Your Instructor
            </p>
            <h2 className="text-3xl md:text-5xl text-foreground mb-3">Milo Disha Ma'am Se</h2>
            <p className="text-base md:text-lg text-muted-foreground italic">(Meet your dance teacher)</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-primary blur-xl opacity-50" />
                <div className="relative rounded-full p-1.5 bg-gradient-primary shadow-pink">
                  <img
                    src={dishaInstructor}
                    alt="Disha Sharma — Dance Instructor"
                    width={320}
                    height={320}
                    loading="lazy"
                    className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full object-cover border-4 border-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display font-black text-3xl md:text-4xl text-foreground mb-1">Disha Sharma</h3>
              <p className="text-magenta font-semibold mb-5">Professional Dance Instructor</p>

              <ul className="space-y-3 mb-5">
                {instructorPoints.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-foreground/80">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />
                    </div>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <p className="text-base text-foreground/75 leading-relaxed italic">
                "Hi! Main Disha hoon. Mujhe dance sikhana bahut pasand hai, especially unko jo shy
                feel karte hain ya pehli baar seekh rahe hain. Mere classes mein koi judgment nahi
                — bas fun aur seekhna!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== HOW IT WORKS ============== */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 text-9xl opacity-10">💃</div>
        <div className="container max-w-5xl mx-auto px-4 relative">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold mb-2 text-sm md:text-base uppercase tracking-wider">
              ✨ How It Works
            </p>
            <h2 className="text-3xl md:text-5xl text-foreground mb-3">Classes Kaise Hoti Hain?</h2>
            <p className="text-base md:text-lg text-muted-foreground italic">(How do classes work?)</p>
          </div>

          <div className="bg-gradient-card rounded-3xl p-6 md:p-10 shadow-soft border border-primary/10">
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-3">
              Hi sweetie! 👋 Disha's Dance Academy mein aapka swagat hai. Yahan hum sab kuch{" "}
              <span className="font-semibold text-magenta">100% online</span> sikhate hain — bas
              aapka phone ya laptop chahiye! Saare classes{" "}
              <span className="font-semibold text-magenta">Google Meet</span> par hote hain, toh aap
              apne ghar ke comfort se hi seekh sakte hain.
            </p>
            <p className="text-base md:text-lg font-semibold text-magenta mb-6">
              ⚡ Next batch Sunday ko start ho raha hai — jaldi join karo!
            </p>

            <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-8">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-blush/60">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />
                  </div>
                  <span className="text-sm md:text-base text-foreground/80">{f}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary hover:opacity-95 text-primary-foreground text-base md:text-lg font-bold px-8 py-7 rounded-full shadow-pink hover:scale-[1.02] transition-all min-h-[56px] h-auto"
              >
                <Link to="/checkout?plan=starter">Abhi Seat Reserve Karo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============== TESTIMONIALS ============== */}
      <section className="py-16 md:py-24 bg-blush">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold mb-2 text-sm md:text-base uppercase tracking-wider">
              🌟 Real Stories
            </p>
            <h2 className="text-3xl md:text-5xl text-foreground mb-3">Hamari Students Ki Baatein</h2>
            <p className="text-base md:text-lg text-muted-foreground italic">(What our students say)</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-10">
            {testimonials.map((t, i) => (
              <div key={i} className="group">
                <TestimonialVideo src={t.videoSrc} title={`${t.name} testimonial`} />
                <div className="mt-4 text-center">
                  <div className="font-display font-bold text-lg text-foreground">{t.name}</div>
                  <p className="text-sm md:text-base text-muted-foreground mt-1 italic">"{t.quote}"</p>
                  <div className="flex justify-center gap-0.5 mt-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Written testimonials — pill cards, scrollable on mobile */}
          <div className="-mx-4 md:mx-0 overflow-x-auto md:overflow-visible no-scrollbar">
            <div className="flex md:justify-center gap-3 md:gap-4 px-4 md:px-0 min-w-max md:min-w-0">
              {writtenTestimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[280px] md:w-auto md:max-w-sm bg-white rounded-2xl px-5 py-4 shadow-soft border border-primary/10"
                >
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
                    ))}
                  </div>
                  <p className="text-sm md:text-base text-foreground/85 italic leading-snug">
                    "{t.quote}"
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-2 font-semibold">
                    — {t.name}, {t.city}
                  </p>
                </div>
              ))}
            </div>
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
            <p className="text-base md:text-lg text-muted-foreground">Apne hisaab se timing chuno 🕐</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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
                  <span className="font-bold text-magenta">4:00 – 5:00 PM IST</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-blush">
                  <span className="font-semibold text-foreground">🌙 Sunday</span>
                  <span className="font-bold text-magenta">8:15 – 9:15 PM IST</span>
                </div>
              </div>
            </div>

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
                  <span className="font-bold text-white">5:30 – 6:30 PM IST</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/15 backdrop-blur">
                  <span className="font-semibold text-white">💃 Sat & Sun</span>
                  <span className="font-bold text-white">7:00 – 8:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm md:text-base italic text-muted-foreground mt-6">
            Class miss ho jaye? No tension — recording 48 hours ke liye available hoti hai.
          </p>
        </div>
      </section>

      {/* ============== PRICING ============== */}
      <section id="pricing" className="py-16 md:py-24 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[hsl(var(--gold-deep))] font-bold mb-1 text-xs md:text-sm uppercase tracking-wider">
              💖 Limited Time
            </p>
            <p className="text-primary font-semibold mb-2 text-sm md:text-base uppercase tracking-wider">
              💰 Pricing
            </p>
            <h2 className="text-3xl md:text-5xl text-foreground mb-3">Plans & Pricing</h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Aaj hi join karo — April batch mein sirf kuch seats bachi hain!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Starter */}
            <div className="bg-gradient-card rounded-3xl p-6 md:p-8 border-2 border-primary/15 shadow-soft hover:-translate-y-1 transition-all">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-1 rounded-full bg-blush text-magenta text-xs font-bold uppercase tracking-wide mb-3">
                  Starter Plan
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-black text-foreground mb-1">4 Sessions</h3>
                <p className="text-sm text-muted-foreground">Per Month</p>
              </div>

              <div className="text-center mb-6 py-4 border-y border-primary/10">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-2xl md:text-3xl text-muted-foreground line-through font-semibold">₹999</span>
                  <span className="font-display font-black text-5xl md:text-6xl text-magenta">₹699</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">/ month</p>
                <p className="text-sm font-semibold text-foreground/80 mt-2">Bas ₹174 per class</p>
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
                className="w-full bg-gradient-primary hover:opacity-95 text-primary-foreground font-bold rounded-full py-6 text-base shadow-pink min-h-[56px] h-auto"
              >
                <Link to="/checkout?plan=starter">Starter Plan Lo →</Link>
              </Button>
            </div>

            {/* Pro */}
            <div className="bg-gradient-popular rounded-3xl p-6 md:p-8 border-2 border-[hsl(var(--gold))] shadow-pink hover:-translate-y-1 transition-all relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-gold text-foreground text-xs font-bold px-5 py-1.5 rounded-full shadow-gold whitespace-nowrap">
                ⭐ MOST POPULAR
              </div>

              <div className="text-center mb-6 mt-2">
                <div className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-bold uppercase tracking-wide mb-3">
                  Pro Plan
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-1">8 Sessions</h3>
                <p className="text-sm text-white/80">Per Month</p>
              </div>

              <div className="text-center mb-6 py-4 border-y border-white/20">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-2xl md:text-3xl text-white/60 line-through font-semibold">₹1,799</span>
                  <span className="font-display font-black text-5xl md:text-6xl text-white">₹1,199</span>
                </div>
                <p className="text-sm text-white/80 mt-1">/ month</p>
                <div className="inline-block bg-gradient-gold text-foreground text-xs font-bold px-3 py-1 rounded-full shadow-gold mt-3">
                  SAVE ₹600 vs Starter
                </div>
                <p className="text-sm font-semibold text-white mt-2">
                  Bas ₹150 per class — sabse best value!
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "✨ Most chosen by our students",
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
                className="w-full bg-white hover:bg-white/95 text-magenta font-bold rounded-full py-6 text-base shadow-gold hover:scale-[1.02] transition-transform min-h-[56px] h-auto"
              >
                <Link to="/checkout?plan=pro">Pro Plan Lo →</Link>
              </Button>
            </div>
          </div>

          {/* Risk reversal badges */}
          <div className="mt-10 -mx-4 md:mx-0 overflow-x-auto md:overflow-visible no-scrollbar">
            <div className="flex md:justify-center items-center gap-3 px-4 md:px-0 min-w-max md:min-w-0">
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-blush border border-primary/15 text-sm font-semibold text-foreground whitespace-nowrap">
                <Lock className="w-4 h-4 text-magenta" /> 100% Secure Payment
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-blush border border-primary/15 text-sm font-semibold text-foreground whitespace-nowrap">
                📱 Instant WhatsApp Access
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-blush border border-primary/15 text-sm font-semibold text-foreground whitespace-nowrap">
                🎥 Class Recording Included
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            <button onClick={scrollToFaq} className="hover:text-magenta underline underline-offset-4 transition-colors">
              Koi sawaal hai? FAQ dekho ↓
            </button>
          </p>
        </div>
      </section>

      {/* ============== FAQ ============== */}
      <section id="faq" className="py-16 md:py-24 bg-blush">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold mb-2 text-sm md:text-base uppercase tracking-wider">
              ❓ FAQ
            </p>
            <h2 className="text-3xl md:text-5xl text-foreground mb-3">Aapke Sawaal, Hamare Jawaab</h2>
            <p className="text-base md:text-lg text-muted-foreground italic">(Your questions, answered)</p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white rounded-2xl border border-primary/10 shadow-soft px-5 data-[state=open]:border-primary/40 transition-colors"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground hover:no-underline py-5 [&>svg]:hidden group">
                  <span className="flex-1 pr-3">{f.q}</span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center text-xl font-bold transition-transform group-data-[state=open]:rotate-45">
                    +
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base text-foreground/75 leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute top-10 left-10 text-7xl opacity-20 animate-float-slow">💃</div>
        <div className="absolute bottom-10 right-10 text-7xl opacity-20 animate-float-slow" style={{ animationDelay: "2s" }}>✨</div>
        <div className="container max-w-3xl mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-6xl text-foreground mb-4">Ready to Dance? 💃</h2>
          <p className="text-lg md:text-xl text-foreground/80 mb-8">
            500+ ladies already seekh rahi hain. Aap kab join kar rahe ho?
          </p>

          <Button
            asChild
            size="lg"
            className="bg-gradient-primary hover:opacity-95 text-primary-foreground text-base md:text-lg font-bold px-10 py-7 md:py-8 rounded-full shadow-pink hover:scale-[1.02] transition-all animate-pulse-glow min-h-[56px] h-auto"
          >
            <Link to="/checkout?plan=starter">Abhi Join Karo — ₹699 se shuru</Link>
          </Button>

          <p className="text-sm md:text-base text-muted-foreground mt-4">
            ⚡ Limited April seats • 🔒 Razorpay secure payment
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <p className="text-sm text-foreground/70">Koi confusion? WhatsApp par message karo →</p>
            <a
              href="https://wa.me/917719917935"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[hsl(140_70%_45%)] hover:bg-[hsl(140_70%_40%)] text-white font-semibold transition-all hover:scale-105 shadow-soft min-h-[48px]"
            >
              <MessageCircle className="w-5 h-5" />
              Support Par Message Karo
            </a>
          </div>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer ref={footerRef} className="bg-gradient-to-br from-[hsl(330_60%_20%)] to-[hsl(320_70%_15%)] text-white py-12 md:py-16">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <h3 className="font-display font-black text-3xl md:text-4xl mb-2">
            Disha's <span className="text-[hsl(var(--gold))] italic">Dance</span> Academy
          </h3>
          <p className="text-white/80 mb-2 text-sm md:text-base">
            For Women & Kids Only 💃 — Ghar baithe seekho!
          </p>
          <p className="text-white/60 text-xs md:text-sm mb-8">
            📍 Based in India • 🇮🇳 Made for Indian women & kids
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <a
              href="https://wa.me/917719917935"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[hsl(140_70%_45%)] hover:bg-[hsl(140_70%_40%)] text-white font-bold transition-all hover:scale-105 shadow-lg min-h-[48px]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
              Support Par Message Karo
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold transition-all hover:scale-105 min-h-[48px]"
            >
              <Instagram className="w-5 h-5" />
              Instagram Follow
            </a>
          </div>

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

      {/* ============== STICKY MOBILE CTA BAR ============== */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
          showStickyCta
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-full pointer-events-none"
        }`}
        aria-hidden={!showStickyCta}
      >
        <div className="bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-primary/10 px-3 py-3 flex items-center gap-2 h-[72px]">
          <Button
            asChild
            className="flex-1 bg-gradient-primary text-primary-foreground font-bold rounded-full text-sm shadow-pink animate-pulse-glow h-[52px] min-h-[52px]"
          >
            <Link to="/checkout?plan=starter">Abhi Join Karo 💖 — ₹699+</Link>
          </Button>
          <a
            href="https://wa.me/917719917935"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp support"
            className="flex-shrink-0 w-[52px] h-[52px] rounded-full bg-[hsl(140_70%_45%)] hover:bg-[hsl(140_70%_40%)] flex items-center justify-center text-white shadow-md transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;