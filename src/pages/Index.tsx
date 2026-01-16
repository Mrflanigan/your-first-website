import { Phone, Mail, Home, Building2, Sparkles, Clock, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold text-foreground">Kerri's Cleaning</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>
          <Button asChild>
            <a href="#contact">Get a Quote</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Award className="h-4 w-4" />
            <span className="text-sm font-medium">30 Years of Trusted Service</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            A Cleaner Space,<br />A Clearer Mind
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Professional cleaning services for homes and offices. Experience the difference that three decades of dedicated care can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="#contact">Schedule a Cleaning</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#services">View Services</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tailored cleaning solutions for every space, delivered with care and attention to detail.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Home className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Residential Cleaning</h3>
                <p className="text-muted-foreground mb-4">
                  From weekly maintenance to deep cleaning, we treat your home with the same care we would our own. Every corner, every surface, spotless.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    Regular housekeeping
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    Deep cleaning services
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    Move-in/move-out cleaning
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Building2 className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Commercial Cleaning</h3>
                <p className="text-muted-foreground mb-4">
                  Keep your workplace pristine and professional. A clean office means happier employees and impressed clients.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    Office cleaning
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    Common area maintenance
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    Flexible scheduling
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About/Trust Section */}
      <section id="about" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Kerri's?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Three decades of experience means we've perfected our craft.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">30 Years Experience</h3>
                <p className="text-muted-foreground text-sm">
                  Serving our community since 1996 with consistent, reliable service.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Personal Touch</h3>
                <p className="text-muted-foreground text-sm">
                  We're a local business that cares about every client like family.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Trusted & Reliable</h3>
                <p className="text-muted-foreground text-sm">
                  Fully insured with a reputation built on trust and quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Ready for a cleaner space? Contact us today for a free estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="gap-2" asChild>
                <a href="tel:+15551234567">
                  <Phone className="h-5 w-5" />
                  (555) 123-4567
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="mailto:kerri@kerriscleaning.com">
                  <Mail className="h-5 w-5" />
                  Email Us
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Serving homes and businesses in the local area
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Kerri's Cleaning</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Kerri's Cleaning. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
