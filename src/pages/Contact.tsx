import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Clock, MapPin, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const InfoRow = ({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center shrink-0 shadow-soft">
      <Icon className="text-primary-foreground" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="text-base md:text-lg font-semibold text-foreground hover:text-magenta transition-colors"
        >
          {value}
        </a>
      ) : (
        <p className="text-base md:text-lg font-semibold text-foreground">{value}</p>
      )}
    </div>
  </div>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Compose a WhatsApp message with the form data
    const text = `Hi Disha Ma'am! 💃%0A%0A*Name:* ${encodeURIComponent(
      form.name
    )}%0A*Email:* ${encodeURIComponent(form.email)}%0A*Phone:* ${encodeURIComponent(
      form.phone
    )}%0A%0A*Message:*%0A${encodeURIComponent(form.message)}`;

    window.open(`https://wa.me/917719917935?text=${text}`, "_blank");

    toast({
      title: "Thank you! 💃",
      description: "We'll get back to you within 24 hours.",
    });

    setForm({ name: "", email: "", phone: "", message: "" });
    setSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        {/* Back button */}
        <div className="mb-8">
          <Button
            asChild
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <Link to="/">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </Button>
        </div>

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl mb-4 text-foreground">
            Contact <span className="text-magenta">Us</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our dance classes? We'd love to hear from you! 💃
          </p>
        </header>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT — Contact Info */}
          <Card className="p-6 md:p-10 bg-gradient-card border-border shadow-soft">
            <h2 className="text-3xl mb-2 text-foreground">
              Get In <span className="text-magenta">Touch</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Reach out to us directly or fill the form and we'll get back to you shortly!
            </p>

            <div className="space-y-6">
              <InfoRow
                icon={Mail}
                label="Email"
                value="dishainfluencer@gmail.com"
                href="mailto:dishainfluencer@gmail.com"
              />
              <InfoRow
                icon={Phone}
                label="Phone / WhatsApp"
                value="+91 77199 17935"
                href="https://wa.me/917719917935"
              />
              <InfoRow icon={Clock} label="Response Time" value="Within 24 hours" />
              <InfoRow
                icon={MapPin}
                label="Classes"
                value="100% Online via Google Meet"
              />
            </div>

            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="w-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white shadow-soft"
              >
                <a
                  href="https://wa.me/917719917935"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp Us
                </a>
              </Button>
            </div>
          </Card>

          {/* RIGHT — Contact Form */}
          <Card className="p-6 md:p-10 bg-card border-border shadow-soft">
            <h2 className="text-3xl mb-2 text-foreground">
              Send a <span className="text-magenta">Message</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Fill out the form below and we'll reach out to you on WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone / WhatsApp *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us how we can help you..."
                  className="mt-2"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-pink"
              >
                <Send className="w-5 h-5" />
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Contact;
