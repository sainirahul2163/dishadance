import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const lastUpdated = new Date().toLocaleDateString("en-IN", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const Section = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
  <Card className="p-6 md:p-8 bg-card border-border">
    <h2 className="text-2xl md:text-3xl mb-4 text-primary">
      <span className="text-magenta">{number}.</span> {title}
    </h2>
    <div className="space-y-3 text-foreground/80 leading-relaxed text-base">{children}</div>
  </Card>
);

const BackButton = () => (
  <Button asChild variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
    <Link to="/">
      <ArrowLeft className="w-4 h-4" /> Back to Home
    </Link>
  </Button>
);

const Privacy = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="mb-8">
          <BackButton />
        </div>

        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl mb-4 text-foreground">
            Privacy <span className="text-magenta">Policy</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your privacy matters to us. Please read this policy carefully.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            <span className="font-semibold">Last Updated:</span> {lastUpdated}
          </p>
        </header>

        <div className="space-y-6">
          <Section number={1} title="Introduction">
            <p>
              Disha's Dance Academy ("we", "our", "us") operates the website dishadance.com.
              This Privacy Policy explains how we collect, use, and protect your personal
              information when you visit our website or enroll in our online dance classes.
            </p>
            <p>
              By using our website or services, you agree to the collection and use of
              information as described in this policy.
            </p>
          </Section>

          <Section number={2} title="Information We Collect">
            <p>We collect the following information when you enroll or contact us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full name</li>
              <li>Phone number / WhatsApp number</li>
              <li>Email address</li>
              <li>Age (for class suitability)</li>
              <li>Payment transaction details (processed via Razorpay)</li>
            </ul>
            <p>
              We do not collect sensitive personal data such as Aadhaar, PAN, or bank account
              details.
            </p>
          </Section>

          <Section number={3} title="How We Use Your Information">
            <p>Your information is used strictly for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Confirming your enrollment and sending class details</li>
              <li>Sharing Google Meet links for sessions</li>
              <li>Sending class schedules, updates, and reminders via WhatsApp or email</li>
              <li>Responding to your queries or support requests</li>
              <li>Improving our services</li>
            </ul>
            <p>
              We do not use your data for any unauthorized marketing or third-party promotions.
            </p>
          </Section>

          <Section number={4} title="Payment Data">
            <p>
              All payments are processed securely through Razorpay. We do not store any card,
              UPI, or banking information on our servers. For Razorpay's data handling, refer to
              their privacy policy at{" "}
              <a
                href="https://razorpay.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-magenta underline hover:opacity-80"
              >
                razorpay.com/privacy
              </a>
              .
            </p>
          </Section>

          <Section number={5} title="Data Sharing">
            <p>
              We do not sell, trade, or rent your personal information to any third party. Your
              data may be shared only in the following limited cases:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With Razorpay for payment processing</li>
              <li>With WhatsApp/email platforms for class communication</li>
              <li>If required by law or government authority</li>
            </ul>
          </Section>

          <Section number={6} title="Cookies">
            <p>
              Our website may use basic cookies to improve your browsing experience. These
              cookies do not store any personally identifiable information. You can disable
              cookies in your browser settings at any time.
            </p>
          </Section>

          <Section number={7} title="Data Retention">
            <p>
              We retain your personal information only as long as necessary to provide our
              services or as required by law. You may request deletion of your data at any time
              by contacting us.
            </p>
          </Section>

          <Section number={8} title="Children's Privacy">
            <p>
              Our classes include kids as students. However, enrollment for minors must be done
              by a parent or guardian. We do not knowingly collect personal data directly from
              children under 13 without parental consent.
            </p>
          </Section>

          <Section number={9} title="Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of incorrect information</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for communication at any time</li>
            </ul>
            <p>To exercise any of these rights, contact us via WhatsApp or email.</p>
          </Section>

          <Section number={10} title="Third Party Links">
            <p>
              Our website may contain links to third-party platforms (Instagram, WhatsApp,
              Google Meet). We are not responsible for the privacy practices of these platforms.
              Please review their respective privacy policies.
            </p>
          </Section>

          <Section number={11} title="Security">
            <p>
              We take reasonable measures to protect your personal information from unauthorized
              access, misuse, or disclosure. However, no method of transmission over the
              internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </Section>

          <Section number={12} title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on
              this page with an updated date. Continued use of our services after changes means
              you accept the revised policy.
            </p>
          </Section>

          <Section number={13} title="Contact Us">
            <p>If you have any questions about this Privacy Policy, reach out to us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-semibold">Website:</span> dishadance.com
              </li>
              <li>
                <span className="font-semibold">WhatsApp:</span>{" "}
                <a
                  href="https://wa.me/917719917935"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-magenta underline hover:opacity-80"
                >
                  +91 77199 17935
                </a>
              </li>
              <li>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:dishainfluencer@gmail.com"
                  className="text-magenta underline hover:opacity-80"
                >
                  dishainfluencer@gmail.com
                </a>
              </li>
            </ul>
          </Section>
        </div>

        <div className="mt-12 flex justify-center">
          <BackButton />
        </div>
      </div>
    </main>
  );
};

export default Privacy;
