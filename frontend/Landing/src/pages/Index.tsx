import { Header } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/feature-card";
import { StepCard } from "@/components/step-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { PricingCard } from "@/components/pricing-card";
import { FAQSection } from "@/components/faq-section";
import { SectionHeader } from "@/components/section-header";
import { SectionDivider } from "@/components/section-divider";
import { Footer } from "@/components/footer";
import { AnchorLink } from "@/components/anchor-link";
import { InnovatorCard } from "@/components/innovator-card";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Zap, 
  Settings, 
  Volume2, 
  Download, 
  BookOpen, 
  Sliders,
  MessageCircle,
  Phone,
  MapPin
} from "lucide-react";

const Index = () => {
  const faqItems = [
    {
      question: "Is my data secure?",
      answer: "Yes, all of your data is encrypted using end-to-end encryption technology. We never share your information with third parties without your explicit consent."
    },
    {
      question: "What devices are supported?",
      answer: "SentinelAI works with over 100 brands including Nest, Philips Hue, Samsung SmartThings, Amazon Alexa, Google Home, and Apple HomeKit. Check our compatibility page for the full list."
    },
    {
      question: "Can I try before buying?",
      answer: "Absolutely! We offer a free 14-day trial with all features unlocked. No credit card required upfront."
    },
    {
      question: "How difficult is the setup process?",
      answer: "Setup is designed to be straightforward. Most users complete the initial setup within 15 minutes, and our smart assistant guides you through every step."
    },
    {
      question: "Is there a long-term contract?",
      answer: "No long-term contracts. All our pricing plans are month-to-month, and you can upgrade, downgrade, or cancel at any time."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Transform Your Home with AI—<span className="text-primary">Smarter</span>, <span className="text-accent">Efficient</span>, Always Optimized.
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                SentinelAI learns your habits, saves energy, and automates your home for peak performance.
              </p>
              <div className="flex flex-col gap-4 items-center lg:items-start">
                <div className="flex flex-col sm:flex-row gap-4">
                  <AnchorLink href="#features">
                    <Button size="lg" className="text-lg px-8">
                      Key Features →
                    </Button>
                  </AnchorLink>
                  <AnchorLink href="#how-it-works">
                    <Button size="lg" variant="outline" className="text-lg px-8">
                      See How It Works →
                    </Button>
                  </AnchorLink>
                </div>
                <AnchorLink href="#contact">
                  <Button size="lg" variant="outline" className="text-lg px-8 flex items-center">
                    <MessageCircle className="mr-2" />
                    Contact Us
                  </Button>
                </AnchorLink>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=3270&auto=format&fit=crop"
                alt="Smart home dashboard"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Meet Our Innovators Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <SectionHeader
            title="Meet Our Innovators"
            subtitle="The brilliant minds behind our revolutionary AI-powered home optimization technology."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <InnovatorCard 
              imageSrc="lovable-uploads\Untitled design_20250419_133535_0000.png" 
              name="Aditya Kumrawat" 
              role="UI/UX Designer" 
            />
            <InnovatorCard 
              imageSrc="/lovable-uploads/1_20250418_225033_0000.png" 
              name="Shreyansh Sharma" 
              role="Ai And Backend Developer" 
            />
            <InnovatorCard 
              imageSrc="/lovable-uploads/3_20250418_225034_0002.png" 
              name="Mahima Jain" 
              role="Web Developer" 
            />
            <InnovatorCard 
              imageSrc="/lovable-uploads/2_20250418_225033_0001.png" 
              name="Aayushya Lakkadwala" 
              role="Backend Developer" 
            />
            <InnovatorCard 
              imageSrc="/lovable-uploads/4_20250418_225034_0003.png" 
              name="Aharnish Bagchi" 
              role="Database Designer" 
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <SectionHeader
            title="Key Features"
            subtitle="Discover how SentinelAI transforms your home with cutting-edge technology and intelligent features."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Brain size={24} />}
              title="Adaptive Learning"
              description="AI adjusts to your routines and preferences automatically."
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title="Energy Optimizer"
              description="Cut your energy bills by up to 30% with smart usage patterns."
            />
            <FeatureCard
              icon={<Settings size={24} />}
              title="Seamless Automation"
              description="Control lights, climate, and security in one unified place."
            />
            <FeatureCard
              icon={<Volume2 size={24} />}
              title="Voice & App Control"
              description="Works with Alexa, Google Assistant, Siri, and our mobile app."
            />
          </div>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <SectionHeader
            title="How It Works"
            subtitle="Getting started with SentinelAI is easy. Just follow these simple steps to transform your home."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="relative mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Download size={24} className="text-primary" />
                </div>
                <span className="absolute -top-4 right-4 text-6xl font-bold text-gray-100">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Install</h3>
              <p className="text-gray-600">Easy plug-and-play setup that takes minutes, not hours. Connect your devices and let SentinelAI do the rest.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="relative mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen size={24} className="text-primary" />
                </div>
                <span className="absolute -top-4 right-4 text-6xl font-bold text-gray-100">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Learn</h3>
              <p className="text-gray-600">AI studies your habits and preferences within days, creating a personalized automation plan.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="relative mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Sliders size={24} className="text-primary" />
                </div>
                <span className="absolute -top-4 right-4 text-6xl font-bold text-gray-100">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Optimize</h3>
              <p className="text-gray-600">Enjoy effortless control and maximum efficiency as your home adapts to your lifestyle.</p>
            </div>
          </div>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Have questions? We've got answers. If you don't see what you're looking for, reach out to our support team."
          />
          
          <div className="max-w-3xl mx-auto">
            <FAQSection items={faqItems} />
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <SectionHeader
            title="Contact Us"
            subtitle="Get in touch with our team for any questions or support"
          />
          
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
                <p className="text-gray-600 mb-6">
                  Have questions about SentinelAI? We're here to help you transform your home into a smarter living space.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="text-primary" />
                    <span>support@sentinelai.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="text-primary" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-primary" />
                    <span>123 Smart Street, Tech City, TC 12345</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={4}
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join SentinelAI Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Early access is closing soon. Be among the first to experience the future of home automation.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 text-lg px-8"
            onClick={() => window.location.href = 'http://localhost:5173'}
          >
            Get Started Now
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
