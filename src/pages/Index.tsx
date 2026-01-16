import { Phone, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";
import { QRPhotoSync } from "@/components/QRPhotoSync";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Elegant Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <span className="font-serif text-2xl tracking-tight text-foreground">
            Kerri's
          </span>
          <nav className="hidden md:flex items-center gap-10">
            <a href="#services" className="text-sm font-light text-stone hover:text-foreground transition-colors tracking-wide uppercase">Services</a>
            <a href="#story" className="text-sm font-light text-stone hover:text-foreground transition-colors tracking-wide uppercase">Our Story</a>
            <a href="#contact" className="text-sm font-light text-stone hover:text-foreground transition-colors tracking-wide uppercase">Contact</a>
          </nav>
          <Button variant="ghost" className="text-sm font-light tracking-wide" asChild>
            <a href="tel:+15551234567">(555) 123-4567</a>
          </Button>
        </div>
      </header>

      {/* Hero - Full Width with Background Image */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroBackground} 
            alt="Beautiful clean living room" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block text-sm font-light tracking-[0.3em] uppercase text-terracotta mb-8">
                Est. 1996 — Thirty Years of Care
              </span>
            </motion.div>
            
            <motion.h1 
              className="font-serif text-5xl sm:text-6xl md:text-8xl text-foreground leading-[0.95] mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              The art of
              <br />
              <span className="italic text-coffee">immaculate</span> spaces
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl font-light text-stone max-w-2xl mx-auto leading-relaxed mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Where meticulous attention meets genuine warmth. 
              Professional cleaning for discerning homes and offices.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <Button 
                size="lg" 
                className="bg-coffee hover:bg-coffee/90 text-cream px-8 py-6 text-sm tracking-widest uppercase font-light rounded-none"
                asChild
              >
                <a href="#contact" className="gap-3">
                  Request a Consultation
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-coffee text-coffee hover:bg-coffee hover:text-cream px-8 py-6 text-sm tracking-widest uppercase font-light rounded-none"
                asChild
              >
                <a href="#services">
                  Our Services
                </a>
              </Button>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 md:gap-16 mt-20 pt-10 border-t border-border/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="text-center">
                <span className="font-serif text-4xl text-coffee">30+</span>
                <p className="text-xs font-light tracking-widest uppercase text-stone mt-1">Years Experience</p>
              </div>
              <div className="text-center">
                <span className="font-serif text-4xl text-coffee">500+</span>
                <p className="text-xs font-light tracking-widest uppercase text-stone mt-1">Happy Clients</p>
              </div>
              <div className="text-center">
                <span className="font-serif text-4xl text-coffee">100%</span>
                <p className="text-xs font-light tracking-widest uppercase text-stone mt-1">Satisfaction</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-stone to-transparent" />
        </motion.div>
      </section>

      {/* Services - Refined Layout */}
      <section id="services" className="py-32 bg-cream relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-sand/50 to-transparent" />
        
        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="sticky top-32">
              <span className="text-sm font-light tracking-[0.3em] uppercase text-terracotta mb-4 block">
                What We Offer
              </span>
              <h2 className="font-serif text-5xl md:text-6xl text-foreground leading-tight mb-6">
                Tailored to your
                <br />
                <span className="italic">lifestyle</span>
              </h2>
              <p className="text-stone font-light leading-relaxed max-w-md">
                Every space tells a story. We listen, adapt, and deliver 
                cleaning services that respect your unique environment.
              </p>
            </div>
            
            <div className="space-y-16">
              {/* Residential */}
              <motion.div 
                className="group"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-start gap-8">
                  <span className="font-serif text-7xl text-sand group-hover:text-terracotta/30 transition-colors duration-500">01</span>
                  <div className="pt-4">
                    <h3 className="font-serif text-3xl text-foreground mb-4">Residential</h3>
                    <p className="text-stone font-light leading-relaxed mb-4">
                      Your home is your sanctuary. From weekly care to seasonal deep cleans, 
                      we bring tranquility to every room with quiet efficiency and 
                      eco-conscious products.
                    </p>
                    <ul className="text-sm text-stone font-light space-y-2">
                      <li className="flex items-center gap-3">
                        <span className="w-4 h-px bg-terracotta" />
                        Regular maintenance
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-4 h-px bg-terracotta" />
                        Deep cleaning
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-4 h-px bg-terracotta" />
                        Move-in & move-out
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
              
              {/* Commercial */}
              <motion.div 
                className="group"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-start gap-8">
                  <span className="font-serif text-7xl text-sand group-hover:text-terracotta/30 transition-colors duration-500">02</span>
                  <div className="pt-4">
                    <h3 className="font-serif text-3xl text-foreground mb-4">Commercial</h3>
                    <p className="text-stone font-light leading-relaxed mb-4">
                      First impressions matter. We create pristine professional 
                      environments that inspire confidence—in your clients 
                      and your team.
                    </p>
                    <ul className="text-sm text-stone font-light space-y-2">
                      <li className="flex items-center gap-3">
                        <span className="w-4 h-px bg-terracotta" />
                        Office spaces
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-4 h-px bg-terracotta" />
                        Retail environments
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-4 h-px bg-terracotta" />
                        Flexible scheduling
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Story / About - Elegant Band */}
      <section id="story" className="py-32 bg-coffee text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cream/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cream/20 rounded-full" />
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span 
              className="inline-block text-sm font-light tracking-[0.3em] uppercase text-terracotta mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Promise
            </motion.span>
            
            <motion.h2 
              className="font-serif text-4xl md:text-6xl leading-tight mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Three decades of learning what 
              <span className="italic"> truly matters</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg font-light leading-relaxed text-cream/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Since 1996, we've refined our craft not just in technique, but in 
              understanding. We know that trust is earned through consistency, 
              respect for your space, and attention to the details that make 
              a house feel like home.
            </motion.p>
            
            <motion.div 
              className="flex justify-center gap-16 mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <span className="font-serif text-5xl text-terracotta">30</span>
                <p className="text-sm font-light tracking-wide uppercase mt-2">Years</p>
              </div>
              <div className="w-px bg-cream/20" />
              <div>
                <span className="font-serif text-5xl text-terracotta">∞</span>
                <p className="text-sm font-light tracking-wide uppercase mt-2">Care</p>
              </div>
              <div className="w-px bg-cream/20" />
              <div>
                <span className="font-serif text-5xl text-terracotta">1</span>
                <p className="text-sm font-light tracking-wide uppercase mt-2">Standard</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact - Minimal & Warm */}
      <section id="contact" className="py-32 bg-background relative">
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-sand/40 to-transparent" />
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <motion.span 
              className="inline-block text-sm font-light tracking-[0.3em] uppercase text-terracotta mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Begin Today
            </motion.span>
            
            <motion.h2 
              className="font-serif text-5xl md:text-7xl text-foreground leading-tight mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Let's create your
              <br />
              <span className="italic">clean slate</span>
            </motion.h2>
            
            <motion.p 
              className="text-stone font-light leading-relaxed max-w-lg mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Every great partnership starts with a conversation. 
              Reach out for a complimentary consultation—we'd love to 
              understand your needs.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a 
                href="tel:+15551234567"
                className="inline-flex items-center gap-4 px-8 py-5 bg-coffee text-cream hover:bg-coffee/90 transition-colors group"
              >
                <Phone className="h-5 w-5" />
                <span className="text-sm tracking-widest uppercase font-light">(555) 123-4567</span>
              </a>
              <a 
                href="mailto:hello@kerriscleaning.com"
                className="inline-flex items-center gap-4 px-8 py-5 border border-coffee text-coffee hover:bg-coffee hover:text-cream transition-colors group"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm tracking-widest uppercase font-light">Email Us</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-12 bg-cream border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="font-serif text-xl text-foreground">Kerri's</span>
            <p className="text-sm font-light text-stone tracking-wide">
              © {new Date().getFullYear()} Kerri's Cleaning. Serving with care since 1996.
            </p>
          </div>
        </div>
      </footer>

      {/* QR Photo Sync Feature */}
      <QRPhotoSync />
    </div>
  );
};

export default Index;
