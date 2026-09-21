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

const Terms = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        {/* Header */}
        <div className="mb-8">
          <BackButton />
        </div>

        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl mb-4 text-foreground">
            Terms & <span className="text-magenta">Conditions</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before enrolling in any of our classes.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            <span className="font-semibold">Last Updated:</span> {lastUpdated}
          </p>
        </header>

        {/* Sections */}
        <div className="space-y-6">
          <Section number={1} title="Acceptance of Terms">
            <p>
              By accessing or purchasing any class or subscription from Disha's Dance Academy
              (dishadance.com), you agree to be bound by these Terms & Conditions. If you do not
              agree, please do not proceed with enrollment.
            </p>
          </Section>

          <Section number={2} title="About Us">
            <p>
              Disha's Dance Academy is an online dance training platform offering Bollywood,
              Hip-Hop, and multiple dance styles via Google Meet. Classes are conducted for
              women and kids only.
            </p>
          </Section>

          <Section number={3} title="Enrollment & Payment">
            <ul className="list-disc pl-6 space-y-2">
              <li>All enrollments are confirmed only after successful payment.</li>
              <li>Payments are processed securely via Razorpay.</li>
              <li>Prices are listed in Indian Rupees (INR).</li>
              <li>
                Current plans:
                <ul className="list-[circle] pl-6 mt-2 space-y-1">
                  <li>4 Sessions/month — ₹999</li>
                  <li>8 Sessions/month — ₹1,499</li>
                </ul>
              </li>
              <li>Enrollment is valid for the current month only and does not carry forward.</li>
            </ul>
          </Section>

          <Section number={4} title="No Refund Policy">
            <p>
              All payments made to Disha's Dance Academy are{" "}
              <span className="font-semibold text-magenta">strictly non-refundable</span>. Once a
              payment is completed:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>No refunds will be issued under any circumstances.</li>
              <li>No transfers to another plan or month.</li>
              <li>No cancellations after payment is processed.</li>
            </ul>
            <p>
              We strongly encourage you to review all class details, schedules, and pricing
              before making a payment.
            </p>
          </Section>

          <Section number={5} title="Class Schedule & Access">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-semibold">4 Session Plan:</span> Every Sunday — 4:00–5:00 PM
                or 8:15–9:15 PM
              </li>
              <li>
                <span className="font-semibold">8 Session Plan:</span> Every Saturday & Sunday —
                5:30–6:30 PM or 7:00–8:00 PM
              </li>
              <li>Classes are conducted online via Google Meet.</li>
              <li>
                Google Meet links will be shared after successful enrollment via WhatsApp or
                email.
              </li>
              <li>Students must join on time — late joiners will not be given extra time.</li>
            </ul>
          </Section>

          <Section number={6} title="Missed Classes">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                No compensation, rescheduling, or refund will be provided for missed classes.
              </li>
              <li>It is the student's responsibility to attend scheduled sessions.</li>
              <li>
                In case of a class cancellation by the academy, a makeup session may be offered
                at the academy's discretion.
              </li>
            </ul>
          </Section>

          <Section number={7} title="Code of Conduct">
            <p>All students are expected to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be respectful towards the instructor and fellow students.</li>
              <li>Join class in appropriate attire suitable for dancing.</li>
              <li>Maintain a distraction-free environment during sessions.</li>
              <li>
                Not record, screenshot, or share class content without written permission.
              </li>
            </ul>
            <p>
              The academy reserves the right to remove any student from a session for
              inappropriate behavior without refund.
            </p>
          </Section>

          <Section number={8} title="Intellectual Property">
            <p>
              All content shared during classes including choreography, videos, and teaching
              material is the intellectual property of Disha's Dance Academy. Students may not
              reproduce, share, or distribute any content without prior written consent.
            </p>
          </Section>

          <Section number={9} title="Privacy Policy">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Personal information collected during enrollment (name, phone, email) is used
                only for class communication.
              </li>
              <li>We do not sell or share your data with third parties.</li>
              <li>
                Payment data is handled securely by Razorpay and is not stored on our servers.
              </li>
            </ul>
          </Section>

          <Section number={10} title="Limitation of Liability">
            <p>Disha's Dance Academy is not responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Any physical injury sustained while participating in online classes.</li>
              <li>Technical issues on the student's end (internet, device).</li>
              <li>
                Loss of access due to incorrect contact details provided by the student.
              </li>
            </ul>
          </Section>

          <Section number={11} title="Changes to Terms">
            <p>
              Disha's Dance Academy reserves the right to update these Terms & Conditions at any
              time. Continued use of our services after changes constitutes acceptance of the new
              terms.
            </p>
          </Section>

          <Section number={12} title="Contact Us">
            <p>For any queries related to these terms, reach out to us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-semibold">Website:</span> dishadance.com
              </li>
              <li>
                <span className="font-semibold">WhatsApp:</span> [Add number]
              </li>
              <li>
                <span className="font-semibold">Email:</span> [Add email]
              </li>
            </ul>
          </Section>
        </div>

        {/* Footer back button */}
        <div className="mt-12 flex justify-center">
          <BackButton />
        </div>
      </div>
    </main>
  );
};

export default Terms;
